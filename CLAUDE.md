# 코딩 컨벤션

## ✍🏻 네이밍 규칙

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 변수·함수 | `camelCase` | `caseList`, `getCaseDetail` |
| 컴포넌트 | `PascalCase` | `CaseCard` |
| 타입·인터페이스 | `PascalCase` | `CaseDetail`, `ButtonProps` |
| 상수 | `UPPER_SNAKE_CASE` | `MAX_FILE_SIZE` |
| Boolean | `is`, `has`, `can`, `should` | `isLoading`, `hasNextPage` |

의미가 불명확한 이름은 사용하지 않습니다.

```ts
const data = []; // 지양
const caseList = []; // 권장
```

## 🧩 컴포넌트

- 컴포넌트는 한 가지 역할에 집중합니다.
- Props 타입은 `컴포넌트명 + Props`로 작성합니다.
- 이벤트 Props는 `on`, 내부 핸들러는 `handle`로 시작합니다.
- 재사용하지 않는 컴포넌트를 무리하게 공통화하지 않습니다.

```tsx
interface CaseCardProps {
  caseItem: CaseSummary;
  onSelect: (caseId: number) => void;
}

function CaseCard({ caseItem, onSelect }: CaseCardProps) {
  const handleClick = () => {
    onSelect(caseItem.id);
  };

  return <button onClick={handleClick}>{caseItem.title}</button>;
}
```

## 🧾 TypeScript

- `any` 사용을 지양합니다.
- 타입 단언보다 타입 가드와 런타임 검증을 우선합니다.
- 객체와 Props는 `interface`, 유니언 타입은 `type`을 사용합니다.
- 타입 import는 `import type`으로 작성합니다.

```ts
interface CaseSummary {
  id: number;
  title: string;
}

type CaseStatus = "OPEN" | "RESOLVED" | "CLOSED";
```

## 🌐 API

- API 함수는 도메인 행동이 드러나도록 작성합니다.
- API 응답 타입과 화면에서 사용하는 도메인 타입을 분리합니다.
- 외부 API의 `meeting`은 변환 계층을 거쳐 서비스 내부에서 `case`로 사용합니다.

```ts
getCaseList();
getCaseDetail();
createCase();
updateCase();
deleteCase();
```

```ts
// 지양
postMeeting();
fetchData();
```

## 🎨 Tailwind CSS

- 클래스 작성 순서를 일정하게 유지합니다.
- 조건부 클래스는 `cn` 유틸을 사용합니다.
- 반복되는 스타일은 컴포넌트 또는 variant로 분리합니다.
- 모바일 우선으로 작성합니다.

```
레이아웃 → 크기 → 간격 → 글자 → 테두리 → 배경 → 상태 → 반응형
```

## 📦 Import

절대 경로 `@/`를 사용합니다.

```ts
import { Button } from "@/components/ui/button";
import type { CaseSummary } from "@/features/case/types/case.types";
```

깊은 상대 경로는 지양합니다.

```ts
// 지양
import { Button } from "../../../../components/ui/button";
```

## 🚨 에러 처리

- 에러를 빈 `catch`로 무시하지 않습니다.
- 사용자 메시지와 개발자 로그를 분리합니다.
- 로딩, 에러, 빈 상태를 모두 처리합니다.

```ts
try {
  await createCase(formValues);
} catch (error) {
  console.error("사건 등록 실패:", error);
  toast.error("사건을 등록하지 못했습니다.");
}
```

## ✅ 핵심 규칙

1. 파일명은 kebab-case
2. 컴포넌트와 타입은 PascalCase
3. 변수와 함수는 camelCase
4. Boolean은 is, has, can, should 사용
5. any 사용 지양
6. 서버 상태는 TanStack Query로 관리
7. UI 전역 상태는 Zustand로 관리
8. API 타입과 도메인 타입 분리
9. 절대 경로 @/ 사용
10. 로딩·에러·빈 상태 필수 처리
