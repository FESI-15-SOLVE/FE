# 모임 상세 페이지 (`/meetings/[id]`) 디자인 및 아키텍처 명세서

- **작성일자**: 2026-07-27
- **Figma 연동 노드**: `15253:49373` (모임 상세 - Desktop) / `15253:50171` (모임 상세 - Tablet)
- **주요 목표**: Next.js App Router RSC (서버 사이드 prefetch) + TanStack Query 하이드레이션 기반으로 1:1 반응형 피그마 모임 상세 화면 구현

---

## 1. 아키텍처 & 데이터 흐름 (Architecture & Data Flow)

### 1.1 하이브리드 하이드레이션 패턴 (RSC + React Query)
- **`src/app/meetings/[id]/page.tsx` (Server Component)**:
  - 서버에서 `ServerApi.meetings.getMeetingDetail` 및 `getParticipants` 호출로 사전 페칭(Prefetch).
  - `generateMetadata()`를 통해 OG 제목, 설명, 대표 이미지 서버 사이드 메타태그 출력.
  - `<HydrationBoundary state={dehydrate(queryClient)}>`로 클라이언트에 이관.
- **`src/features/meeting/components/detail/meeting-detail-view.tsx` (Client Component)**:
  - 하이드레이션된 데이터를 깜빡임 없이 즉시 렌더링.
  - 모임 참여/취소 클릭 시 `useMutation` 실행 후 `queryClient.invalidateQueries`로 최신 상태 즉시 동기화.

---

## 2. 모듈 및 폴더 구조 (Folder & Module Structure)

```text
src/
├── app/meetings/[id]/
│   └── page.tsx                         # 서버 컴포넌트 (Prefetch & SEO & Hydration)
│
└── features/meeting/
    ├── api/
    │   └── fetch-meeting-detail.ts       # 클라이언트 모임 상세 API 페처
    │
    ├── queries/
    │   └── meeting-query.ts             # detailKeys, detailQuery 추가
    │
    └── components/detail/               # 상세 페이지 독립 전용 컴포넌트
        ├── meeting-detail-view.tsx       # 모임 상세 메인 조립 뷰
        ├── meeting-detail-header.tsx     # 히어로 대표 이미지 & 기본 정보 (제목, 카테고리, 장소, 일시)
        ├── meeting-personnel-card.tsx   # 참여 정원 Progress 바 + 아바타 목록 + 참여/취소 버튼
        ├── meeting-description.tsx       # 모임 상세 설명 카드
        ├── meeting-location-map.tsx      # KakaoMapContainer 지도 + 도로명 주소 + 복사 버튼
        └── meeting-reviews.tsx          # 리뷰 목록 & 평점 카드
```

---

## 3. 세부 컴포넌트 명세 (Component Specs)

### 3.1 `MeetingDetailHeader`
- 대형 이미지 대표 배너.
- 카테고리 뱃지, 모임 제목 (`h1`), 날짜/시간, 장소 텍스트 표시.

### 3.2 `MeetingPersonnelCard`
- `capacity` (총 정원) 대비 `participantCount` (현재 참가자) 계산.
- 참여자 아바타 이미지 서클 목록 표시.
- **참여하기 / 참여 취소** 버튼:
  - 내가 이미 참여한 모임이면 "참여 취소" (variant="tertiary")
  - 모임 정원이 가득 찬 경우 "모집 마감" (disabled)
  - 참여 가능한 경우 "참여하기" (variant="primary")

### 3.3 `MeetingLocationMap`
- **`src/features/map`의 `KakaoMapContainer` 재사용**.
- 모임의 `latitude`, `longitude`에 단일 핀 마커 표시.
- 하단 주소 텍스트 옆 "복사" 버튼 클릭 시 `navigator.clipboard.writeText(address)` 및 `toast.success("주소가 복사되었습니다.")` 토스트 노출.

### 3.4 `MeetingReviews`
- 해당 모임의 리뷰 목록 및 별점(Rating) 렌더링.

---

## 4. 예외 처리 & 에러 핸들링 (Error & Edge Cases)

1. **존재하지 않는 모임 ID 접근 시**:
   - `notFound()` 호출 ➡️ Next.js 404 페이지로 세이프 리다이렉트.
2. **지도 API Key 미설정 시**:
   - `KakaoMapContainer` 내부 Fail-Fast 에러 UI 노출.
3. **주소 복사 실패 시**:
   - `toast.error("주소 복사에 실패했습니다.")` 노출.
