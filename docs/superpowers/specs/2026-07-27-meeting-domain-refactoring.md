# 모임(Meeting) 도메인 로직 파편화 분석 및 일원화 구조 개편 계획서

- **작성일자**: 2026-07-27
- **목적**: `GroupCard`, `DetailCard`, `InformationCard`, `PersonnelContainer`, `MeetingList`, `MeetingDetailHeader` 등 모임 도메인 전반에 파편화되어 있던 날짜, 상태, 매핑 로직을 단일 출처(Single Source of Truth)로 일원화하고 재사용성 극대화.

---

## 1. 현재 파편화된 상태 및 문제점 분석

| 파편화 항목 | 현재 흩어져 있는 위치 | 발견된 문제점 & 리스크 |
| :--- | :--- | :--- |
| **개설확정 여부 (`isConfirmed`)** | `meeting-list.tsx`<br/>`meeting-detail-header.tsx`<br/>`personnel-container.tsx` | `Boolean(meeting.confirmedAt)` 조건을 곳곳에서 직접 검사 중. 조건 변경 시 전역 수정 필요. |
| **모집마감 여부 (`isClosed`)** | `meeting-list.tsx`<br/>`meeting-personnel-card.tsx`<br/>`group-card.tsx` | 정원 초과, 모임 완료, 취소 상태 판별 기준이 파일마다 조금씩 상이함. `meeting-personnel-card.tsx`에서 `!meeting.canceledAt` 오탈자 버그 발견. |
| **카드 뱃지/액션 상태 (`badgeStatuses`, `actionStatus`)** | `detail-card.tsx`<br/>`page.tsx` 더미 | `DetailCard`용 뱃지(`'confirmed' \| 'pending' \| 'completed' \| 'upcoming'`) 및 버튼 액션(`'reserved' \| 'completed' \| 'canceled'`) 추론 로직이 미구현 상태. |
| **날짜/시간/마감 태그 포맷팅** | `date-formatter.ts`<br/>`meeting-mapper.ts`<br/>`group-card.tsx` | `toLocaleDateString`과 `formatMeetingDate`가 혼용되거나, `deadlineTag`가 하드코딩되던 흔적 잔재. |
| **카드 데이터 매핑 (Mappers)** | `meeting-mapper.ts` | `GroupCard` 변환 매퍼는 있으나 `DetailCard` 및 `InformationCard` 매퍼가 존재하지 않아 컴포넌트 호출부마다 개별 객체를 조합함. |

---

## 2. 일원화 아키텍처 구조 설계 (Target Architecture)

```text
src/features/meeting/
├── utils/
│   ├── meeting-status.ts        # 🔥 [신규] 모든 모임 상태 판별 및 뱃지/액션 추론 단일 유틸
│   ├── date-formatter.ts        # [기존] 날짜/시간/마감일시(D-day) 포맷팅 단일 유틸
│   └── meeting-mapper.ts        # 💡 [고도화] GroupCard / DetailCard / InformationCard 매퍼 일원화
│
└── components/
    ├── cards/
    │   ├── group-card.tsx       # meeting-status & meeting-mapper 연동
    │   ├── detail-card.tsx      # meeting-status & meeting-mapper 연동
    │   ├── information-card.tsx # meeting-status 연동
    │   └── personnel-container.tsx # meeting-status 연동
    │
    └── detail/
        ├── meeting-detail-header.tsx # meeting-status 연동
        └── meeting-detail-view.tsx
```

---

## 3. 세부 유틸리티 설계 (`meeting-status.ts`)

```typescript
import { MeetingWithHost } from '@/api/data-contracts';

export type MeetingBadgeStatus = 'confirmed' | 'pending' | 'completed' | 'upcoming';
export type MeetingActionStatus = 'reserved' | 'completed' | 'canceled';

/** 1. 개설 확정 여부 */
export function isMeetingConfirmed(meeting: Pick<MeetingWithHost, 'confirmedAt'>): boolean {
  return Boolean(meeting.confirmedAt);
}

/** 2. 모임 취소 여부 */
export function isMeetingCanceled(meeting: Pick<MeetingWithHost, 'canceledAt'>): boolean {
  return Boolean(meeting.canceledAt);
}

/** 3. 모집 마감 또는 완료 여부 (마감 딤 처리 기준) */
export function isMeetingClosed(
  meeting: Pick<MeetingWithHost, 'participantCount' | 'capacity' | 'isCompleted' | 'canceledAt'>,
): boolean {
  return (
    meeting.isCompleted ||
    Boolean(meeting.canceledAt) ||
    meeting.participantCount >= meeting.capacity
  );
}

/** 4. DetailCard용 뱃지 상태 목록 추론 (개설확정/대기 + 이용완료/예정) */
export function getMeetingBadgeStatuses(
  meeting: Pick<MeetingWithHost, 'confirmedAt' | 'isCompleted'>,
): MeetingBadgeStatus[] {
  return [
    isMeetingConfirmed(meeting) ? 'confirmed' : 'pending',
    meeting.isCompleted ? 'completed' : 'upcoming',
  ];
}

/** 5. DetailCard용 우하단 액션 상태 추론 (예약 취소 / 리뷰 작성 / 취소됨) */
export function getMeetingActionStatus(
  meeting: Pick<MeetingWithHost, 'canceledAt' | 'isCompleted'>,
): MeetingActionStatus {
  if (meeting.canceledAt) return 'canceled';
  if (meeting.isCompleted) return 'completed';
  return 'reserved';
}
```

---

## 4. 매퍼 유틸리티 일원화 고도화 (`meeting-mapper.ts`)

- `mapMeetingToGroupCard(meeting: MeetingWithHost)`: `GroupCardProps`로 일괄 매핑
- `mapMeetingToDetailCard(meeting: MeetingWithHost)`: `DetailCardProps`로 일괄 매핑 (`badgeStatuses`, `actionStatus` 자동 추론)

---

## 5. 단계별 실행 수정 계획 (Execution Steps)

- [ ] **1단계**: `src/features/meeting/utils/meeting-status.ts` 모듈 신설
- [ ] **2단계**: `src/features/meeting/utils/meeting-mapper.ts`에 `mapMeetingToDetailCard` 추가 및 `meeting-status.ts` 연동
- [ ] **3단계**: `MeetingListUI`, `GroupCard`, `DetailCard`, `MeetingDetailHeader`에 신규 유틸 적용 및 파편화 로직 일괄 제거
- [ ] **4단계**: 변경사항 검증 및 커밋
