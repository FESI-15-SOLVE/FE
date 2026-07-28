# 모임 참여하기 / 취소하기 및 찜 상태 반영 기능 설계서 (Design Spec)

## 1. 개요
현재 디테일 페이지의 `InformationCard`에 위치한 찜(하트) 버튼과 참여하기 버튼에 실제 동작 로직을 연결합니다. 
참여하기/취소하기는 별도의 Server Action으로 구현하며, 낙관적 업데이트를 통해 즉각적인 UI 피드백을 제공합니다.
비로그인 사용자나 참여 불가능한 상태(정원 마감, 취소됨, 호스트)에 대한 엣지 케이스를 처리합니다.

## 2. 요구사항 및 UI/UX 스펙

### 2.1 찜하기 (Favorite)
- `InformationCard`의 찜 버튼(하트 아이콘)에 `isSaved` 상태를 전달하여 활성화/비활성화 상태가 정확히 보이도록 수정합니다.
- 기존에 구현된 `useToggleFavorite` 훅을 재사용하여 상태를 토글합니다.
- 비로그인 사용자가 클릭 시 `AlertModal`을 띄웁니다.

### 2.2 참여하기 / 참여 취소하기 (Join / Leave)
- **비로그인 사용자**: 클릭 시 "로그인이 필요한 서비스입니다."라는 내용의 `AlertModal` 팝업을 띄웁니다. (확인 클릭 시 `/login`으로 리다이렉트)
- **호스트인 경우**: 참여하기 버튼을 숨기거나 다른 적절한 방식(예: '내가 만든 모임')으로 처리합니다 (요구사항: 다른 버튼으로 보여주거나 숨김).
- **취소된 모임**: 참여하기 버튼 비활성화 (텍스트: "취소된 모임입니다")
- **정원 초과 모임**: 참여하기 버튼 비활성화 (텍스트: "모집이 마감되었습니다")
- **참여 중인 경우**: 버튼 텍스트 "참여 취소하기", 클릭 시 모임 참여를 취소합니다.
- **참여 가능 상태**: 버튼 텍스트 "참여하기", 클릭 시 모임에 참여합니다.

### 2.3 낙관적 업데이트 (Optimistic Update)
- 참여/참여취소 버튼 클릭 시 즉시 `isJoined` 상태를 토글하고, `participantCount`를 +1 또는 -1 합니다.
- 실패(onError) 시 기존 캐시 스냅샷으로 롤백합니다.
- `useJoinMeeting` 커스텀 훅을 통해 이 로직을 캡슐화합니다.

## 3. 기술 설계 (Architecture)

### 3.1 Server Action
- 파일: `src/actions/meeting/meeting-actions.ts` (또는 신규 파일 `join-actions.ts`)
- `actionClient`를 활용하여 `joinMeetingAction`, `leaveMeetingAction` 구현.
- 내부적으로 `ServerApi.meetings.joinMeeting`, `leaveMeeting` 호출.

### 3.2 커스텀 훅 (useJoinMeeting)
- 파일: `src/features/meeting/hooks/use-join-meeting.ts`
- React Query의 `useMutation` 사용.
- `onMutate`: 
  1. `detailQuery`, `listQuery` 캐시 업데이트 중단 (`cancelQueries`).
  2. 현재 스냅샷 저장.
  3. `detailKey` 및 `listKeys`에 대해 `isJoined`, `participantCount` 낙관적 업데이트.
- `onError`: 저장해둔 스냅샷으로 롤백.
- `onSettled`: `detailKey`, `listKeys` 무효화(`invalidateQueries`)로 최종 상태 동기화.

### 3.3 UI 컴포넌트 수정
- **`InformationCard` (`src/features/meeting/components/cards/information-card.tsx`)**:
  - `isActive` 프롭을 찜 버튼에 연결 (`meeting.isSaved`).
  - 참여 버튼의 텍스트, 비활성화 여부, 클릭 이벤트, 호스트 여부 등에 따른 렌더링 로직 추가 (또는 상위에서 전달).
- **`MeetingDetailHeader` (`src/features/meeting/components/detail/meeting-detail-header.tsx`)**:
  - `isJoined`, `isFull`, `isCanceled`, `isHost` 등 상태 파생.
  - 비로그인 유도를 위한 `AlertModal` 렌더링.
  - `useJoinMeeting`, `useToggleFavorite` 훅 호출 및 `InformationCard`에 이벤트 핸들러 주입.

## 4. 데이터 플로우
1. 사용자가 찜/참여 버튼 클릭.
2. `MeetingDetailHeader`의 핸들러 실행.
3. 미인증 유저(권한 없음)인지 확인 (`currentUser` 또는 인증 상태 확인 필요). -> 미인증 시 `AlertModal` 표시.
4. 인증 유저인 경우 훅(`mutate`) 실행.
5. 훅 내 `onMutate`에서 UI 즉각 변경.
6. Server Action 실행 후 결과 반환.
7. 에러 발생 시 UI 롤백, 성공 시 캐시 갱신(백그라운드).
