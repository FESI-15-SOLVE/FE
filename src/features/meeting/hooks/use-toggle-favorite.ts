import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { addFavoriteApi, removeFavoriteApi } from '../api/toggle-favorite';
import { meetingQueries } from '../queries/meeting-query';
import { favoriteQueries } from '../queries/favorite-query';
import {
  MeetingWithHost,
  MeetingList,
  FavoriteList,
} from '@/api/data-contracts';

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      meetingId,
      isSaved,
    }: {
      meetingId: number;
      isSaved: boolean;
    }) => {
      if (isSaved) {
        await removeFavoriteApi(meetingId);
      } else {
        await addFavoriteApi(meetingId);
      }
    },

    meta: {
      toastMessage: (vars: unknown) => {
        const { isSaved } = vars as { meetingId: number; isSaved: boolean };
        return isSaved ? '찜 목록에서 삭제되었습니다.' : '찜 목록에 추가되었습니다.';
      },
      errorMessage: '찜 처리 중 오류가 발생했습니다.',
    },

    // 1. onMutate: 낙관적 업데이트 (메모리 캐시 패치)
    onMutate: async ({ meetingId, isSaved }) => {
      const detailKey = meetingQueries.detailKey(meetingId);
      const listKeys = meetingQueries.listKeys();
      const favListKeys = favoriteQueries.listKeys();
      const countKey = favoriteQueries.countKey();

      // 병렬 취소로 레이스 조건 방지
      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailKey }),
        queryClient.cancelQueries({ queryKey: listKeys }),
        queryClient.cancelQueries({ queryKey: favListKeys }),
        queryClient.cancelQueries({ queryKey: countKey }),
      ]);

      // 스냅샷 저장
      const previousDetail =
        queryClient.getQueryData<MeetingWithHost>(detailKey);
      const previousLists = queryClient.getQueriesData<{
        pages?: MeetingList[];
      }>({ queryKey: listKeys });
      const previousFavLists = queryClient.getQueriesData<{
        pages?: FavoriteList[];
      }>({ queryKey: favListKeys });
      const previousCount = queryClient.getQueryData<{ count: number }>(
        countKey,
      );

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
              const item = page.data?.find((i) => i.id === meetingId);
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
                    item.meetingId !== meetingId &&
                    item.meeting?.id !== meetingId,
                );
              } else {
                const item = page.data?.find(
                  (i) =>
                    i.meetingId === meetingId || i.meeting?.id === meetingId,
                );
                if (item?.meeting) item.meeting.isFavorited = true;
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

    // 2. onError: 실패 시 스냅샷으로 정밀 롤백 (toast는 MutationCache에서 처리)
    onError: (_err, { meetingId }, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(
          meetingQueries.detailKey(meetingId),
          context.previousDetail,
        );
      }
      context?.previousLists?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
      context?.previousFavLists?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
      if (context?.previousCount !== undefined) {
        queryClient.setQueryData(
          favoriteQueries.countKey(),
          context.previousCount,
        );
      }
    },
  });
}
