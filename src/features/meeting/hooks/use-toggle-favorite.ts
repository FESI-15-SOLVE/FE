import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavoriteApi, removeFavoriteApi } from '../api/toggle-favorite';
import { meetingQueries } from '../queries/meeting-query';
import { favoriteQueries } from '../queries/favorite-query';
import { MeetingWithHost, MeetingList } from '@/api/data-contracts';
import { toast } from 'sonner';

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      meetingId,
      isSaved,
    }: {
      meetingId: string | number;
      isSaved: boolean;
    }) => {
      if (isSaved) {
        await removeFavoriteApi(meetingId);
      } else {
        await addFavoriteApi(meetingId);
      }
    },

    // 1. onMutate: Promise.all 병렬 취소 & 상세/목록 캐시 즉시 낙관적 업데이트
    onMutate: async ({ meetingId, isSaved }) => {
      const detailKey = meetingQueries.detailKey(String(meetingId));
      const listKeys = meetingQueries.listKeys();

      // 병렬 취소로 레이스 조건 방지
      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailKey }),
        queryClient.cancelQueries({ queryKey: listKeys }),
      ]);

      // 스냅샷 저장 (상세 스냅샷, 목록 스냅샷, 카운트 스냅샷)
      const previousDetail =
        queryClient.getQueryData<MeetingWithHost>(detailKey);
      const previousLists = queryClient.getQueriesData<{ pages?: MeetingList[] }>({
        queryKey: listKeys,
      });
      const countKey = favoriteQueries.countKey();
      const previousCount = queryClient.getQueryData<{ count: number }>(countKey);

      // 상세 캐시 즉시 업데이트 (0ms)
      if (previousDetail) {
        queryClient.setQueryData<MeetingWithHost>(detailKey, {
          ...previousDetail,
          isFavorited: !isSaved,
        });
      }

      // 무한 스크롤 목록 캐시 즉시 업데이트 (0ms)
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
                  ? { ...item, isFavorited: !isSaved }
                  : item,
              ),
            })),
          };
        },
      );

      // 찜 개수 즉시 업데이트 (0ms)
      if (previousCount !== undefined) {
        queryClient.setQueryData(countKey, {
          count: Math.max(0, previousCount.count + (isSaved ? -1 : 1)),
        });
      }

      return { previousDetail, previousLists, previousCount };
    },

    // 2. onError: 실패 시 스냅샷으로 정밀 롤백
    onError: (_err, { meetingId }, context) => {
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
      if (context?.previousCount !== undefined) {
        queryClient.setQueryData(favoriteQueries.countKey(), context.previousCount);
      }
      toast.error(
        '찜 처리 중 오류가 발생했습니다. (로그인이 필요할 수 있습니다)',
      );
    },

    // 3. onSettled: 성공 시 N페이지 무한 재요청 릴레이 방지! 실패 시에만 전체 목록 무효화
    onSettled: (_data, error, { meetingId, isSaved }) => {
      if (!error) {
        toast.success(
          isSaved ? '찜 목록에서 삭제되었습니다.' : '찜 목록에 추가되었습니다.',
        );
      } else {
        // 실패 시에만 전체 목록 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: meetingQueries.listKeys() });
      }
      // 단건 상세 쿼리만 갱신 (네트워크 부담 0)
      queryClient.invalidateQueries({
        queryKey: meetingQueries.detailKey(String(meetingId)),
      });
    },
  });
}
