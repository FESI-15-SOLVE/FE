import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { addFavoriteApi, removeFavoriteApi } from '../api/toggle-favorite';
import { meetingQueries } from '../queries/meeting-query';
import { favoriteQueries } from '../queries/favorite-query';
import { MeetingWithHost, MeetingList, FavoriteList } from '@/api/data-contracts';
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

    // 1. onMutate: 낙관적 업데이트 (메모리 캐시 패치)
    onMutate: async ({ meetingId, isSaved }) => {
      const detailKey = meetingQueries.detailKey(String(meetingId));
      const listKeys = meetingQueries.listKeys();
      const favListKeys = favoriteQueries.listKeys();
      const countKey = favoriteQueries.countKey();

      // 병렬 취소로 레이스 조건 방지 (countKey 취소 포함)
      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailKey }),
        queryClient.cancelQueries({ queryKey: listKeys }),
        queryClient.cancelQueries({ queryKey: favListKeys }),
        queryClient.cancelQueries({ queryKey: countKey }),
      ]);

      // 스냅샷 저장
      const previousDetail = queryClient.getQueryData<MeetingWithHost>(detailKey);
      const previousLists = queryClient.getQueriesData<{ pages?: MeetingList[] }>({
        queryKey: listKeys,
      });
      const previousFavLists = queryClient.getQueriesData<{ pages?: FavoriteList[] }>({
        queryKey: favListKeys,
      });
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

      // 모임 찾기 무한 스크롤 목록 캐시 즉시 업데이트
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

      // 찜한 모임 목록 캐시 즉시 업데이트 (찜 해제 시 목록에서 즉시 제거)
      queryClient.setQueriesData<{ pages?: FavoriteList[] }>(
        { queryKey: favListKeys },
        (old) =>
          produce(old, (draft) => {
            draft?.pages?.forEach((page) => {
              if (isSaved) {
                page.data = page.data.filter(
                  (item) =>
                    String(item.meetingId) !== String(meetingId) &&
                    String(item.meeting?.id) !== String(meetingId),
                );
              } else {
                const item = page.data?.find(
                  (i) =>
                    String(i.meetingId) === String(meetingId) ||
                    String(i.meeting?.id) === String(meetingId),
                );
                if (item?.meeting) {
                  item.meeting.isFavorited = true;
                }
              }
            });
          }),
      );

      // 찜 개수 즉시 업데이트
      if (previousCount !== undefined) {
        queryClient.setQueryData(countKey, {
          count: Math.max(0, previousCount.count + (isSaved ? -1 : 1)),
        });
      }

      return { previousDetail, previousLists, previousFavLists, previousCount };
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
      if (context?.previousFavLists) {
        context.previousFavLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      if (context?.previousCount !== undefined) {
        queryClient.setQueryData(favoriteQueries.countKey(), context.previousCount);
      }
      toast.error('찜 처리 중 오류가 발생했습니다. (로그인이 필요할 수 있습니다)');
    },

    // 3. onSettled: 성공 토스트 알림, 상세 단건 갱신, 찜 카운트 및 찜 추가 시 리스트 무효화
    onSettled: (_data, error, { meetingId, isSaved }) => {
      if (!error) {
        toast.success(
          isSaved ? '찜 목록에서 삭제되었습니다.' : '찜 목록에 추가되었습니다.',
        );
      }
      queryClient.invalidateQueries({
        queryKey: meetingQueries.detailKey(String(meetingId)),
      });
      queryClient.invalidateQueries({
        queryKey: favoriteQueries.countKey(),
      });
      if (!isSaved) {
        queryClient.invalidateQueries({
          queryKey: favoriteQueries.listKeys(),
        });
      }
    },
  });
}
