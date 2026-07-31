import Link from 'next/link';
import { SignupForm } from './signup-form';
import { SocialAuthSection } from '../social-auth-section';

export function SignupContainer() {
  return (
    <div className="flex flex-col w-full max-w-142 mx-auto bg-white p-6 md:p-14 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex flex-col mb-12 ">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-900">
          회원가입
        </h1>
      </div>

      <SignupForm />
      <SocialAuthSection mode="signup" />

      <div className="flex items-center justify-center gap-2 mt-8 text-sm text-slate-600">
        <span>이미 회원이신가요?</span>
        <Link
          href="/sign-in"
          className="font-semibold text-green-500 underline-offset-4 hover:underline"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
