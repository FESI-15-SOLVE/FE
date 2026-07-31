'use client';

import { SocialButton } from '@/components/ui/button';

export function SocialLoginSection() {
  const handleSocialLogin = (_provider: 'google' | 'kakao') => {
    // TODO: Connect to OAuth provider or API redirect
  };

  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-sm font-medium text-slate-500">
          SNS 계정으로 로그인
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 ">
        <SocialButton
          social="google"
          className="flex-1"
          onClick={() => handleSocialLogin('google')}
          type="button"
        />
        <SocialButton
          social="kakao"
          className="flex-1"
          onClick={() => handleSocialLogin('kakao')}
          type="button"
        />
      </div>
    </div>
  );
}
