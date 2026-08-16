import { Metadata } from 'next';
import { PostForm } from '@/features/post/components/form/post-form';

export const metadata: Metadata = {
  title: '게시글 작성 | 같이달램 달렘토크',
  description:
    '같이달램 달렘토크 커뮤니티에 새로운 소식과 이야기를 공유해보세요.',
};

export default function TalkCreatePage() {
  return (
    <main className="w-full min-h-screen  flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <PostForm mode="create" />
      </div>
    </main>
  );
}
