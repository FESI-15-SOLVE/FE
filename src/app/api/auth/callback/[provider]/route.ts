import { NextRequest, NextResponse } from 'next/server';
import { oauthProviders, isSupportedProvider, getBaseUrl } from '@/features/auth/lib/oauth';
import { setAuthCookies } from '@/features/auth/lib/auth-cookies';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const errorParam = searchParams.get('error');
  const baseUrl = getBaseUrl();

  const savedState = request.cookies.get('oauth_state')?.value;

  if (!isSupportedProvider(provider)) {
    const response = NextResponse.redirect(`${baseUrl}/sign-in?error=invalid_provider`);
    response.cookies.delete('oauth_state');
    return response;
  }

  if (errorParam || !code) {
    const response = NextResponse.redirect(
      `${baseUrl}/sign-in?error=${encodeURIComponent(errorParam || 'no_code')}`,
    );
    response.cookies.delete('oauth_state');
    return response;
  }

  // CSRF 검증
  if (!state || !savedState || state !== savedState) {
    console.error('OAuth CSRF state mismatch error');
    const response = NextResponse.redirect(
      `${baseUrl}/sign-in?error=csrf_detected`,
    );
    response.cookies.delete('oauth_state');
    return response;
  }

  try {
    const oauthAccessToken = await oauthProviders[provider].getToken(code);
    if (!oauthAccessToken) {
      const response = NextResponse.redirect(
        `${baseUrl}/sign-in?error=${provider}_token_failed`,
      );
      response.cookies.delete('oauth_state');
      return response;
    }

    const response = await ServerApi.auth.loginWithOAuth(
      { teamId: TEAM_ID, provider },
      { token: oauthAccessToken },
    );

    const redirectResponse = NextResponse.redirect(`${baseUrl}/`);
    redirectResponse.cookies.delete('oauth_state');
    setAuthCookies(redirectResponse.cookies, response.data);

    return redirectResponse;
  } catch (error) {
    console.error(`${provider} OAuth login error:`, error);
    const response = NextResponse.redirect(
      `${baseUrl}/sign-in?error=oauth_failed`,
    );
    response.cookies.delete('oauth_state');
    return response;
  }
}
