import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { postQueries } from '@/features/post/queries/post-query';
import { PostEditView } from '@/features/post/components/form/post-edit-view';

interface TalkEditPageProps {
  params: Promise<{ id: string }>;
}

function parsePostId(id: string): number | null {
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) {
    return null;
  }
  return numericId;
}

export async function generateMetadata({
  params,
}: TalkEditPageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = parsePostId(id);
  if (!numericId) {
    return {
      title: '게시글 수정 | 같이달램 달렘토크',
    };
  }

  try {
    const res = await ServerApi.posts.getPostDetail({
      teamId: TEAM_ID,
      postId: numericId,
    });
    return {
      title: `${res.data.title} 수정 | 같이달램 달렘토크`,
    };
  } catch {
    return {
      title: '게시글 수정 | 같이달램 달렘토크',
    };
  }
}

export default async function TalkEditPage({ params }: TalkEditPageProps) {
  const { id } = await params;
  const numericId = parsePostId(id);

  if (!numericId) {
    notFound();
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery(
      postQueries.detailQuery(numericId, async () => {
        const res = await ServerApi.posts.getPostDetail({
          teamId: TEAM_ID,
          postId: numericId,
        });
        return res.data;
      }),
    );
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="w-full min-h-screen bg-[#f6f7f9] flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <PostEditView postId={numericId} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
