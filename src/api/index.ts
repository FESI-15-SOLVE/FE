import 'server-only';

import { Auth } from './Auth';
import { Favorites } from './Favorites';
import { Images } from './Images';
import { MeetingTypes } from './MeetingTypes';
import { Meetings } from './Meetings';
import { Notifications } from './Notifications';
import { Og } from './Og';
import { Posts } from './Posts';
import { Reviews } from './Reviews';
import { Users } from './Users';
import { ApiConfig } from './http-client';
import { BACKEND_URL } from '@/constants/api';
import { cookies } from 'next/headers';
import { ErrorResponse as ErrorResponseGenerated } from './data-contracts';

export class ErrorResponse extends Error implements ErrorResponseGenerated {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}
export class Api {
  public auth: Auth;
  public favorites: Favorites;
  public images: Images;
  public meetingTypes: MeetingTypes;
  public meetings: Meetings;
  public notifications: Notifications;
  public og: Og;
  public posts: Posts;
  public reviews: Reviews;
  public users: Users;

  constructor() {
    // 1. 서버 런타임(Server Action, API Route)용 자동 토큰 주입(securityWorker)
    const config: ApiConfig = {
      baseUrl: BACKEND_URL,
      securityWorker: async () => {
        try {
          const cookieStore = await cookies();
          const token = cookieStore.get('accessToken')?.value;
          return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        } catch {
          return {};
        }
      },
    };

    this.auth = new Auth(config);
    this.favorites = new Favorites(config);
    this.images = new Images(config);
    this.meetingTypes = new MeetingTypes(config);
    this.meetings = new Meetings(config);
    this.notifications = new Notifications(config);
    this.og = new Og(config);
    this.posts = new Posts(config);
    this.reviews = new Reviews(config);
    this.users = new Users(config);
  }
}

export const ServerApi = new Api();
