import 'server-only';

export type SocialProvider = 'google' | 'kakao';

export interface OAuthProviderConfig {
  getAuthUrl: (state?: string) => string;
  getToken: (code: string) => Promise<string | null>;
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

export function getOAuthRedirectUri(provider: SocialProvider): string {
  return `${getBaseUrl()}/api/auth/callback/${provider}`;
}

export function getGoogleAuthUrl(state?: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const redirectUri = getOAuthRedirectUri('google');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid profile email',
    access_type: 'offline',
    prompt: 'consent',
  });

  if (state) {
    params.set('state', state);
  }

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function getKakaoAuthUrl(state?: string) {
  const clientId = process.env.KAKAO_CLIENT_ID || '';
  const redirectUri = getOAuthRedirectUri('kakao');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
  });

  if (state) {
    params.set('state', state);
  }

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}

export async function getGoogleOAuthToken(
  code: string,
): Promise<string | null> {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
  const redirectUri = getOAuthRedirectUri('google');

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    console.error('Failed to fetch Google OAuth token:', await response.text());
    return null;
  }

  const data = await response.json();
  return data.access_token || null;
}

export async function getKakaoOAuthToken(
  code: string,
): Promise<string | null> {
  const clientId = process.env.KAKAO_CLIENT_ID || '';
  const clientSecret = process.env.KAKAO_CLIENT_SECRET || '';
  const redirectUri = getOAuthRedirectUri('kakao');

  const bodyParams = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  if (clientSecret) {
    bodyParams.append('client_secret', clientSecret);
  }

  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: bodyParams,
  });

  if (!response.ok) {
    console.error('Failed to fetch Kakao OAuth token:', await response.text());
    return null;
  }

  const data = await response.json();
  return data.access_token || null;
}

export const oauthProviders: Record<SocialProvider, OAuthProviderConfig> = {
  google: {
    getAuthUrl: getGoogleAuthUrl,
    getToken: getGoogleOAuthToken,
  },
  kakao: {
    getAuthUrl: getKakaoAuthUrl,
    getToken: getKakaoOAuthToken,
  },
};

export function isSupportedProvider(
  provider: string,
): provider is SocialProvider {
  return provider in oauthProviders;
}
