import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
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

    // 1. onMutate: 낙관적 업데이트 (찜하기는 실패해도 UX 임팩트 낮음)
    onMutate: async ({ meetingId, isSaved }) => {
      const detailKey = meetingQueries.detailKey(String(meetingId));
      const listKeys = meetingQueries.listKeys();

      // 병렬 취소로 레이스 조건 방지
      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailKey }),
        queryClient.cancelQueries({ queryKey: listKeys }),
      ]);

      // 스냅샷 저장
      const previousDetail = queryClient.getQueryData<MeetingWithHost>(detailKey);
      const previousLists = queryClient.getQueriesData<{ pages?: MeetingList[] }>({
        queryKey: listKeys,
      });
      const countKey = favoriteQueries.countKey();
      const previousCount = queryClient.getQueryData<{ count: number }>(countKey);

      // 상세 캐시 즉시 업데이트
      queryClient.setQueryData<MeetingWithHost>(
        detailKey,
        (old) =>
          old &&
          produce(old, (draft) => {
            draft.isFavorited = !isSaved;
          }),
      );

      // 무한 스크롤 목록 캐시 즉시 업데이트
      queryClient.setQueriesData<{ pages?: MeetingList[] }>(
        { queryKey: listKeys },
        (old) =>
          produce(old, (draft) => {
            draft?.pages?.forEach((page) => {
              const item = page.data?.find(
                (i) => String(i.id) === String(meetingId),
              );
              if (item) item.isFavorited = !isSaved;
            });
          }),
      );

      // 찜 개수 즉시 업데이트
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
      toast.error('찜 처리 중 오류가 발생했습니다. (로그인이 필요할 수 있습니다)');
    },

    // 3. onSettled: 실패 시 목록 무효화, 항상 찜 목록 및 상세 단건 갱신
    onSettled: (_data, error, { meetingId, isSaved }) => {
      if (!error) {
        toast.success(
          isSaved ? '찜 목록에서 삭제되었습니다.' : '찜 목록에 추가되었습니다.',
        );
      } else {
        queryClient.invalidateQueries({ queryKey: meetingQueries.listKeys() });
      }
      queryClient.invalidateQueries({ queryKey: favoriteQueries.listKeys() });
      queryClient.invalidateQueries({
        queryKey: meetingQueries.detailKey(String(meetingId)),
      });
    },
  });
}
