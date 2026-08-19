import type { Metadata } from 'next';
import { SignupContainer } from '@/features/auth/components/signup/signup-container';

export const metadata: Metadata = {
  title: '회원가입',
  description: '같이달램 회원가입하고 다양한 모임에 참여해보세요.',
};

export default function SignupPage() {
  return (
    <div className="mt-16 px-4">
      <SignupContainer />
    </div>
  );
}
