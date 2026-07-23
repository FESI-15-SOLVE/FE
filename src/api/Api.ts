/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /** @example 1 */
  id: number;
  /** @example "dallaem" */
  teamId: string;
  /**
   * @format email
   * @example "test@example.com"
   */
  email: string;
  /** @example "홍길동" */
  name: string;
  /** @example "코드잇" */
  companyName: string | null;
  /** @example null */
  image: string | null;
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
}

export interface SignupRequest {
  /**
   * @format email
   * @example "test@example.com"
   */
  email: string;
  /**
   * 최소 8자
   * @minLength 8
   * @example "password123"
   */
  password: string;
  /**
   * @minLength 1
   * @maxLength 20
   * @example "홍길동"
   */
  name: string;
  /**
   * @maxLength 50
   * @example "코드잇"
   */
  companyName?: string;
}

export interface EmailCheckResponse {
  /** @example true */
  available: boolean;
}

export interface EmailCheckRequest {
  /**
   * @format email
   * @example "test@example.com"
   */
  email: string;
}

export interface LoginResponse {
  user: User;
  /** @example "eyJhbGciOiJIUzI1NiIs..." */
  accessToken: string;
  /** @example "eyJhbGciOiJIUzI1NiIs..." */
  refreshToken: string;
}

export interface LoginRequest {
  /**
   * @format email
   * @example "test@example.com"
   */
  email: string;
  /** @example "password123" */
  password: string;
}

export interface RefreshRequest {
  /** @example "eyJhbGciOiJIUzI1NiIs..." */
  refreshToken: string;
}

export interface AuthTokens {
  /** @example "eyJhbGciOiJIUzI1NiIs..." */
  accessToken: string;
  /**
   * Grace period 내 재요청 시 null (기존 RT 유지)
   * @example "eyJhbGciOiJIUzI1NiIs..."
   */
  refreshToken: string | null;
}

export interface OAuthRequest {
  /**
   * OAuth 제공자의 access token
   * @example "ya29.a0AfH6SM..."
   */
  token: string;
}

export interface UpdateUserRequest {
  /**
   * @minLength 1
   * @maxLength 20
   * @example "김철수"
   */
  name?: string;
  /**
   * @format email
   * @example "new@example.com"
   */
  email?: string;
  /**
   * @maxLength 50
   * @example "네이버"
   */
  companyName?: string;
  /**
   * @format uri
   * @example "https://example.com/image.jpg"
   */
  image?: string;
}

export interface PublicUser {
  /** @example 1 */
  id: number;
  /** @example "dallaem" */
  teamId: string;
  /**
   * @format email
   * @example "test@example.com"
   */
  email: string;
  /** @example "홍길동" */
  name: string;
  /** @example "코드잇" */
  companyName: string | null;
  /** @example null */
  image: string | null;
}

export interface UserMeetingsResponse {
  data: UserMeeting[];
  nextCursor: string | null;
  hasMore: boolean;
}

export type UserMeeting = JoinedMeeting & {
  /** @example "participant" */
  role: 'participant' | 'host';
};

export interface Host {
  /** @example 1 */
  id: number;
  /** @example "홍길동" */
  name: string;
  /** @example "https://example.com/profile.jpg" */
  image: string | null;
}

export type JoinedMeeting = MeetingWithHost & {
  /** @example false */
  isCompleted?: boolean;
  /**
   * @format date-time
   * @example "2026-02-01T10:00:00.000Z"
   */
  joinedAt: string | null;
  /** @example false */
  isReviewed: boolean;
};

export type MeetingWithHost = Meeting & {
  host: Host;
  /**
   * 로그인한 사용자의 찜 여부 (비로그인 시 미포함)
   * @example false
   */
  isFavorited?: boolean;
  /**
   * 로그인한 사용자의 참여 여부 (비로그인 시 미포함)
   * @example false
   */
  isJoined?: boolean;
  /**
   * 모임 완료 여부 (모임 일시가 현재보다 과거이면 true)
   * @example false
   */
  isCompleted: boolean;
};

export interface Meeting {
  /** @example 1 */
  id: number;
  /** @example "dallaem" */
  teamId: string;
  /** @example "달램핏 모임" */
  name: string;
  /** @example "달램핏" */
  type: string;
  /** @example "건대입구" */
  region: string;
  /** @example "서울시 광진구 자양동 123-45" */
  address: string | null;
  /** @example 37.5407 */
  latitude: number | null;
  /** @example 127.0693 */
  longitude: number | null;
  /**
   * @format date-time
   * @example "2026-02-10T14:00:00.000Z"
   */
  dateTime: string | null;
  /**
   * @format date-time
   * @example "2026-02-09T23:59:59.000Z"
   */
  registrationEnd: string | null;
  /** @example 10 */
  capacity: number;
  /** @example 5 */
  participantCount: number;
  /** @example "https://example.com/meeting.jpg" */
  image: string | null;
  /** @example "함께 운동하며 건강을 챙겨요!" */
  description: string | null;
  /**
   * @format date-time
   * @example null
   */
  canceledAt: string | null;
  /**
   * @format date-time
   * @example null
   */
  confirmedAt: string | null;
  /** @example 1 */
  hostId: number;
  /** @example 1 */
  createdBy: number;
  /**
   * @format date-time
   * @example "2026-02-01T10:00:00.000Z"
   */
  createdAt: string | null;
  /**
   * @format date-time
   * @example "2026-02-01T10:00:00.000Z"
   */
  updatedAt: string | null;
}

export interface UserPostsResponse {
  data: {
    id: number;
    teamId: string;
    title: string;
    content: string;
    image: string | null;
    authorId: number;
    viewCount: number;
    likeCount: number;
    /** @format date-time */
    createdAt: string | null;
    /** @format date-time */
    updatedAt: string | null;
    author: {
      id: number;
      name: string;
      image: string | null;
    };
    _count: {
      comments: number;
    };
  }[];
  nextCursor?: string | null;
  hasMore: boolean;
  totalCount?: number;
  currentOffset?: number;
  limit?: number;
}

export interface UserReviewsResponse {
  data: UserReview[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface UserReview {
  /** @example 1 */
  id: number;
  /** @example 5 */
  score: number;
  /** @example "너무 좋았어요!" */
  comment: string;
  /** @example 123 */
  meetingId: number;
  meeting: {
    /** @example 123 */
    id: number;
    /**
     * 모임 타입
     * @example "DALLAEMFIT"
     */
    type: string;
    /** @example "달램핏 모임" */
    name: string;
    /** @example "https://example.com/image.jpg" */
    image: string | null;
    /**
     * @format date-time
     * @example "2026-02-01T14:00:00Z"
     */
    dateTime: string;
  };
  /**
   * @format date-time
   * @example "2026-02-01T20:00:00Z"
   */
  createdAt: string;
}

export interface JoinedMeetingList {
  data: JoinedMeeting[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface MeetingList {
  data: MeetingWithHost[];
  nextCursor?: string | null;
  hasMore: boolean;
  totalCount?: number;
  currentOffset?: number;
  limit?: number;
}

export interface CreateMeeting {
  /**
   * @minLength 1
   * @maxLength 100
   * @example "달램핏 모임"
   */
  name: string;
  /**
   * @minLength 1
   * @maxLength 50
   * @example "달램핏"
   */
  type: string;
  /**
   * 카카오맵 주소에서 추출한 시/도 + 구/군 (예: '서울 강남구', '경기 성남시 분당구')
   * @minLength 1
   * @maxLength 100
   * @example "서울 강남구"
   */
  region: string;
  /**
   * 카카오맵 장소명 + 도로명주소 + 상세주소 (쉼표 구분)
   * @maxLength 200
   * @example "스타벅스 강남역점, 서울 강남구 강남대로 390, 3층"
   */
  address?: string;
  /**
   * 카카오맵에서 반환된 위도
   * @min -90
   * @max 90
   * @example 37.4979
   */
  latitude?: number;
  /**
   * 카카오맵에서 반환된 경도
   * @min -180
   * @max 180
   * @example 127.0276
   */
  longitude?: number;
  /**
   * @format date-time
   * @example "2026-02-01T14:00:00.000Z"
   */
  dateTime: string | null;
  /**
   * @format date-time
   * @example "2026-01-31T23:59:59.000Z"
   */
  registrationEnd: string | null;
  /**
   * @min 1
   * @max 1000
   * @example 20
   */
  capacity: number;
  /**
   * @format uri
   * @example "https://example.com/image.jpg"
   */
  image?: string | null;
  /**
   * @maxLength 1000
   * @example "함께 운동하며 건강을 챙겨요!"
   */
  description?: string;
}

export interface UpdateMeeting {
  /**
   * @minLength 1
   * @maxLength 100
   */
  name?: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  type?: string;
  /**
   * @minLength 1
   * @maxLength 100
   */
  region?: string;
  /** @maxLength 200 */
  address?: string;
  /**
   * @min -90
   * @max 90
   */
  latitude?: number;
  /**
   * @min -180
   * @max 180
   */
  longitude?: number;
  /** @format date-time */
  dateTime?: string | null;
  /** @format date-time */
  registrationEnd?: string | null;
  /**
   * @min 1
   * @max 1000
   */
  capacity?: number;
  /** @format uri */
  image?: string | null;
  /** @maxLength 1000 */
  description?: string;
}

export interface ParticipantList {
  data: Participant[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface Participant {
  /** @example 1 */
  id: number;
  /** @example "dallaem" */
  teamId: string;
  /** @example 1 */
  meetingId: number;
  /** @example 2 */
  userId: number;
  /**
   * @format date-time
   * @example "2026-02-01T10:00:00.000Z"
   */
  joinedAt: string | null;
  user?: {
    /** @example 2 */
    id: number;
    /** @example "김철수" */
    name: string;
    /** @example null */
    image: string | null;
  };
}

export interface UpdateMeetingStatus {
  /**
   * 변경할 상태 - CONFIRMED: 확정, CANCELED: 취소
   * @example "CONFIRMED"
   */
  status: 'CONFIRMED' | 'CANCELED';
}

export type MeetingTypeList = MeetingType[];

export interface MeetingType {
  /** @example 1 */
  id: number;
  /** @example "team-1" */
  teamId: string;
  /** @example "달램핏" */
  name: string;
  /** @example "달램핏 모임입니다" */
  description: string | null;
  /**
   * @format date-time
   * @example "2026-01-28T12:00:00.000Z"
   */
  createdAt: string | null;
}

export interface CreateMeetingType {
  /**
   * @minLength 1
   * @maxLength 50
   * @example "달램핏"
   */
  name: string;
  /**
   * @maxLength 200
   * @example "달램핏 모임입니다"
   */
  description?: string;
}

export interface UpdateMeetingType {
  /**
   * @minLength 1
   * @maxLength 50
   * @example "달램핏"
   */
  name?: string;
  /**
   * @maxLength 200
   * @example "달램핏 모임입니다"
   */
  description?: string;
}

export interface PaginatedReview {
  /** @example [{"id":1,"teamId":"dallaem","meetingId":10,"userId":2,"score":5,"comment":"너무 좋았어요!","createdAt":"2026-02-01T20:00:00.000Z","updatedAt":"2026-02-01T20:00:00.000Z","user":{"id":2,"email":"chulsoo@example.com","name":"김철수","image":null},"meeting":{"id":10,"name":"달램핏 모임","type":"달램핏","region":"건대입구","image":"https://example.com/meeting.jpg","dateTime":"2026-02-10T14:00:00.000Z"}}] */
  data: ReviewWithDetails[];
  /** @example "eyJpZCI6MTB9" */
  nextCursor: string | null;
  /** @example true */
  hasMore: boolean;
}

export type ReviewWithDetails = Review & {
  user: {
    /** @example 2 */
    id: number;
    /**
     * @format email
     * @example "chulsoo@example.com"
     */
    email: string;
    /** @example "김철수" */
    name: string;
    /** @example null */
    image: string | null;
  };
  meeting: {
    /** @example 10 */
    id: number;
    /** @example "달램핏 모임" */
    name: string;
    /** @example "달램핏" */
    type: string;
    /** @example "건대입구" */
    region: string;
    /** @example "https://example.com/meeting.jpg" */
    image: string | null;
    /**
     * @format date-time
     * @example "2026-02-10T14:00:00.000Z"
     */
    dateTime: string | null;
  };
};

export interface Review {
  /** @example 1 */
  id: number;
  /** @example "dallaem" */
  teamId: string;
  /** @example 10 */
  meetingId: number;
  /** @example 2 */
  userId: number;
  /** @example 5 */
  score: number;
  /** @example "너무 좋았어요!" */
  comment: string;
  /**
   * @format date-time
   * @example "2026-02-01T20:00:00.000Z"
   */
  createdAt: string | null;
  /**
   * @format date-time
   * @example "2026-02-01T20:00:00.000Z"
   */
  updatedAt: string | null;
}

export interface ReviewStatistics {
  /** @example 4.5 */
  averageScore: number;
  /** @example 42 */
  totalReviews: number;
  /** @example 1 */
  oneStar: number;
  /** @example 2 */
  twoStars: number;
  /** @example 5 */
  threeStars: number;
  /** @example 14 */
  fourStars: number;
  /** @example 20 */
  fiveStars: number;
}

export type CategoryStatistics = CategoryStatisticsItem[];

export interface CategoryStatisticsItem {
  /** @example "달램핏" */
  type: string;
  /** @example 4.7 */
  averageScore: number;
  /** @example 28 */
  totalReviews: number;
  /** @example 1 */
  oneStar: number;
  /** @example 2 */
  twoStars: number;
  /** @example 3 */
  threeStars: number;
  /** @example 8 */
  fourStars: number;
  /** @example 14 */
  fiveStars: number;
}

export interface UpdateReview {
  /**
   * @min 1
   * @max 5
   */
  score?: number;
  /**
   * @minLength 1
   * @maxLength 1000
   */
  comment?: string;
}

export interface CreateReviewByMeeting {
  /**
   * @min 1
   * @max 5
   * @example 5
   */
  score: number;
  /**
   * @minLength 1
   * @maxLength 1000
   * @example "정말 좋은 모임이었습니다!"
   */
  comment: string;
}

export interface FavoriteList {
  data: FavoriteWithMeeting[];
  nextCursor?: string | null;
  hasMore: boolean;
  totalCount?: number;
  currentOffset?: number;
  limit?: number;
}

export type FavoriteWithMeeting = Favorite & {
  meeting: MeetingWithHost;
};

export interface Favorite {
  id: number;
  teamId: string;
  meetingId: number;
  userId: number;
  /** @format date-time */
  createdAt: string | null;
}

export interface FavoriteCount {
  count: number;
}

export interface PresignedUrlResponse {
  /**
   * S3 presigned PUT URL (5분 유효)
   * @format uri
   */
  presignedUrl: string;
  /**
   * 업로드 완료 후 접근 가능한 공개 URL
   * @format uri
   */
  publicUrl: string;
}

export interface PresignedUrlRequest {
  /**
   * 업로드할 파일명 (확장자 포함)
   * @minLength 1
   */
  fileName: string;
  /** 이미지 MIME 타입 */
  contentType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';
  /**
   * 이미지 저장 폴더
   * @default "meetings"
   */
  folder?: 'meetings' | 'users' | 'posts';
}

export interface PostList {
  data: PostWithAuthor[];
  nextCursor?: string | null;
  hasMore: boolean;
  totalCount?: number;
  currentOffset?: number;
  limit?: number;
  /** 필터 조건에 맞는 게시글들의 조회수 합계 */
  totalViewCount: number;
}

export type PostWithAuthor = Post & {
  author: Author;
  _count: {
    comments: number;
  };
};

export interface Author {
  id: number;
  name: string;
  image: string | null;
}

export interface Post {
  id: number;
  teamId: string;
  title: string;
  content: string;
  image: string | null;
  authorId: number;
  viewCount: number;
  likeCount: number;
  /** @format date-time */
  createdAt: string | null;
  /** @format date-time */
  updatedAt: string | null;
}

export interface CreatePost {
  /**
   * @minLength 1
   * @maxLength 200
   * @example "달램핏 후기"
   */
  title: string;
  /**
   * @minLength 1
   * @maxLength 50000
   * @example "정말 좋은 모임이었습니다."
   */
  content: string;
  /**
   * @format uri
   * @example "https://example.com/image.jpg"
   */
  image?: string;
}

export type PostWithComments = PostWithAuthor & {
  author?: Author & {
    email: string;
  };
  comments: Comment[];
  isLiked: boolean;
};

export interface Comment {
  id: number;
  teamId: string;
  postId: number;
  authorId: number;
  author: Author;
  content: string;
  likeCount: number;
  isLiked: boolean;
  /** @format date-time */
  createdAt: string | null;
  /** @format date-time */
  updatedAt: string | null;
}

export interface UpdatePost {
  /**
   * @minLength 1
   * @maxLength 200
   */
  title?: string;
  /**
   * @minLength 1
   * @maxLength 50000
   */
  content?: string;
  /** @format uri */
  image?: string | null;
}

export interface CreateComment {
  /**
   * @minLength 1
   * @maxLength 1000
   * @example "좋은 글이네요!"
   */
  content: string;
}

export interface CommentList {
  data: Comment[];
  nextCursor?: string | null;
  hasMore: boolean;
  totalCount?: number;
  currentOffset?: number;
  limit?: number;
}

export interface CommentLike {
  id: number;
  teamId: string;
  commentId: number;
  userId: number;
  /** @format date-time */
  createdAt: string | null;
}

export interface UpdateComment {
  /**
   * @minLength 1
   * @maxLength 1000
   * @example "수정된 댓글입니다!"
   */
  content: string;
}

export interface PostLike {
  id: number;
  teamId: string;
  postId: number;
  userId: number;
  /** @format date-time */
  createdAt: string | null;
}

export interface NotificationList {
  data: Notification[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface Notification {
  id: number;
  teamId: string;
  userId: number;
  type:
    'MEETING_CONFIRMED' | 'MEETING_CANCELED' | 'MEETING_DELETED' | 'COMMENT';
  message: string;
  data: NotificationData;
  isRead: boolean;
  /** @format date-time */
  createdAt: string | null;
}

export type NotificationData = {
  meetingId?: number;
  meetingName?: string;
  postId?: number;
  postTitle?: string;
  commentId?: number;
  commentContent?: string;
  image?: string | null;
} | null;

export interface OgMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string | null;
  siteName: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<
  D extends unknown,
  E extends unknown = unknown,
> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'https://together-dallaem-api.vercel.app';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title 같이 달램 API
 * @version 1.0.0
 * @baseUrl https://together-dallaem-api.vercel.app
 *
 * 모임 매칭 플랫폼 API
 *
 * ## 인증 방식
 * - **JWT Bearer Token**: 로그인 후 발급받은 accessToken을 Authorization 헤더에 포함
 * - accessToken 만료 시간: 15분
 * - refreshToken 만료 시간: 7일
 *
 * ## 사용 예시
 * ```
 * Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
 * ```
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  teamId = {
    /**
     * @description 새로운 사용자를 등록합니다. 이메일은 팀 내에서 고유해야 합니다.
     *
     * @tags Auth
     * @name CreateSignup
     * @summary 회원가입
     * @request POST:/{teamId}/auth/signup
     * @secure
     */
    createSignup: (
      teamId: string,
      data: SignupRequest,
      params: RequestParams = {},
    ) =>
      this.request<User, ErrorResponse>({
        path: `/${teamId}/auth/signup`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 회원가입 전에 팀 내 이메일 중복 여부를 확인합니다.
     *
     * @tags Auth
     * @name CreateEmailCheck
     * @summary 이메일 사용 가능 여부 확인
     * @request POST:/{teamId}/auth/email-check
     * @secure
     */
    createEmailCheck: (
      teamId: string,
      data: EmailCheckRequest,
      params: RequestParams = {},
    ) =>
      this.request<EmailCheckResponse, any>({
        path: `/${teamId}/auth/email-check`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 이메일과 비밀번호로 로그인합니다. 성공 시 accessToken(15분)과 refreshToken(7일)을 발급합니다.
     *
     * @tags Auth
     * @name CreateLogin
     * @summary 로그인
     * @request POST:/{teamId}/auth/login
     * @secure
     */
    createLogin: (
      teamId: string,
      data: LoginRequest,
      params: RequestParams = {},
    ) =>
      this.request<LoginResponse, ErrorResponse>({
        path: `/${teamId}/auth/login`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 로그인된 세션을 종료합니다. 특정 리프레시 토큰만 무효화됩니다.
     *
     * @tags Auth
     * @name CreateLogout
     * @summary 로그아웃
     * @request POST:/{teamId}/auth/logout
     * @secure
     */
    createLogout: (
      teamId: string,
      data: RefreshRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/${teamId}/auth/logout`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 리프레시 토큰으로 새로운 accessToken과 refreshToken을 발급받습니다. 기존 리프레시 토큰은 무효화됩니다 (토큰 로테이션). ⚠️ **프론트엔드 구현 주의사항**: 응답의 `refreshToken`이 `null`이면 기존에 저장된 refreshToken을 그대로 유지해야 합니다. `null`로 덮어쓰면 다음 갱신 시 실패합니다. 이는 동시 요청(예: axios interceptor에서 여러 401 동시 발생) 시 두 번째 요청부터 발생하며, 첫 번째 요청에서 이미 새 refreshToken을 받았으므로 그것을 유지하면 됩니다.
     *
     * @tags Auth
     * @name CreateRefresh
     * @summary 토큰 갱신
     * @request POST:/{teamId}/auth/refresh
     * @secure
     */
    createRefresh: (
      teamId: string,
      data: RefreshRequest,
      params: RequestParams = {},
    ) =>
      this.request<AuthTokens, ErrorResponse>({
        path: `/${teamId}/auth/refresh`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Google 또는 Kakao OAuth access token으로 로그인합니다. 최초 로그인 시 자동 가입되며, 기존 OAuth 계정은 앱 내 프로필(name/image)을 유지합니다.
     *
     * @tags Auth
     * @name CreateOauth
     * @summary OAuth 로그인
     * @request POST:/{teamId}/oauth/{provider}
     * @secure
     */
    createOauth: (
      teamId: string,
      provider: 'google' | 'kakao',
      data: OAuthRequest,
      params: RequestParams = {},
    ) =>
      this.request<LoginResponse, ErrorResponse>({
        path: `/${teamId}/oauth/${provider}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 로그인된 사용자의 정보를 조회합니다. Authorization 헤더에 Bearer 토큰이 필요합니다.
     *
     * @tags Users
     * @name GetTeamId
     * @summary 내 정보 조회
     * @request GET:/{teamId}/users/me
     * @secure
     */
    getTeamId: (teamId: string, params: RequestParams = {}) =>
      this.request<User, ErrorResponse>({
        path: `/${teamId}/users/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 로그인된 사용자의 정보를 수정합니다. 변경할 필드만 전송하면 됩니다.
     *
     * @tags Users
     * @name PatchPatchTeamId
     * @summary 내 정보 수정
     * @request PATCH:/{teamId}/users/me
     * @secure
     */
    patchPatchTeamId: (
      teamId: string,
      data: UpdateUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<User, ErrorResponse>({
        path: `/${teamId}/users/me`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 특정 사용자의 공개 프로필을 조회합니다. 인증 없이 접근 가능합니다.
     *
     * @tags Users
     * @name GetUsersDetail
     * @summary 유저 프로필 조회
     * @request GET:/{teamId}/users/{userId}
     * @secure
     */
    getUsersDetail: (
      teamId: string,
      userId: number,
      params: RequestParams = {},
    ) =>
      this.request<PublicUser, ErrorResponse>({
        path: `/${teamId}/users/${userId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 로그인된 사용자의 모임 목록을 조회합니다. 필터와 정렬 옵션을 지원합니다.
     *
     * @tags Users
     * @name GetMeMeetingsList
     * @summary 내가 참여한/만든 모임 목록 조회
     * @request GET:/{teamId}/users/me/meetings
     * @secure
     */
    getMeMeetingsList: (
      teamId: string,
      query?: {
        /** @example "joined" */
        type?: 'joined' | 'created';
        /** @example "false" */
        completed?: 'true' | 'false';
        /** @example "false" */
        reviewed?: 'true' | 'false';
        /** @example "dateTime" */
        sortBy?: 'dateTime' | 'joinedAt' | 'createdAt';
        /**
         * @default "desc"
         * @example "desc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * @min 0
         * @exclusiveMin true
         * @max 50
         * @default 10
         * @example 10
         */
        size?: number;
        /** @example "eyJpZCI6MTB9" */
        cursor?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserMeetingsResponse, ErrorResponse>({
        path: `/${teamId}/users/me/meetings`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 로그인된 사용자가 작성한 게시글 목록을 조회합니다. 정렬 옵션을 지원합니다. **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함
     *
     * @tags Users
     * @name GetMePostsList
     * @summary 내가 작성한 게시글 목록 조회
     * @request GET:/{teamId}/users/me/posts
     * @secure
     */
    getMePostsList: (
      teamId: string,
      query?: {
        /**
         * @default "createdAt"
         * @example "createdAt"
         */
        sortBy?: 'createdAt' | 'viewCount' | 'likeCount';
        /**
         * @default "desc"
         * @example "desc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * @min 0
         * @example 0
         */
        offset?: number | null;
        /**
         * @min 1
         * @max 100
         * @example 10
         */
        limit?: number;
        /**
         * @min 0
         * @exclusiveMin true
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
        /** @example "eyJpZCI6MTB9" */
        cursor?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserPostsResponse, ErrorResponse>({
        path: `/${teamId}/users/me/posts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 로그인된 사용자가 작성한 리뷰 목록을 조회합니다. 정렬 옵션을 지원합니다.
     *
     * @tags Users
     * @name GetMeReviewsList
     * @summary 내가 작성한 리뷰 목록 조회
     * @request GET:/{teamId}/users/me/reviews
     * @secure
     */
    getMeReviewsList: (
      teamId: string,
      query?: {
        /**
         * @default "createdAt"
         * @example "createdAt"
         */
        sortBy?: 'createdAt' | 'score';
        /**
         * @default "desc"
         * @example "desc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * @min 0
         * @exclusiveMin true
         * @max 50
         * @default 10
         * @example 10
         */
        size?: number;
        /** @example "eyJpZCI6MTB9" */
        cursor?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserReviewsResponse, ErrorResponse>({
        path: `/${teamId}/users/me/reviews`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 사용자가 참여한 모임 목록을 조회합니다.
     *
     * @tags Meetings
     * @name GetJoinedList
     * @summary 참여한 모임 목록
     * @request GET:/{teamId}/meetings/joined
     * @secure
     */
    getJoinedList: (
      teamId: string,
      query?: {
        /**
         * 완료된 모임만 조회 (true: 지난 모임, false: 예정된 모임)
         * @example "false"
         */
        completed?: 'true' | 'false';
        /**
         * 리뷰 작성 여부로 필터링 (true: 작성함, false: 미작성)
         * @example "false"
         */
        reviewed?: 'true' | 'false';
        /**
         * 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), joinedAt(참가 신청일)
         * @default "dateTime"
         * @example "dateTime"
         */
        sortBy?: 'dateTime' | 'registrationEnd' | 'joinedAt';
        /**
         * 정렬 순서: asc(오름차순), desc(내림차순)
         * @default "asc"
         * @example "asc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * 다음 페이지를 위한 커서
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 페이지 크기 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<JoinedMeetingList, ErrorResponse>({
        path: `/${teamId}/meetings/joined`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 사용자가 호스트인 모임 목록을 조회합니다. **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함
     *
     * @tags Meetings
     * @name GetTeamId2
     * @summary 내가 만든 모임 목록
     * @request GET:/{teamId}/meetings/my
     * @originalName getTeamId
     * @duplicate
     * @secure
     */
    getTeamId2: (
      teamId: string,
      query?: {
        /**
         * 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), participantCount(참가자 수)
         * @default "dateTime"
         * @example "dateTime"
         */
        sortBy?: 'dateTime' | 'registrationEnd' | 'participantCount';
        /**
         * 정렬 순서: asc(오름차순), desc(내림차순)
         * @default "asc"
         * @example "asc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * 다음 페이지를 위한 커서 (offset과 함께 사용 불가)
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 건너뛸 항목 수 (cursor와 함께 사용 불가)
         * @min 0
         * @example 0
         */
        offset?: number | null;
        /**
         * 조회할 최대 항목 수 (offset 사용 시, 기본 10, 최대 100)
         * @min 1
         * @max 100
         * @example 10
         */
        limit?: number;
        /**
         * 페이지 크기 - cursor 사용 시 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MeetingList, ErrorResponse>({
        path: `/${teamId}/meetings/my`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임 목록을 조회합니다. 취소되지 않은 모임만 반환됩니다. 로그인 시 각 모임의 찜 여부(isFavorited)와 참여 여부(isJoined)가 포함됩니다.
     *
     * @tags Meetings
     * @name GetMeetingsList
     * @summary 모임 목록
     * @request GET:/{teamId}/meetings
     * @secure
     */
    getMeetingsList: (
      teamId: string,
      query?: {
        /**
         * 특정 모임 ID로 필터링
         * @min 0
         * @exclusiveMin true
         * @example 1
         */
        id?: number;
        /**
         * 모임 종류로 필터링 (예: 달램핏, 오피스 스트레칭)
         * @example "달램핏"
         */
        type?: string;
        /**
         * 지역으로 필터링 (예: 강남, 건대입구, 홍대입구)
         * @example "건대입구"
         */
        region?: string;
        /** 모임명·설명·지역·종류·주소 검색 */
        keyword?: string;
        /**
         * 모임 시작 범위 (이상, ISO 8601). 예: KST 2026-02-10 하루를 조회하려면 dateStart=2026-02-09T15:00:00Z
         * @format date-time
         * @example "2026-02-09T15:00:00Z"
         */
        dateStart?: string | null;
        /**
         * 모임 끝 범위 (이하, ISO 8601). 예: KST 2026-02-10 하루를 조회하려면 dateEnd=2026-02-10T14:59:59.999Z
         * @format date-time
         * @example "2026-02-10T14:59:59.999Z"
         */
        dateEnd?: string | null;
        /**
         * 호스트 사용자 ID로 필터링
         * @min 0
         * @exclusiveMin true
         * @example 1
         */
        createdBy?: number;
        /**
         * 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), participantCount(참가자 수), createdAt(모임 생성 시각). sortOrder 생략 시 createdAt은 최신순(desc), 그 외는 오름차순(asc)
         * @default "dateTime"
         * @example "dateTime"
         */
        sortBy?:
          'dateTime' | 'registrationEnd' | 'participantCount' | 'createdAt';
        /**
         * 정렬 순서: asc(오름차순), desc(내림차순). 생략 시 sortBy=createdAt이면 desc, 아니면 asc
         * @example "asc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * 다음 페이지를 위한 커서
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 페이지 크기 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MeetingList, any>({
        path: `/${teamId}/meetings`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 새로운 모임을 생성합니다. **비즈니스 규칙:** - 모임 일시(dateTime)는 현재 시각 이후여야 합니다 - 모집 마감일(registrationEnd)은 모임 일시 이전이어야 합니다 - 호스트는 자동으로 첫 번째 참가자로 등록됩니다 - capacity는 최소 1명 이상이어야 합니다
     *
     * @tags Meetings
     * @name CreateMeetings
     * @summary 모임 생성
     * @request POST:/{teamId}/meetings
     * @secure
     */
    createMeetings: (
      teamId: string,
      data: CreateMeeting,
      params: RequestParams = {},
    ) =>
      this.request<MeetingWithHost, ErrorResponse>({
        path: `/${teamId}/meetings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 특정 모임의 상세 정보를 조회합니다. 로그인 시 찜 여부(isFavorited)와 참여 여부(isJoined)가 포함됩니다.
     *
     * @tags Meetings
     * @name GetMeetingsDetail
     * @summary 모임 상세
     * @request GET:/{teamId}/meetings/{meetingId}
     * @secure
     */
    getMeetingsDetail: (
      teamId: string,
      meetingId: number,
      params: RequestParams = {},
    ) =>
      this.request<MeetingWithHost, ErrorResponse>({
        path: `/${teamId}/meetings/${meetingId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임 정보를 수정합니다. **비즈니스 규칙:** - 호스트만 수정할 수 있습니다 - 취소된 모임은 수정 불가 - 정원(capacity)을 현재 참가자 수보다 줄일 수 없습니다 - 모임 일시는 현재 시각 이후여야 합니다 - 모집 마감일은 모임 일시 이전이어야 합니다
     *
     * @tags Meetings
     * @name PatchMeetingsPartial
     * @summary 모임 수정
     * @request PATCH:/{teamId}/meetings/{meetingId}
     * @secure
     */
    patchMeetingsPartial: (
      teamId: string,
      meetingId: number,
      data: UpdateMeeting,
      params: RequestParams = {},
    ) =>
      this.request<MeetingWithHost, ErrorResponse>({
        path: `/${teamId}/meetings/${meetingId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임을 완전히 삭제합니다. 주최자만 가능합니다. 참가자, 리뷰, 찜이 모두 함께 삭제됩니다.
     *
     * @tags Meetings
     * @name DeleteMeetings
     * @summary 모임 삭제
     * @request DELETE:/{teamId}/meetings/{meetingId}
     * @secure
     */
    deleteMeetings: (
      teamId: string,
      meetingId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/meetings/${meetingId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임에 참여 신청합니다. **비즈니스 규칙:** - 취소된 모임은 참여 불가 (400 CANCELED) - 모집 마감일이 지나면 참여 불가 (400 REGISTRATION_CLOSED) - 정원 초과 시 참여 불가 (400 CAPACITY_FULL) - 동일 모임 중복 참여 불가 (409 ALREADY_JOINED) - 호스트는 자동 참여되므로 별도 신청 불필요 **알림:** - 참여 인원이 5명에 도달하면 호스트에게 개설 확정 알림 발생
     *
     * @tags Meetings
     * @name CreateJoin
     * @summary 모임 참여
     * @request POST:/{teamId}/meetings/{meetingId}/join
     * @secure
     */
    createJoin: (
      teamId: string,
      meetingId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/meetings/${meetingId}/join`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임 참여를 취소합니다. - 호스트는 참여를 취소할 수 없습니다 (모임 취소를 이용해주세요) - 취소된 모임은 참여 취소 불가 - 이미 시작된 모임은 참여 취소 불가
     *
     * @tags Meetings
     * @name DeleteJoin
     * @summary 참여 취소
     * @request DELETE:/{teamId}/meetings/{meetingId}/join
     * @secure
     */
    deleteJoin: (
      teamId: string,
      meetingId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/meetings/${meetingId}/join`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임의 참가자 목록을 조회합니다.
     *
     * @tags Meetings
     * @name GetParticipantsList
     * @summary 참가자 목록
     * @request GET:/{teamId}/meetings/{meetingId}/participants
     * @secure
     */
    getParticipantsList: (
      teamId: string,
      meetingId: number,
      query?: {
        /**
         * 다음 페이지를 위한 커서
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 페이지 크기 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ParticipantList, ErrorResponse>({
        path: `/${teamId}/meetings/${meetingId}/participants`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임을 확정하거나 취소합니다. 주최자만 가능합니다.
     *
     * @tags Meetings
     * @name PatchStatusPartial
     * @summary 모임 상태 변경
     * @request PATCH:/{teamId}/meetings/{meetingId}/status
     * @secure
     */
    patchStatusPartial: (
      teamId: string,
      meetingId: number,
      data: UpdateMeetingStatus,
      params: RequestParams = {},
    ) =>
      this.request<MeetingWithHost, ErrorResponse>({
        path: `/${teamId}/meetings/${meetingId}/status`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 팀의 모임 종류 목록을 조회합니다.
     *
     * @tags MeetingTypes
     * @name GetMeetingTypesList
     * @summary 모임 종류 목록
     * @request GET:/{teamId}/meeting-types
     * @secure
     */
    getMeetingTypesList: (teamId: string, params: RequestParams = {}) =>
      this.request<MeetingTypeList, any>({
        path: `/${teamId}/meeting-types`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 새로운 모임 종류를 생성합니다. 팀 내에서 이름은 고유해야 합니다.
     *
     * @tags MeetingTypes
     * @name CreateMeetingTypes
     * @summary 모임 종류 생성
     * @request POST:/{teamId}/meeting-types
     * @secure
     */
    createMeetingTypes: (
      teamId: string,
      data: CreateMeetingType,
      params: RequestParams = {},
    ) =>
      this.request<MeetingType, ErrorResponse>({
        path: `/${teamId}/meeting-types`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임 종류 정보를 수정합니다.
     *
     * @tags MeetingTypes
     * @name PatchMeetingTypesPartial
     * @summary 모임 종류 수정
     * @request PATCH:/{teamId}/meeting-types/{typeId}
     * @secure
     */
    patchMeetingTypesPartial: (
      teamId: string,
      typeId: number,
      data: UpdateMeetingType,
      params: RequestParams = {},
    ) =>
      this.request<MeetingType, ErrorResponse>({
        path: `/${teamId}/meeting-types/${typeId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임 종류를 삭제합니다.
     *
     * @tags MeetingTypes
     * @name DeleteMeetingTypes
     * @summary 모임 종류 삭제
     * @request DELETE:/{teamId}/meeting-types/{typeId}
     * @secure
     */
    deleteMeetingTypes: (
      teamId: string,
      typeId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/meeting-types/${typeId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 리뷰 목록을 조회합니다.
     *
     * @tags Reviews
     * @name GetReviewsList
     * @summary 리뷰 목록
     * @request GET:/{teamId}/reviews
     * @secure
     */
    getReviewsList: (
      teamId: string,
      query?: {
        /**
         * 특정 모임의 리뷰만 조회
         * @min 0
         * @exclusiveMin true
         */
        meetingId?: number;
        /**
         * 특정 사용자의 리뷰만 조회
         * @min 0
         * @exclusiveMin true
         */
        userId?: number;
        /** 모임 종류로 필터링 */
        type?: string;
        /** 지역으로 필터링 */
        region?: string;
        /**
         * 모임 시작 범위 (이상, ISO 8601)
         * @format date-time
         * @example "2026-02-09T15:00:00Z"
         */
        dateStart?: string | null;
        /**
         * 모임 끝 범위 (이하, ISO 8601)
         * @format date-time
         * @example "2026-02-10T14:59:59.999Z"
         */
        dateEnd?: string | null;
        /**
         * 모집 마감 시작 범위 (이상, ISO 8601)
         * @format date-time
         * @example "2026-02-09T15:00:00Z"
         */
        registrationEndStart?: string | null;
        /**
         * 모집 마감 끝 범위 (이하, ISO 8601)
         * @format date-time
         * @example "2026-02-10T14:59:59.999Z"
         */
        registrationEndEnd?: string | null;
        /**
         * 정렬 기준
         * @default "createdAt"
         */
        sortBy?: 'createdAt' | 'score' | 'participantCount';
        /**
         * 정렬 순서
         * @default "desc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * 다음 페이지를 위한 커서
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 페이지 크기 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedReview, any>({
        path: `/${teamId}/reviews`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 팀 전체 리뷰 통계를 조회합니다.
     *
     * @tags Reviews
     * @name GetStatisticsList
     * @summary 리뷰 전체 통계
     * @request GET:/{teamId}/reviews/statistics
     * @secure
     */
    getStatisticsList: (teamId: string, params: RequestParams = {}) =>
      this.request<ReviewStatistics, any>({
        path: `/${teamId}/reviews/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모임 종류별 리뷰 통계를 조회합니다.
     *
     * @tags Reviews
     * @name GetCategoriesStatisticsList
     * @summary 카테고리별 리뷰 통계
     * @request GET:/{teamId}/reviews/categories/statistics
     * @secure
     */
    getCategoriesStatisticsList: (teamId: string, params: RequestParams = {}) =>
      this.request<CategoryStatistics, any>({
        path: `/${teamId}/reviews/categories/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 리뷰를 수정합니다. 본인의 리뷰만 수정할 수 있습니다.
     *
     * @tags Reviews
     * @name PatchReviewsPartial
     * @summary 리뷰 수정
     * @request PATCH:/{teamId}/reviews/{reviewId}
     * @secure
     */
    patchReviewsPartial: (
      teamId: string,
      reviewId: number,
      data: UpdateReview,
      params: RequestParams = {},
    ) =>
      this.request<ReviewWithDetails, ErrorResponse>({
        path: `/${teamId}/reviews/${reviewId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 리뷰를 삭제합니다. 본인의 리뷰만 삭제할 수 있습니다.
     *
     * @tags Reviews
     * @name DeleteReviews
     * @summary 리뷰 삭제
     * @request DELETE:/{teamId}/reviews/{reviewId}
     * @secure
     */
    deleteReviews: (
      teamId: string,
      reviewId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/reviews/${reviewId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 특정 모임에 리뷰를 작성합니다.
     *
     * @tags Reviews
     * @name CreateReviews
     * @summary 리뷰 작성
     * @request POST:/{teamId}/meetings/{meetingId}/reviews
     * @secure
     */
    createReviews: (
      teamId: string,
      meetingId: number,
      data: CreateReviewByMeeting,
      params: RequestParams = {},
    ) =>
      this.request<ReviewWithDetails, ErrorResponse>({
        path: `/${teamId}/meetings/${meetingId}/reviews`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 특정 모임의 리뷰 목록을 조회합니다.
     *
     * @tags Reviews
     * @name GetReviewsList2
     * @summary 특정 모임 리뷰 목록 (중첩)
     * @request GET:/{teamId}/meetings/{meetingId}/reviews
     * @originalName getReviewsList
     * @duplicate
     * @secure
     */
    getReviewsList2: (
      teamId: string,
      meetingId: number,
      query?: {
        /**
         * 특정 사용자의 리뷰만 조회
         * @min 0
         * @exclusiveMin true
         */
        userId?: number;
        /** 모임 종류로 필터링 */
        type?: string;
        /** 지역으로 필터링 */
        region?: string;
        /**
         * 모임 시작 범위 (이상, ISO 8601)
         * @format date-time
         * @example "2026-02-09T15:00:00Z"
         */
        dateStart?: string | null;
        /**
         * 모임 끝 범위 (이하, ISO 8601)
         * @format date-time
         * @example "2026-02-10T14:59:59.999Z"
         */
        dateEnd?: string | null;
        /**
         * 모집 마감 시작 범위 (이상, ISO 8601)
         * @format date-time
         * @example "2026-02-09T15:00:00Z"
         */
        registrationEndStart?: string | null;
        /**
         * 모집 마감 끝 범위 (이하, ISO 8601)
         * @format date-time
         * @example "2026-02-10T14:59:59.999Z"
         */
        registrationEndEnd?: string | null;
        /**
         * 정렬 기준
         * @default "createdAt"
         */
        sortBy?: 'createdAt' | 'score' | 'participantCount';
        /**
         * 정렬 순서
         * @default "desc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * 다음 페이지를 위한 커서
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 페이지 크기 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedReview, any>({
        path: `/${teamId}/meetings/${meetingId}/reviews`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 찜한 모임 목록을 조회합니다. **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함
     *
     * @tags Favorites
     * @name GetFavoritesList
     * @summary 찜 목록
     * @request GET:/{teamId}/favorites
     * @secure
     */
    getFavoritesList: (
      teamId: string,
      query?: {
        /** 모임 종류로 필터링 */
        type?: string;
        /** 지역으로 필터링 */
        region?: string;
        /**
         * 모임 시작 범위 (이상, ISO 8601)
         * @format date-time
         * @example "2026-02-09T15:00:00Z"
         */
        dateStart?: string | null;
        /**
         * 모임 끝 범위 (이하, ISO 8601)
         * @format date-time
         * @example "2026-02-10T14:59:59.999Z"
         */
        dateEnd?: string | null;
        /**
         * 정렬 기준 (createdAt: 찜한 시간, meetingCreatedAt: 모임 생성 시간)
         * @default "createdAt"
         */
        sortBy?:
          | 'createdAt'
          | 'meetingCreatedAt'
          | 'dateTime'
          | 'registrationEnd'
          | 'participantCount';
        /**
         * 정렬 순서
         * @default "desc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * 다음 페이지를 위한 커서 (offset과 함께 사용 불가)
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 건너뛸 항목 수 (cursor와 함께 사용 불가)
         * @min 0
         * @example 0
         */
        offset?: number | null;
        /**
         * 조회할 최대 항목 수 (offset 사용 시, 기본 10, 최대 100)
         * @min 1
         * @max 100
         * @example 10
         */
        limit?: number;
        /**
         * 페이지 크기 - cursor 사용 시 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FavoriteList, ErrorResponse>({
        path: `/${teamId}/favorites`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 사용자의 찜 개수를 조회합니다.
     *
     * @tags Favorites
     * @name GetCountList
     * @summary 찜 개수
     * @request GET:/{teamId}/favorites/count
     * @secure
     */
    getCountList: (teamId: string, params: RequestParams = {}) =>
      this.request<FavoriteCount, ErrorResponse>({
        path: `/${teamId}/favorites/count`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 특정 모임을 찜합니다.
     *
     * @tags Favorites
     * @name CreateFavorites
     * @summary 찜 추가 (중첩)
     * @request POST:/{teamId}/meetings/{meetingId}/favorites
     * @secure
     */
    createFavorites: (
      teamId: string,
      meetingId: number,
      params: RequestParams = {},
    ) =>
      this.request<FavoriteWithMeeting, ErrorResponse>({
        path: `/${teamId}/meetings/${meetingId}/favorites`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 특정 모임의 찜을 해제합니다.
     *
     * @tags Favorites
     * @name DeleteFavorites
     * @summary 찜 해제 (중첩)
     * @request DELETE:/{teamId}/meetings/{meetingId}/favorites
     * @secure
     */
    deleteFavorites: (
      teamId: string,
      meetingId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/meetings/${meetingId}/favorites`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description S3 직접 업로드를 위한 presigned URL을 발급합니다. **사용 흐름:** 1. 이 엔드포인트로 presigned URL 발급 2. 발급받은 presignedUrl로 PUT 요청 (body: 파일, Content-Type 헤더 필수) 3. publicUrl을 서버에 저장/표시용으로 사용 **지원 형식:** JPEG, PNG, WebP, GIF **URL 유효 시간:** 5분
     *
     * @tags Images
     * @name CreateImages
     * @summary 이미지 업로드 (Presigned URL 발급)
     * @request POST:/{teamId}/images
     * @secure
     */
    createImages: (
      teamId: string,
      data: PresignedUrlRequest,
      params: RequestParams = {},
    ) =>
      this.request<PresignedUrlResponse, void>({
        path: `/${teamId}/images`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 게시글 목록을 조회합니다. **조회 타입:** - type=all: 전체 게시글 (기본값, 최신순) - type=best: 베스트 게시글 (최근 30일 내 작성, likeCount 높은 순) **정렬 기준 (sortBy):** - createdAt: 작성일순 (기본값) - viewCount: 조회수순 - likeCount: 좋아요순 - commentCount: 댓글 많은 순 **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함 **응답 필드:** - totalViewCount: 위 필터(type, keyword 등)와 동일한 조건의 게시글 조회수(viewCount) 합계
     *
     * @tags Posts
     * @name GetPostsList
     * @summary 게시글 목록
     * @request GET:/{teamId}/posts
     * @secure
     */
    getPostsList: (
      teamId: string,
      query?: {
        /**
         * 게시글 타입 (all: 전체, best: 베스트)
         * @default "all"
         */
        type?: 'all' | 'best';
        /** 제목/내용 검색 */
        keyword?: string;
        /**
         * 정렬 기준
         * @default "createdAt"
         */
        sortBy?: 'createdAt' | 'viewCount' | 'likeCount' | 'commentCount';
        /**
         * 정렬 순서
         * @default "desc"
         */
        sortOrder?: 'asc' | 'desc';
        /**
         * 다음 페이지를 위한 커서 (offset과 함께 사용 불가)
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 건너뛸 항목 수 (cursor와 함께 사용 불가)
         * @min 0
         * @example 0
         */
        offset?: number | null;
        /**
         * 조회할 최대 항목 수 (offset 사용 시, 기본 10, 최대 100)
         * @min 1
         * @max 100
         * @example 10
         */
        limit?: number;
        /**
         * 페이지 크기 - cursor 사용 시 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostList, any>({
        path: `/${teamId}/posts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 새로운 게시글을 작성합니다. **비즈니스 규칙:** - 제목(title)은 필수이며 최소 1자 이상 - 내용(content)은 필수이며 최소 1자 이상 - 이미지(image)는 선택 사항 - 작성 시 likeCount와 viewCount는 0으로 초기화
     *
     * @tags Posts
     * @name CreatePosts
     * @summary 게시글 작성
     * @request POST:/{teamId}/posts
     * @secure
     */
    createPosts: (
      teamId: string,
      data: CreatePost,
      params: RequestParams = {},
    ) =>
      this.request<PostWithAuthor, ErrorResponse>({
        path: `/${teamId}/posts`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 게시글 상세 정보를 조회합니다. 조회 시 조회수가 증가합니다.
     *
     * @tags Posts
     * @name GetPostsDetail
     * @summary 게시글 상세
     * @request GET:/{teamId}/posts/{postId}
     * @secure
     */
    getPostsDetail: (
      teamId: string,
      postId: number,
      params: RequestParams = {},
    ) =>
      this.request<PostWithComments, ErrorResponse>({
        path: `/${teamId}/posts/${postId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 게시글을 수정합니다. **비즈니스 규칙:** - 작성자만 수정할 수 있습니다 - 제목, 내용, 이미지를 개별적으로 수정 가능 - likeCount와 viewCount는 수정되지 않습니다
     *
     * @tags Posts
     * @name PatchPostsPartial
     * @summary 게시글 수정
     * @request PATCH:/{teamId}/posts/{postId}
     * @secure
     */
    patchPostsPartial: (
      teamId: string,
      postId: number,
      data: UpdatePost,
      params: RequestParams = {},
    ) =>
      this.request<PostWithAuthor, ErrorResponse>({
        path: `/${teamId}/posts/${postId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 게시글을 삭제합니다. 작성자만 삭제할 수 있습니다.
     *
     * @tags Posts
     * @name DeletePosts
     * @summary 게시글 삭제
     * @request DELETE:/{teamId}/posts/{postId}
     * @secure
     */
    deletePosts: (teamId: string, postId: number, params: RequestParams = {}) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/posts/${postId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 게시글에 댓글을 작성합니다. - 게시글 작성자에게 알림이 발생합니다 (본인 댓글 제외)
     *
     * @tags Posts
     * @name CreateComments
     * @summary 댓글 작성
     * @request POST:/{teamId}/posts/{postId}/comments
     * @secure
     */
    createComments: (
      teamId: string,
      postId: number,
      data: CreateComment,
      params: RequestParams = {},
    ) =>
      this.request<Comment, ErrorResponse>({
        path: `/${teamId}/posts/${postId}/comments`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 게시글의 댓글 목록을 조회합니다. **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함
     *
     * @tags Posts
     * @name GetCommentsList
     * @summary 댓글 목록
     * @request GET:/{teamId}/posts/{postId}/comments
     * @secure
     */
    getCommentsList: (
      teamId: string,
      postId: number,
      query?: {
        /** @default "createdAt" */
        sortBy?: 'createdAt';
        /** @default "asc" */
        sortOrder?: 'asc' | 'desc';
        /**
         * 다음 페이지를 위한 커서 (offset과 함께 사용 불가)
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 건너뛸 항목 수 (cursor와 함께 사용 불가)
         * @min 0
         * @example 0
         */
        offset?: number | null;
        /**
         * 조회할 최대 항목 수 (offset 사용 시, 기본 10, 최대 100)
         * @min 1
         * @max 100
         * @example 10
         */
        limit?: number;
        /**
         * 페이지 크기 - cursor 사용 시 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommentList, ErrorResponse>({
        path: `/${teamId}/posts/${postId}/comments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 댓글에 좋아요를 추가합니다.
     *
     * @tags Posts
     * @name CreateCommentsLike
     * @summary 댓글 좋아요 추가
     * @request POST:/{teamId}/posts/{postId}/comments/{commentId}/like
     * @secure
     */
    createCommentsLike: (
      teamId: string,
      postId: number,
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<CommentLike, ErrorResponse>({
        path: `/${teamId}/posts/${postId}/comments/${commentId}/like`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 댓글의 좋아요를 취소합니다.
     *
     * @tags Posts
     * @name DeleteCommentsLike
     * @summary 댓글 좋아요 취소
     * @request DELETE:/{teamId}/posts/{postId}/comments/{commentId}/like
     * @secure
     */
    deleteCommentsLike: (
      teamId: string,
      postId: number,
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/posts/${postId}/comments/${commentId}/like`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 댓글을 삭제합니다. 작성자만 삭제할 수 있습니다.
     *
     * @tags Posts
     * @name DeleteComments
     * @summary 댓글 삭제
     * @request DELETE:/{teamId}/posts/{postId}/comments/{commentId}
     * @secure
     */
    deleteComments: (
      teamId: string,
      postId: number,
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/posts/${postId}/comments/${commentId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 댓글을 수정합니다. 작성자만 수정할 수 있습니다.
     *
     * @tags Posts
     * @name PatchCommentsPartial
     * @summary 댓글 수정
     * @request PATCH:/{teamId}/posts/{postId}/comments/{commentId}
     * @secure
     */
    patchCommentsPartial: (
      teamId: string,
      postId: number,
      commentId: number,
      data: UpdateComment,
      params: RequestParams = {},
    ) =>
      this.request<Comment, ErrorResponse>({
        path: `/${teamId}/posts/${postId}/comments/${commentId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 게시글에 좋아요를 추가합니다.
     *
     * @tags Posts
     * @name CreateLike
     * @summary 좋아요 추가
     * @request POST:/{teamId}/posts/{postId}/like
     * @secure
     */
    createLike: (teamId: string, postId: number, params: RequestParams = {}) =>
      this.request<PostLike, ErrorResponse>({
        path: `/${teamId}/posts/${postId}/like`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 게시글의 좋아요를 취소합니다.
     *
     * @tags Posts
     * @name DeleteLike
     * @summary 좋아요 취소
     * @request DELETE:/{teamId}/posts/{postId}/like
     * @secure
     */
    deleteLike: (teamId: string, postId: number, params: RequestParams = {}) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/posts/${postId}/like`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 사용자의 알림 목록을 조회합니다. - 알림 종류: 개설 확정(MEETING_CONFIRMED), 모임 취소(MEETING_CANCELED), 모임 삭제(MEETING_DELETED), 댓글(COMMENT) - isRead 파라미터로 읽음/미읽음 필터링 가능
     *
     * @tags Notifications
     * @name GetNotificationsList
     * @summary 알림 목록
     * @request GET:/{teamId}/notifications
     * @secure
     */
    getNotificationsList: (
      teamId: string,
      query?: {
        /** 읽음 여부로 필터링 */
        isRead?: 'true' | 'false';
        /**
         * 다음 페이지를 위한 커서
         * @example "eyJpZCI6MTB9"
         */
        cursor?: string;
        /**
         * 페이지 크기 (1-100)
         * @min 1
         * @max 100
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NotificationList, ErrorResponse>({
        path: `/${teamId}/notifications`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 사용자의 모든 알림을 삭제합니다.
     *
     * @tags Notifications
     * @name DeleteNotifications
     * @summary 전체 알림 삭제
     * @request DELETE:/{teamId}/notifications
     * @secure
     */
    deleteNotifications: (teamId: string, params: RequestParams = {}) =>
      this.request<
        {
          count: number;
        },
        ErrorResponse
      >({
        path: `/${teamId}/notifications`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 현재 사용자의 읽지 않은 알림 수를 조회합니다.
     *
     * @tags Notifications
     * @name GetUnreadCountList
     * @summary 읽지 않은 알림 수 조회
     * @request GET:/{teamId}/notifications/unread-count
     * @secure
     */
    getUnreadCountList: (teamId: string, params: RequestParams = {}) =>
      this.request<
        {
          count: number;
        },
        ErrorResponse
      >({
        path: `/${teamId}/notifications/unread-count`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 모든 읽지 않은 알림을 읽음으로 표시합니다.
     *
     * @tags Notifications
     * @name UpdateReadAll
     * @summary 모든 알림 읽음 처리
     * @request PUT:/{teamId}/notifications/read-all
     * @secure
     */
    updateReadAll: (teamId: string, params: RequestParams = {}) =>
      this.request<
        {
          count: number;
        },
        ErrorResponse
      >({
        path: `/${teamId}/notifications/read-all`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 특정 알림을 읽음으로 표시합니다.
     *
     * @tags Notifications
     * @name UpdateRead
     * @summary 알림 읽음 처리
     * @request PUT:/{teamId}/notifications/{notificationId}/read
     * @secure
     */
    updateRead: (
      teamId: string,
      notificationId: number,
      params: RequestParams = {},
    ) =>
      this.request<Notification, ErrorResponse>({
        path: `/${teamId}/notifications/${notificationId}/read`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 특정 알림을 삭제합니다.
     *
     * @tags Notifications
     * @name DeleteNotifications2
     * @summary 알림 삭제
     * @request DELETE:/{teamId}/notifications/{notificationId}
     * @originalName deleteNotifications
     * @duplicate
     * @secure
     */
    deleteNotifications2: (
      teamId: string,
      notificationId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message: string;
        },
        ErrorResponse
      >({
        path: `/${teamId}/notifications/${notificationId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  og = {
    /**
     * @description 주어진 URL에서 Open Graph 메타데이터(제목, 설명, 이미지 등)를 파싱하여 반환합니다.
     *
     * @tags OG
     * @name GetOg
     * @summary URL의 Open Graph 메타데이터 조회
     * @request GET:/og
     * @secure
     */
    getOg: (
      query: {
        /**
         * OG 메타데이터를 가져올 URL
         * @format uri
         * @example "https://example.com"
         */
        url: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<OgMetadata, void>({
        path: `/og`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
