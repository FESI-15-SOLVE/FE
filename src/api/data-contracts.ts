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
  role: "participant" | "host";
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
  status: "CONFIRMED" | "CANCELED";
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
  contentType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
  /**
   * 이미지 저장 폴더
   * @default "meetings"
   */
  folder?: "meetings" | "users" | "posts";
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
    | "MEETING_CONFIRMED"
    | "MEETING_CANCELED"
    | "MEETING_DELETED"
    | "COMMENT";
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

export interface SignupCreateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface EmailCheckCreateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface LoginCreateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface LogoutCreateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface RefreshCreateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface OauthCreateParams {
  /** @example "dallaem" */
  teamId: string;
  /** @example "google" */
  provider: "google" | "kakao";
}

export interface GetTeamIdParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface PatchTeamIdParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface UsersDetailParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  userId: number;
}

export interface MeMeetingsListParams {
  /** @example "joined" */
  type?: "joined" | "created";
  /** @example "false" */
  completed?: "true" | "false";
  /** @example "false" */
  reviewed?: "true" | "false";
  /** @example "dateTime" */
  sortBy?: "dateTime" | "joinedAt" | "createdAt";
  /**
   * @default "desc"
   * @example "desc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface MePostsListParams {
  /**
   * @default "createdAt"
   * @example "createdAt"
   */
  sortBy?: "createdAt" | "viewCount" | "likeCount";
  /**
   * @default "desc"
   * @example "desc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface MeReviewsListParams {
  /**
   * @default "createdAt"
   * @example "createdAt"
   */
  sortBy?: "createdAt" | "score";
  /**
   * @default "desc"
   * @example "desc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface JoinedListParams {
  /**
   * 완료된 모임만 조회 (true: 지난 모임, false: 예정된 모임)
   * @example "false"
   */
  completed?: "true" | "false";
  /**
   * 리뷰 작성 여부로 필터링 (true: 작성함, false: 미작성)
   * @example "false"
   */
  reviewed?: "true" | "false";
  /**
   * 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), joinedAt(참가 신청일)
   * @default "dateTime"
   * @example "dateTime"
   */
  sortBy?: "dateTime" | "registrationEnd" | "joinedAt";
  /**
   * 정렬 순서: asc(오름차순), desc(내림차순)
   * @default "asc"
   * @example "asc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface GetTeamId2Params {
  /**
   * 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), participantCount(참가자 수)
   * @default "dateTime"
   * @example "dateTime"
   */
  sortBy?: "dateTime" | "registrationEnd" | "participantCount";
  /**
   * 정렬 순서: asc(오름차순), desc(내림차순)
   * @default "asc"
   * @example "asc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface MeetingsListParams {
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
  sortBy?: "dateTime" | "registrationEnd" | "participantCount" | "createdAt";
  /**
   * 정렬 순서: asc(오름차순), desc(내림차순). 생략 시 sortBy=createdAt이면 desc, 아니면 asc
   * @example "asc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface MeetingsCreateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface MeetingsDetailParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface MeetingsPartialUpdateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface MeetingsDeleteParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface JoinCreateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface JoinDeleteParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface ParticipantsListParams {
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
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface StatusPartialUpdateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface MeetingTypesListParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface MeetingTypesCreateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface MeetingTypesPartialUpdateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  typeId: number;
}

export interface MeetingTypesDeleteParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  typeId: number;
}

export interface ReviewsListParams {
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
  sortBy?: "createdAt" | "score" | "participantCount";
  /**
   * 정렬 순서
   * @default "desc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface StatisticsListParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface CategoriesStatisticsListParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface ReviewsPartialUpdateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  reviewId: number;
}

export interface ReviewsDeleteParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  reviewId: number;
}

export interface ReviewsCreateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface ReviewsList2Params {
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
  sortBy?: "createdAt" | "score" | "participantCount";
  /**
   * 정렬 순서
   * @default "desc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface FavoritesListParams {
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
    | "createdAt"
    | "meetingCreatedAt"
    | "dateTime"
    | "registrationEnd"
    | "participantCount";
  /**
   * 정렬 순서
   * @default "desc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface CountListParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface FavoritesCreateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface FavoritesDeleteParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  meetingId: number;
}

export interface ImagesCreateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface PostsListParams {
  /**
   * 게시글 타입 (all: 전체, best: 베스트)
   * @default "all"
   */
  type?: "all" | "best";
  /** 제목/내용 검색 */
  keyword?: string;
  /**
   * 정렬 기준
   * @default "createdAt"
   */
  sortBy?: "createdAt" | "viewCount" | "likeCount" | "commentCount";
  /**
   * 정렬 순서
   * @default "desc"
   */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface PostsCreateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface PostsDetailParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
}

export interface PostsPartialUpdateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
}

export interface PostsDeleteParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
}

export interface CommentsCreateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
}

export interface CommentsListParams {
  /** @default "createdAt" */
  sortBy?: "createdAt";
  /** @default "asc" */
  sortOrder?: "asc" | "desc";
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
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
}

export interface CommentsLikeCreateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  commentId: number;
}

export interface CommentsLikeDeleteParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  commentId: number;
}

export interface CommentsDeleteParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  commentId: number;
}

export interface CommentsPartialUpdateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  commentId: number;
}

export interface LikeCreateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
}

export interface LikeDeleteParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  postId: number;
}

export interface NotificationsListParams {
  /** 읽음 여부로 필터링 */
  isRead?: "true" | "false";
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
  /** @example "dallaem" */
  teamId: string;
}

export interface NotificationsDeleteParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface UnreadCountListParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface ReadAllUpdateParams {
  /** @example "dallaem" */
  teamId: string;
}

export interface ReadUpdateParams {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  notificationId: number;
}

export interface NotificationsDelete2Params {
  /** @example "dallaem" */
  teamId: string;
  /**
   * @min 0
   * @exclusiveMin true
   * @example 1
   */
  notificationId: number;
}

export interface GetOgParams {
  /**
   * OG 메타데이터를 가져올 URL
   * @format uri
   * @example "https://example.com"
   */
  url: string;
}
