import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';
import { meetingQueries } from '@/features/meeting/queries/meeting-query';
import { MeetingDetailView } from '@/features/meeting/components/detail/meeting-detail-view';

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MeetingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await ServerApi.meetings.getMeetingDetail({
      teamId: TEAM_ID,
      meetingId: Number(id),
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
  const queryClient = new QueryClient();

  try {
    // 서버 컴포넌트 사전 페칭 (ServerApi 직접 연동)
    await Promise.all([
      queryClient.prefetchQuery(
        meetingQueries.detailQuery(id, async () => {
          const res = await ServerApi.meetings.getMeetingDetail({
            teamId: TEAM_ID,
            meetingId: Number(id),
          });
          return res.data;
        }),
      ),
      queryClient.prefetchQuery(
        meetingQueries.participantsQuery(id, async () => {
          const res = await ServerApi.meetings.getParticipants({
            teamId: TEAM_ID,
            meetingId: Number(id),
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
      <MeetingDetailView meetingId={id} />
    </HydrationBoundary>
  );
}
