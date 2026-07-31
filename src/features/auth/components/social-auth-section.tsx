'use client';

import { SocialButton } from '@/components/ui/button/social-button';

interface SocialAuthSectionProps {
  mode?: 'login' | 'signup';
  title?: string;
}

export function SocialAuthSection({
  mode = 'login',
  title = mode === 'login' ? 'SNS 계정으로 로그인' : 'SNS 계정으로 회원가입',
}: SocialAuthSectionProps) {
  const handleSocialAuth = (provider: 'google' | 'kakao') => {
    window.location.href = `/api/auth/login/${provider}`;
  };

  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SocialButton
          social="google"
          className="flex-1"
          onClick={() => handleSocialAuth('google')}
          type="button"
        />
        <SocialButton
          social="kakao"
          className="flex-1"
          onClick={() => handleSocialAuth('kakao')}
          type="button"
        />
      </div>
    </div>
  );
}
