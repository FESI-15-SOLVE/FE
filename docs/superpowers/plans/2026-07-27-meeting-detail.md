# 모임 상세 페이지 (`/meetings/[id]`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 피그마 디자인 기반 모임 상세 페이지(`/meetings/[id]`)를 Next.js BFF Route Handler (`/api/meetings/[id]`) + RSC 사전 페칭 & TanStack Query 하이드레이션 패턴과 `KakaoMapContainer` 지도를 활용하여 완벽 구현합니다.

**Architecture:** 
1. BFF 라우트 핸들러 `src/app/api/meetings/[id]/route.ts` 구축.
2. RSC `page.tsx`에서 서버 사전 페칭 후 `HydrationBoundary`로 하이드레이션.
3. `src/features/meeting/components/detail/` 하위 서브 컴포넌트로 독립 조립.

**Tech Stack:** Next.js 15 App Router, React 19, TanStack Query v5, Tailwind CSS, Lucide Icons, Kakao Map SDK.

---

### Task 1: BFF Route Handler & API 페처, React Query `detailQuery` 구축

**Files:**
- Create: `src/app/api/meetings/[id]/route.ts` (BFF GET 라우트 핸들러)
- Create: `src/features/meeting/api/fetch-meeting-detail.ts` (클라이언트 BFF 페처)
- Modify: `src/features/meeting/queries/meeting-query.ts` (detailKey & detailQuery 옵션 추가)

- [ ] **Step 1: `src/app/api/meetings/[id]/route.ts` BFF 라우트 핸들러 구현**
  Next.js App Router Route Handler로 `ServerApi.meetings.getMeetingDetail({ teamId: TEAM_ID, meetingId: id })` 호스팅.
- [ ] **Step 2: `fetch-meeting-detail.ts` 클라이언트 API 함수 작성**
  BFF 경로 (`/api/meetings/${id}`) 페칭 함수 작성.
- [ ] **Step 3: `meeting-query.ts`에 `detailKey` 및 `detailQuery` 추가**
  `detailKeys`, `detailKey(id)`, `detailQuery(id)` queryOptions 추가.
- [ ] **Step 4: 커밋**

---

### Task 2: 히어로 정보 & 참여 카드 컴포넌트 구현

**Files:**
- Create: `src/features/meeting/components/detail/meeting-detail-header.tsx`
- Create: `src/features/meeting/components/detail/meeting-personnel-card.tsx`

- [ ] **Step 1: `MeetingDetailHeader` 구현**
  모임 대표 배너 이미지, 카테고리 뱃지, 제목, 날짜/시간, 장소 텍스트 렌더링.
- [ ] **Step 2: `MeetingPersonnelCard` 구현**
  참여 정원 대비 현재 인원 Progress 바 + 아바타 서클 목록 + "참여하기/참여취소" 버튼.
- [ ] **Step 3: 커밋**

---

### Task 3: 모임 설명 & 지도 섹션 구현

**Files:**
- Create: `src/features/meeting/components/detail/meeting-description.tsx`
- Create: `src/features/meeting/components/detail/meeting-location-map.tsx`

- [ ] **Step 1: `MeetingDescription` 구현**
  모임 상세 설명 텍스트 카드 렌더링.
- [ ] **Step 2: `MeetingLocationMap` 구현**
  `src/features/map`의 `KakaoMapContainer`를 사용해 단일 핀 지도 렌더링 + 도로명 주소 + "복사" 버튼 (클립보드 저장 & 토스트).
- [ ] **Step 3: 커밋**

---

### Task 4: 리뷰 모아보기 & 메인 `MeetingDetailView` 오케스트레이터 구현

**Files:**
- Create: `src/features/meeting/components/detail/meeting-reviews.tsx`
- Create: `src/features/meeting/components/detail/meeting-detail-view.tsx`

- [ ] **Step 1: `MeetingReviews` 구현**
  평점 카드 + 리뷰 카드리스트 + 페이징 UI.
- [ ] **Step 2: `MeetingDetailView` 구현**
  `useQuery(meetingQueries.detailQuery(id))`로 데이터를 수신하여 Header, PersonnelCard, Description, LocationMap, Reviews를 1920px 데스크톱 / 744px 태블릿 반응형으로 조립.
- [ ] **Step 3: 커밋**

---

### Task 5: App Router `page.tsx` 라우팅 & RSC 사전 페칭 / SEO 적용

**Files:**
- Create: `src/app/meetings/[id]/page.tsx`

- [ ] **Step 1: `generateMetadata` 작성**
  서버 사이드에서 모임 정보로 OG Title, Description, Image 메타태그 출력.
- [ ] **Step 2: RSC Prefetch & `HydrationBoundary` 구성**
  `QueryClient` prefetchQuery ➡️ `<HydrationBoundary state={dehydrate(queryClient)}>`로 `MeetingDetailView` 감싸서 렌더링.
- [ ] **Step 3: 최종 검증 및 커밋**
