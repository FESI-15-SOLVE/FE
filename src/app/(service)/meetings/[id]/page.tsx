import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { meetingQueries } from '@/features/meeting/queries/meeting-query';
import { MeetingDetailView } from '@/features/meeting/components/detail/meeting-detail-view';

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

function parseMeetingId(id: string): number | null {
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) {
    return null;
  }
  return numericId;
}

export async function generateMetadata({
  params,
}: MeetingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseMeetingId(id);
  if (!numericId) {
    return {
      title: '모임 상세 | 같이달래',
    };
  }

  try {
    const res = await ServerApi.meetings.getMeetingDetail({
      teamId: TEAM_ID,
      meetingId: numericId,
    });
    const meeting = res.data;

    return {
      title: `${meeting.name} | 같이달래`,
      description:
        meeting.description ||
        `${meeting.region || ''} ${meeting.name} 모임입니다.`,
      openGraph: {
        title: meeting.name,
        description:
          meeting.description || `${meeting.region || ''} ${meeting.name} 모임`,
        images: meeting.image ? [meeting.image] : [],
      },
    };
  } catch {
    return {
      title: '모임 상세 | 같이달래',
    };
  }
}

export default async function MeetingDetailPage({
  params,
}: MeetingDetailPageProps) {
  const { id } = await params;
  const numericId = parseMeetingId(id);

  if (!numericId) {
    notFound();
  }

  const queryClient = getQueryClient();

  try {
    // 서버 컴포넌트 사전 페칭 (ServerApi 직접 연동)
    await Promise.all([
      queryClient.prefetchQuery(
        meetingQueries.detailQuery(numericId, async () => {
          const res = await ServerApi.meetings.getMeetingDetail({
            teamId: TEAM_ID,
            meetingId: numericId,
          });
          return res.data;
        }),
      ),
      queryClient.prefetchQuery(
        meetingQueries.participantsQuery(numericId, async () => {
          const res = await ServerApi.meetings.getParticipants({
            teamId: TEAM_ID,
            meetingId: numericId,
          });
          return res.data;
        }),
      ),
    ]);
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MeetingDetailView meetingId={numericId} />
    </HydrationBoundary>
  );
}
