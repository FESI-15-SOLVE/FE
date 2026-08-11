'use client';

import React from 'react';
import { useQueryStates } from 'nuqs';
import { postSearchParams } from '../../schema/post-search-params';
import MeetingPagination from '@/components/ui/pagination/meeting-pagination';

interface TalkPaginationProps {
  totalCount: number;
  pageSize?: number;
}

export function TalkPagination({
  totalCount,
  pageSize = 10,
}: TalkPaginationProps) {
  const [params, setParams] = useQueryStates(postSearchParams);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex justify-center w-full pt-6 items-center">
      <MeetingPagination
        currentPage={params.page}
        totalPages={totalPages}
        onNavigate={(page) => setParams({ page })}
        size="lg"
        className="justify-center"
      />
    </div>
  );
}
