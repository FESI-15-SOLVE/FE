import Link from 'next/link';
import { LoginForm } from './login-form';
import { SocialAuthSection } from '../social-auth-section';

export function LoginContainer() {
  return (
    <div className="flex flex-col w-full max-w-142 mx-auto bg-white p-6 md:p-14 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex flex-col mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-900">
          로그인
        </h1>
      </div>

      <LoginForm />
      <SocialAuthSection mode="login" />

      <div className="flex items-center justify-center gap-2 mt-8 text-sm text-slate-600">
        <span>같이달램이 처음이신가요?</span>
        <Link
          href="/sign-up"
          className="font-semibold text-green-500 underline-offset-4 hover:underline"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
