import { axiosInstance } from '@/lib/axios';
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

export const authApi = new Auth();
export const meetingsApi = new Meetings();
export const usersApi = new Users();
export const notificationsApi = new Notifications();
export const favoritesApi = new Favorites();
export const reviewsApi = new Reviews();
export const postsApi = new Posts();
export const imagesApi = new Images();
export const meetingTypesApi = new MeetingTypes();
export const ogApi = new Og();

// Inject custom axios instance into all generated API instances
const apis = [
  authApi,
  meetingsApi,
  usersApi,
  notificationsApi,
  favoritesApi,
  reviewsApi,
  postsApi,
  imagesApi,
  meetingTypesApi,
  ogApi,
];

apis.forEach((api) => {
  api.instance = axiosInstance;
});

export * from './data-contracts';
