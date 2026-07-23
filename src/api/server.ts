import { cookies } from 'next/headers';
import { Auth } from './Auth';
import { Meetings } from './Meetings';
import { Users } from './Users';
import { Notifications } from './Notifications';
import { Favorites } from './Favorites';
import { Reviews } from './Reviews';
import { Posts } from './Posts';
import { Images } from './Images';
import { MeetingTypes } from './MeetingTypes';
import { Og } from './Og';

export async function createServerApi() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let accessToken: string | undefined;

  if (refreshToken) {
    try {
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        'https://together-dallaem-api.vercel.app';
      const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || 'dallaem';
      const res = await fetch(`${BACKEND_URL}/${TEAM_ID}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        accessToken = data.accessToken;
      }
    } catch {
      // 서버 사이드 토큰 갱신 실패 시 익명 요청 처리
    }
  }

  const config = {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    baseURL:
      process.env.NEXT_PUBLIC_API_URL ||
      'https://together-dallaem-api.vercel.app',
  };

  return {
    auth: new Auth(config),
    meetings: new Meetings(config),
    users: new Users(config),
    notifications: new Notifications(config),
    favorites: new Favorites(config),
    reviews: new Reviews(config),
    posts: new Posts(config),
    images: new Images(config),
    meetingTypes: new MeetingTypes(config),
    og: new Og(config),
  };
}
