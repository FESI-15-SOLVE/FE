import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meetingQueries } from '../queries/meeting-query';
import { MeetingWithHost, MeetingList } from '@/api/data-contracts';
import { toast } from 'sonner';
import {
  joinMeetingAction,
  leaveMeetingAction,
} from '@/actions/meeting/meeting-actions';
import { unwrapAction } from '@/lib/safe-action';

export function useJoinMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      meetingId,
      isJoined,
    }: {
      meetingId: string | number;
      isJoined: boolean;
    }) => {
      if (isJoined) {
        unwrapAction(
          await leaveMeetingAction({ meetingId: Number(meetingId) }),
        );
      } else {
        unwrapAction(await joinMeetingAction({ meetingId: Number(meetingId) }));
      }
    },

    // 1. onMutate: Promise.all 병렬 취소 & 상세/목록 캐시 즉시 낙관적 업데이트
    onMutate: async ({ meetingId, isJoined }) => {
      const detailKey = meetingQueries.detailKey(String(meetingId));
      const listKeys = meetingQueries.listKeys();

      // 병렬 취소로 레이스 조건 방지
      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailKey }),
        queryClient.cancelQueries({ queryKey: listKeys }),
      ]);

      // 스냅샷 저장 (상세 스냅샷 & 목록 스냅샷)
      const previousDetail =
        queryClient.getQueryData<MeetingWithHost>(detailKey);
      const previousLists = queryClient.getQueriesData<{
        pages?: MeetingList[];
      }>({
        queryKey: listKeys,
      });

      const countDiff = isJoined ? -1 : 1;

      // 상세 캐시 즉시 업데이트
      if (previousDetail) {
        queryClient.setQueryData<MeetingWithHost>(detailKey, {
          ...previousDetail,
          isJoined: !isJoined,
          participantCount: Math.max(
            0,
            (previousDetail.participantCount || 0) + countDiff,
          ),
        });
      }

      // 무한 스크롤 목록 캐시 즉시 업데이트
      queryClient.setQueriesData<{ pages?: MeetingList[] }>(
        { queryKey: listKeys },
        (old) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data?.map((item) =>
                String(item.id) === String(meetingId)
                  ? {
                      ...item,
                      isJoined: !isJoined,
                      participantCount: Math.max(
                        0,
                        (item.participantCount || 0) + countDiff,
                      ),
                    }
                  : item,
              ),
            })),
          };
        },
      );

      return { previousDetail, previousLists };
    },

    // 2. onError: 실패 시 스냅샷으로 정밀 롤백
    onError: (err, { meetingId }, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(
          meetingQueries.detailKey(String(meetingId)),
          context.previousDetail,
        );
      }
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      toast.error(err.message || '참여 처리 중 오류가 발생했습니다.');
    },

    // 3. onSettled: 성공/실패 무관하게 캐시 무효화로 동기화
    onSettled: (_data, error, { meetingId, isJoined }) => {
      if (!error) {
        toast.success(
          isJoined
            ? '참여가 취소되었습니다.'
            : '참여 신청이 완료되었습니다.',
        );
      } else {
        queryClient.invalidateQueries({ queryKey: meetingQueries.listKeys() });
      }
      queryClient.invalidateQueries({
        queryKey: meetingQueries.detailKey(String(meetingId)),
      });
    },
  });
}
