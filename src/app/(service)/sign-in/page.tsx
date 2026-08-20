import { LoginContainer } from '@/features/auth/components/login/login-container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: '같이달램 서비스에 로그인하세요.',
};

export default function SignInPage() {
  return (
    <div className="flex-1 w-full flex items-center justify-center py-10 md:py-20 px-4  min-h-[calc(100vh-88px)]">
      <LoginContainer />
    </div>
  );
}
