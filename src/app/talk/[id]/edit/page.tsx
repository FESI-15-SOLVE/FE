import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { postQueries } from '@/features/post/queries/post-query';
import { PostEditView } from '@/features/post/components/form/post-edit-view';
import { ROUTES } from '@/constants/routes';

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

  let post;
  let me;

  try {
    const [postRes, userRes] = await Promise.all([
      ServerApi.posts.getPostDetail({ teamId: TEAM_ID, postId: numericId }),
      ServerApi.users.getMyProfile({ teamId: TEAM_ID }),
    ]);
    post = postRes.data;
    me = userRes.data;
  } catch {
    // 인증 실패 또는 404/403 에러 시 게시글 상세 페이지로 안전 리다이렉트
    redirect(ROUTES.TALK.DETAIL(numericId));
  }

  // 여기부턴 fetch 성공이 보장된 상태 — try/catch 밖
  const isAuthor = Boolean(
    me?.id && (post.authorId === me.id || post.author?.id === me.id),
  );

  if (!isAuthor) {
    // 작성자가 아닌 사용자가 URL로 접근 시 SSR 레벨에서 즉시 차단 및 리다이렉트
    redirect(ROUTES.TALK.DETAIL(numericId));
  }

  const queryClient = new QueryClient();
  queryClient.setQueryData(postQueries.detailKey(numericId), post);

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
