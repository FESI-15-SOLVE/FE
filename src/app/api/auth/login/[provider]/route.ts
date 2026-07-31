import { NextRequest, NextResponse } from 'next/server';
import { oauthProviders, isSupportedProvider, getBaseUrl } from '@/features/auth/lib/oauth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const baseUrl = getBaseUrl();

  if (!isSupportedProvider(provider)) {
    return NextResponse.redirect(`${baseUrl}/sign-in?error=invalid_provider`);
  }

  const state = crypto.randomUUID();
  const authUrl = oauthProviders[provider].getAuthUrl(state);

  const response = NextResponse.redirect(authUrl);
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });

  return response;
}
