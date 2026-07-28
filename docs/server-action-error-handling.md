# Server Action & API Route 에러 처리 전략

## 배경

이 프로젝트에서 데이터 변경(CUD) 요청은 **Server Action**, 조회(GET) 요청은 **API Route Handler**로 처리하도록 역할을 나눴다.

두 방식은 에러를 처리하는 방식이 근본적으로 다르기 때문에, 각각 별도의 공통 래퍼를 만들었다.

- **API Route Handler** → `withErrorHandler` (고차 함수)
- **Server Action** → `next-safe-action` + `actionClient`

---

## 왜 Server Action에 next-safe-action을 쓰는가?

Server Action의 에러 처리 래퍼를 직접 만들려고 시도했지만, Server Action은 내부 동작 방식이 일반 함수와 달라 커스텀 래퍼로 감싸기에 구조적인 제약이 너무 많았다.

그래서 이미 이 문제를 해결해둔 `next-safe-action` 라이브러리를 도입했다.

`next-safe-action`은 `handleServerError` 옵션 하나로 액션 내부의 모든 예외를 한 곳에서 정규화할 수 있다.

---

## React Query(useMutation)와의 호환 문제 → unwrapAction

`next-safe-action`을 쓰면 생기는 문제가 하나 있다.

Server Action은 내부에서 에러가 발생해도 **절대로 throw하지 않는다.** 대신 `{ data, serverError, validationErrors }` 형태의 결과 객체를 항상 정상적으로 resolve한다.

React Query의 `useMutation`은 `mutationFn`이 **throw해야만** `onError`가 트리거된다. Server Action이 throw를 안 하니, 에러가 나도 React Query는 성공으로 인식하는 문제가 생긴다.

이를 해결하려면 매 호출부마다 아래처럼 작성해야 한다:

```typescript
const result = await someAction(input);
if (result?.serverError) throw new ErrorResponse(...);
if (result?.validationErrors) throw new ErrorResponse(...);
if (!result?.data) throw new ErrorResponse(...);
return result.data;
```

이 반복 로직을 한 곳으로 모은 것이 **`unwrapAction`** 이다.

```typescript
// 사용 시
return unwrapAction(await someAction(input));
```

---

## validationErrors는 왜 처리하지 않는가?

`next-safe-action`의 `validationErrors`는 BFF(Server Action)의 `inputSchema` 검증이 실패했을 때만 발생한다.

이 프로젝트에서는 BFF에서의 중복 검증을 하지 않기로 결정했다:

- **클라이언트(RHF + Zod)** 가 폼 입력을 검증한다.
- **백엔드 API 서버**가 최종 검증을 담당한다.
- `data-contracts.ts`에 이미 정의된 TS 타입을 그대로 쓰기 위해 `inputSchema`를 `z.custom<T>()`(패스스루)로 설정했다.

`z.custom<T>()`는 런타임 검증을 수행하지 않으므로 `validationErrors`가 발생할 경로 자체가 없다. `unwrapAction`에서 이 케이스를 처리하지 않는 것은 버그가 아니라 의도된 설계다.

---

## 에러 흐름 요약

```
[Server Action 내부에서 예외 발생]
  ↓
[actionClient.handleServerError()]
  ↓ ErrorResponse → { message, code, status }
  ↓ 그 외        → { message: '알 수 없는 오류', code: 'INTERNAL_SERVER_ERROR', status: 500 }
  ↓
result.serverError 에 담겨 반환됨

[클라이언트 / React Query]
  unwrapAction(result)
  ↓ serverError 있음      → throw new ErrorResponse(message, code, status)
  ↓ data === undefined    → throw new ErrorResponse('EMPTY_RESPONSE', 500)
  ↓ 정상                  → data 반환 (타입: NonNullable<T>)
```

---

## 관련 파일

| 파일 | 역할 |
|---|---|
| `src/lib/safe-action.ts` | actionClient, unwrapAction 정의 |
| `src/lib/api-handler.ts` | API Route Handler용 withErrorHandler 정의 |
| `src/actions/*/` | Server Action 정의 (actionClient 사용) |
| `src/app/api/*/route.ts` | API Route Handler (GET 전용, withErrorHandler 사용) |
