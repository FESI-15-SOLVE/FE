'use client';

import { SocialButton } from '@/components/ui/button/social-button';

export function SocialSignupSection() {
  const handleSocialSignup = (provider: 'google' | 'kakao') => {
    // TODO: Connect to OAuth provider or API redirect for signup
    console.log(`Signup with ${provider}`);
  };

  return (
    <div className="mt-8">
      <div className="relative flex items-center mb-6">
        <div className="grow border-t border-gray-200"></div>
        <span className="shrink-0 mx-4 text-xs font-medium text-gray-500">
          SNS 계정으로 회원가입
        </span>
        <div className="grow border-t border-gray-200"></div>
      </div>

      <div className="flex gap-3 w-full flex-col sm:flex-row">
        <SocialButton
          social="google"
          className="flex-1"
          onClick={() => handleSocialSignup('google')}
          type="button"
        />
        <SocialButton
          social="kakao"
          className="flex-1"
          onClick={() => handleSocialSignup('kakao')}
          type="button"
        />
      </div>
    </div>
  );
}
