import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { postQueries } from '@/features/post/queries/post-query';
import { PostDetailView } from '@/features/post/components/detail/post-detail-view';
import { cache } from 'react';

interface TalkDetailPageProps {
  params: Promise<{ id: string }>;
}

function parsePostId(id: string): number | null {
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) {
    return null;
  }
  return numericId;
}

const getPostDetailCached = cache(async (postId: number) => {
  const res = await ServerApi.posts.getPostDetail({ teamId: TEAM_ID, postId });
  return res.data;
});

export async function generateMetadata({
  params,
}: TalkDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = parsePostId(id);
  if (!numericId) {
    return {
      title: '달렘토크 게시글',
    };
  }

  try {
    const post = await getPostDetailCached(numericId);

    return {
      title: post.title,
      description: post.content.slice(0, 100),
      openGraph: {
        title: post.title,
        description: post.content.slice(0, 100),
        images: post.image ? [post.image] : [],
      },
    };
  } catch {
    return {
      title: '달렘토크 게시글',
    };
  }
}

export default async function TalkDetailPage({ params }: TalkDetailPageProps) {
  const { id } = await params;
  const numericId = parsePostId(id);

  if (!numericId) {
    notFound();
  }

  const queryClient = getQueryClient();

  try {
    // SSR 사전 페칭 (ServerApi 연동)
    await queryClient.prefetchQuery(
      postQueries.detailQuery(numericId, () => getPostDetailCached(numericId)),
    );
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="w-full min-h-screen bg-[#f6f7f9] flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <PostDetailView postId={numericId} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
