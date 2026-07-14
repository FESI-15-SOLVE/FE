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

import {
  AuthTokens,
  CategoriesStatisticsListParams,
  CategoryStatistics,
  Comment,
  CommentLike,
  CommentList,
  CommentsCreateParams,
  CommentsDeleteParams,
  CommentsLikeCreateParams,
  CommentsLikeDeleteParams,
  CommentsListParams,
  CommentsPartialUpdateParams,
  CountListParams,
  CreateComment,
  CreateMeeting,
  CreateMeetingType,
  CreatePost,
  CreateReviewByMeeting,
  EmailCheckCreateParams,
  EmailCheckRequest,
  EmailCheckResponse,
  ErrorResponse,
  FavoriteCount,
  FavoriteList,
  FavoritesCreateParams,
  FavoritesDeleteParams,
  FavoritesListParams,
  FavoriteWithMeeting,
  GetTeamId2Params,
  GetTeamIdParams,
  ImagesCreateParams,
  JoinCreateParams,
  JoinDeleteParams,
  JoinedListParams,
  JoinedMeetingList,
  LikeCreateParams,
  LikeDeleteParams,
  LoginCreateParams,
  LoginRequest,
  LoginResponse,
  LogoutCreateParams,
  MeetingList,
  MeetingsCreateParams,
  MeetingsDeleteParams,
  MeetingsDetailParams,
  MeetingsListParams,
  MeetingsPartialUpdateParams,
  MeetingType,
  MeetingTypeList,
  MeetingTypesCreateParams,
  MeetingTypesDeleteParams,
  MeetingTypesListParams,
  MeetingTypesPartialUpdateParams,
  MeetingWithHost,
  MeMeetingsListParams,
  MePostsListParams,
  MeReviewsListParams,
  Notification,
  NotificationList,
  NotificationsDelete2Params,
  NotificationsDeleteParams,
  NotificationsListParams,
  OauthCreateParams,
  OAuthRequest,
  PaginatedReview,
  ParticipantList,
  ParticipantsListParams,
  PatchTeamIdParams,
  PostLike,
  PostList,
  PostsCreateParams,
  PostsDeleteParams,
  PostsDetailParams,
  PostsListParams,
  PostsPartialUpdateParams,
  PostWithAuthor,
  PostWithComments,
  PresignedUrlRequest,
  PresignedUrlResponse,
  PublicUser,
  ReadAllUpdateParams,
  ReadUpdateParams,
  RefreshCreateParams,
  RefreshRequest,
  ReviewsCreateParams,
  ReviewsDeleteParams,
  ReviewsList2Params,
  ReviewsListParams,
  ReviewsPartialUpdateParams,
  ReviewStatistics,
  ReviewWithDetails,
  SignupCreateParams,
  SignupRequest,
  StatisticsListParams,
  StatusPartialUpdateParams,
  UnreadCountListParams,
  UpdateComment,
  UpdateMeeting,
  UpdateMeetingStatus,
  UpdateMeetingType,
  UpdatePost,
  UpdateReview,
  UpdateUserRequest,
  User,
  UserMeetingsResponse,
  UserPostsResponse,
  UserReviewsResponse,
  UsersDetailParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class TeamId<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 새로운 사용자를 등록합니다. 이메일은 팀 내에서 고유해야 합니다.
   *
   * @tags Auth
   * @name SignupCreate
   * @summary 회원가입
   * @request POST:/{teamId}/auth/signup
   * @secure
   * @response `201` `User` 회원가입 성공 - 생성된 사용자 정보 반환
   * @response `409` `ErrorResponse` 이미 존재하는 이메일 - 동일한 이메일로 가입된 계정이 있음
   */
  signupCreate = (
    { teamId }: SignupCreateParams,
    data: SignupRequest,
    params: RequestParams = {},
  ) =>
    this.request<User, ErrorResponse>({
      path: `/${teamId}/auth/signup`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 회원가입 전에 팀 내 이메일 중복 여부를 확인합니다.
   *
   * @tags Auth
   * @name EmailCheckCreate
   * @summary 이메일 사용 가능 여부 확인
   * @request POST:/{teamId}/auth/email-check
   * @secure
   * @response `200` `EmailCheckResponse` 조회 성공 - 이메일 사용 가능 여부 반환
   */
  emailCheckCreate = (
    { teamId }: EmailCheckCreateParams,
    data: EmailCheckRequest,
    params: RequestParams = {},
  ) =>
    this.request<EmailCheckResponse, any>({
      path: `/${teamId}/auth/email-check`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 이메일과 비밀번호로 로그인합니다. 성공 시 accessToken(15분)과 refreshToken(7일)을 발급합니다.
   *
   * @tags Auth
   * @name LoginCreate
   * @summary 로그인
   * @request POST:/{teamId}/auth/login
   * @secure
   * @response `200` `LoginResponse` 로그인 성공 - 사용자 정보와 토큰 반환
   * @response `401` `ErrorResponse` 인증 실패 - 이메일 또는 비밀번호가 올바르지 않음
   */
  loginCreate = (
    { teamId }: LoginCreateParams,
    data: LoginRequest,
    params: RequestParams = {},
  ) =>
    this.request<LoginResponse, ErrorResponse>({
      path: `/${teamId}/auth/login`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 현재 로그인된 세션을 종료합니다. 특정 리프레시 토큰만 무효화됩니다.
   *
   * @tags Auth
   * @name LogoutCreate
   * @summary 로그아웃
   * @request POST:/{teamId}/auth/logout
   * @secure
   * @response `204` `void` 로그아웃 성공
   * @response `401` `ErrorResponse` 인증 필요 - 유효한 accessToken이 필요합니다
   */
  logoutCreate = (
    { teamId }: LogoutCreateParams,
    data: RefreshRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, ErrorResponse>({
      path: `/${teamId}/auth/logout`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 리프레시 토큰으로 새로운 accessToken과 refreshToken을 발급받습니다. 기존 리프레시 토큰은 무효화됩니다 (토큰 로테이션). ⚠️ **프론트엔드 구현 주의사항**: 응답의 `refreshToken`이 `null`이면 기존에 저장된 refreshToken을 그대로 유지해야 합니다. `null`로 덮어쓰면 다음 갱신 시 실패합니다. 이는 동시 요청(예: axios interceptor에서 여러 401 동시 발생) 시 두 번째 요청부터 발생하며, 첫 번째 요청에서 이미 새 refreshToken을 받았으므로 그것을 유지하면 됩니다.
   *
   * @tags Auth
   * @name RefreshCreate
   * @summary 토큰 갱신
   * @request POST:/{teamId}/auth/refresh
   * @secure
   * @response `200` `AuthTokens` 갱신 성공 - 새로운 accessToken(15분)과 refreshToken(7일) 반환
   * @response `401` `ErrorResponse` 유효하지 않은 토큰 - 만료되었거나 이미 사용된 토큰
   */
  refreshCreate = (
    { teamId }: RefreshCreateParams,
    data: RefreshRequest,
    params: RequestParams = {},
  ) =>
    this.request<AuthTokens, ErrorResponse>({
      path: `/${teamId}/auth/refresh`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Google 또는 Kakao OAuth access token으로 로그인합니다. 최초 로그인 시 자동 가입되며, 기존 OAuth 계정은 앱 내 프로필(name/image)을 유지합니다.
   *
   * @tags Auth
   * @name OauthCreate
   * @summary OAuth 로그인
   * @request POST:/{teamId}/oauth/{provider}
   * @secure
   * @response `200` `LoginResponse` OAuth 로그인 성공 - 사용자 정보와 토큰 반환
   * @response `401` `ErrorResponse` OAuth 인증 실패 - 제공자 토큰이 유효하지 않음
   * @response `409` `ErrorResponse` 이미 다른 방식으로 가입된 이메일
   */
  oauthCreate = (
    { teamId, provider }: OauthCreateParams,
    data: OAuthRequest,
    params: RequestParams = {},
  ) =>
    this.request<LoginResponse, ErrorResponse>({
      path: `/${teamId}/oauth/${provider}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 현재 로그인된 사용자의 정보를 조회합니다. Authorization 헤더에 Bearer 토큰이 필요합니다.
   *
   * @tags Users
   * @name GetTeamId
   * @summary 내 정보 조회
   * @request GET:/{teamId}/users/me
   * @secure
   * @response `200` `User` 조회 성공 - 현재 로그인된 사용자 정보
   * @response `401` `ErrorResponse` 인증 필요 - 유효한 accessToken이 필요합니다
   */
  getTeamId = ({ teamId }: GetTeamIdParams, params: RequestParams = {}) =>
    this.request<User, ErrorResponse>({
      path: `/${teamId}/users/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 현재 로그인된 사용자의 정보를 수정합니다. 변경할 필드만 전송하면 됩니다.
   *
   * @tags Users
   * @name PatchTeamId
   * @summary 내 정보 수정
   * @request PATCH:/{teamId}/users/me
   * @secure
   * @response `200` `User` 수정 성공 - 업데이트된 사용자 정보 반환
   * @response `401` `ErrorResponse` 인증 필요 - 유효한 accessToken이 필요합니다
   */
  patchTeamId = (
    { teamId }: PatchTeamIdParams,
    data: UpdateUserRequest,
    params: RequestParams = {},
  ) =>
    this.request<User, ErrorResponse>({
      path: `/${teamId}/users/me`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 특정 사용자의 공개 프로필을 조회합니다. 인증 없이 접근 가능합니다.
   *
   * @tags Users
   * @name UsersDetail
   * @summary 유저 프로필 조회
   * @request GET:/{teamId}/users/{userId}
   * @secure
   * @response `200` `PublicUser` 조회 성공 - 공개 프로필 정보 (createdAt, updatedAt 제외)
   * @response `404` `ErrorResponse` 유저 없음 - 해당 ID의 사용자가 존재하지 않음
   */
  usersDetail = (
    { teamId, userId }: UsersDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<PublicUser, ErrorResponse>({
      path: `/${teamId}/users/${userId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 현재 로그인된 사용자의 모임 목록을 조회합니다. 필터와 정렬 옵션을 지원합니다.
   *
   * @tags Users
   * @name MeMeetingsList
   * @summary 내가 참여한/만든 모임 목록 조회
   * @request GET:/{teamId}/users/me/meetings
   * @secure
   * @response `200` `UserMeetingsResponse` 조회 성공 - 모임 목록과 페이지네이션 정보
   * @response `400` `ErrorResponse` 잘못된 요청 - 잘못된 커서
   * @response `401` `ErrorResponse` 인증 필요 - 유효한 accessToken이 필요합니다
   */
  meMeetingsList = (
    { teamId, ...query }: MeMeetingsListParams,
    params: RequestParams = {},
  ) =>
    this.request<UserMeetingsResponse, ErrorResponse>({
      path: `/${teamId}/users/me/meetings`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 현재 로그인된 사용자가 작성한 게시글 목록을 조회합니다. 정렬 옵션을 지원합니다. **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함
   *
   * @tags Users
   * @name MePostsList
   * @summary 내가 작성한 게시글 목록 조회
   * @request GET:/{teamId}/users/me/posts
   * @secure
   * @response `200` `UserPostsResponse` 조회 성공 - 게시글 목록과 페이지네이션 정보
   * @response `400` `ErrorResponse` 잘못된 요청 - 잘못된 커서
   * @response `401` `ErrorResponse` 인증 필요 - 유효한 accessToken이 필요합니다
   */
  mePostsList = (
    { teamId, ...query }: MePostsListParams,
    params: RequestParams = {},
  ) =>
    this.request<UserPostsResponse, ErrorResponse>({
      path: `/${teamId}/users/me/posts`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 현재 로그인된 사용자가 작성한 리뷰 목록을 조회합니다. 정렬 옵션을 지원합니다.
   *
   * @tags Users
   * @name MeReviewsList
   * @summary 내가 작성한 리뷰 목록 조회
   * @request GET:/{teamId}/users/me/reviews
   * @secure
   * @response `200` `UserReviewsResponse` 조회 성공 - 리뷰 목록과 페이지네이션 정보
   * @response `400` `ErrorResponse` 잘못된 요청 - 잘못된 커서
   * @response `401` `ErrorResponse` 인증 필요 - 유효한 accessToken이 필요합니다
   */
  meReviewsList = (
    { teamId, ...query }: MeReviewsListParams,
    params: RequestParams = {},
  ) =>
    this.request<UserReviewsResponse, ErrorResponse>({
      path: `/${teamId}/users/me/reviews`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 현재 사용자가 참여한 모임 목록을 조회합니다.
   *
   * @tags Meetings
   * @name JoinedList
   * @summary 참여한 모임 목록
   * @request GET:/{teamId}/meetings/joined
   * @secure
   * @response `200` `JoinedMeetingList` 조회 성공
   * @response `401` `ErrorResponse` 인증 필요
   */
  joinedList = (
    { teamId, ...query }: JoinedListParams,
    params: RequestParams = {},
  ) =>
    this.request<JoinedMeetingList, ErrorResponse>({
      path: `/${teamId}/meetings/joined`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
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
   * @response `200` `MeetingList` 조회 성공
   * @response `401` `ErrorResponse` 인증 필요
   */
  getTeamId2 = (
    { teamId, ...query }: GetTeamId2Params,
    params: RequestParams = {},
  ) =>
    this.request<MeetingList, ErrorResponse>({
      path: `/${teamId}/meetings/my`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 모임 목록을 조회합니다. 취소되지 않은 모임만 반환됩니다. 로그인 시 각 모임의 찜 여부(isFavorited)와 참여 여부(isJoined)가 포함됩니다.
   *
   * @tags Meetings
   * @name MeetingsList
   * @summary 모임 목록
   * @request GET:/{teamId}/meetings
   * @secure
   * @response `200` `MeetingList` 조회 성공
   */
  meetingsList = (
    { teamId, ...query }: MeetingsListParams,
    params: RequestParams = {},
  ) =>
    this.request<MeetingList, any>({
      path: `/${teamId}/meetings`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 새로운 모임을 생성합니다. **비즈니스 규칙:** - 모임 일시(dateTime)는 현재 시각 이후여야 합니다 - 모집 마감일(registrationEnd)은 모임 일시 이전이어야 합니다 - 호스트는 자동으로 첫 번째 참가자로 등록됩니다 - capacity는 최소 1명 이상이어야 합니다
   *
   * @tags Meetings
   * @name MeetingsCreate
   * @summary 모임 생성
   * @request POST:/{teamId}/meetings
   * @secure
   * @response `201` `MeetingWithHost` 생성 성공
   * @response `400` `ErrorResponse` 유효하지 않은 요청: - DATETIME_MUST_BE_FUTURE: 모임 일시는 현재보다 미래여야 합니다 - REGISTRATION_END_BEFORE_DATETIME: 모집 마감일은 모임 일시 이전이어야 합니다 - INVALID_MEETING_TYPE: 존재하지 않는 모임 종류입니다 - 필수 필드 누락 또는 형식 오류
   * @response `401` `ErrorResponse` 인증 필요 - Bearer 토큰이 없거나 유효하지 않음
   */
  meetingsCreate = (
    { teamId }: MeetingsCreateParams,
    data: CreateMeeting,
    params: RequestParams = {},
  ) =>
    this.request<MeetingWithHost, ErrorResponse>({
      path: `/${teamId}/meetings`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 특정 모임의 상세 정보를 조회합니다. 로그인 시 찜 여부(isFavorited)와 참여 여부(isJoined)가 포함됩니다.
   *
   * @tags Meetings
   * @name MeetingsDetail
   * @summary 모임 상세
   * @request GET:/{teamId}/meetings/{meetingId}
   * @secure
   * @response `200` `MeetingWithHost` 조회 성공
   * @response `404` `ErrorResponse` 모임 없음
   */
  meetingsDetail = (
    { teamId, meetingId }: MeetingsDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<MeetingWithHost, ErrorResponse>({
      path: `/${teamId}/meetings/${meetingId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 모임 정보를 수정합니다. **비즈니스 규칙:** - 호스트만 수정할 수 있습니다 - 취소된 모임은 수정 불가 - 정원(capacity)을 현재 참가자 수보다 줄일 수 없습니다 - 모임 일시는 현재 시각 이후여야 합니다 - 모집 마감일은 모임 일시 이전이어야 합니다
   *
   * @tags Meetings
   * @name MeetingsPartialUpdate
   * @summary 모임 수정
   * @request PATCH:/{teamId}/meetings/{meetingId}
   * @secure
   * @response `200` `MeetingWithHost` 수정 성공
   * @response `400` `ErrorResponse` 유효하지 않은 요청: - CANCELED: 취소된 모임은 수정할 수 없습니다 - CAPACITY_TOO_SMALL: 정원을 현재 참가자 수보다 줄일 수 없습니다 - DATETIME_MUST_BE_FUTURE: 모임 일시는 미래여야 합니다 - REGISTRATION_END_BEFORE_DATETIME: 모집 마감일은 모임 일시 이전이어야 합니다
   * @response `401` `ErrorResponse` 인증 필요 - Bearer 토큰이 없거나 유효하지 않음
   * @response `403` `ErrorResponse` 권한 없음 - 호스트만 모임을 수정할 수 있습니다 (FORBIDDEN)
   * @response `404` `ErrorResponse` 모임 없음 - 존재하지 않는 모임 ID (NOT_FOUND)
   */
  meetingsPartialUpdate = (
    { teamId, meetingId }: MeetingsPartialUpdateParams,
    data: UpdateMeeting,
    params: RequestParams = {},
  ) =>
    this.request<MeetingWithHost, ErrorResponse>({
      path: `/${teamId}/meetings/${meetingId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
 * @description 모임을 완전히 삭제합니다. 주최자만 가능합니다. 참가자, 리뷰, 찜이 모두 함께 삭제됩니다.
 *
 * @tags Meetings
 * @name MeetingsDelete
 * @summary 모임 삭제
 * @request DELETE:/{teamId}/meetings/{meetingId}
 * @secure
 * @response `200` `{
    message: string,

}` 삭제 성공
 * @response `403` `ErrorResponse` 권한 없음 (주최자만 삭제 가능)
 * @response `404` `ErrorResponse` 모임 없음
 */
  meetingsDelete = (
    { teamId, meetingId }: MeetingsDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/meetings/${meetingId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 모임에 참여 신청합니다. **비즈니스 규칙:** - 취소된 모임은 참여 불가 (400 CANCELED) - 모집 마감일이 지나면 참여 불가 (400 REGISTRATION_CLOSED) - 정원 초과 시 참여 불가 (400 CAPACITY_FULL) - 동일 모임 중복 참여 불가 (409 ALREADY_JOINED) - 호스트는 자동 참여되므로 별도 신청 불필요 **알림:** - 참여 인원이 5명에 도달하면 호스트에게 개설 확정 알림 발생
 *
 * @tags Meetings
 * @name JoinCreate
 * @summary 모임 참여
 * @request POST:/{teamId}/meetings/{meetingId}/join
 * @secure
 * @response `200` `{
    message: string,

}` 참여 성공
 * @response `400` `ErrorResponse` 참여 불가: - CANCELED: 취소된 모임에는 참여할 수 없습니다 - REGISTRATION_CLOSED: 모집이 마감되었습니다 - CAPACITY_FULL: 정원이 초과되었습니다
 * @response `401` `ErrorResponse` 인증 필요 - Bearer 토큰이 없거나 유효하지 않음
 * @response `404` `ErrorResponse` 모임 없음 - 존재하지 않는 모임 ID (NOT_FOUND)
 * @response `409` `ErrorResponse` 이미 참여 중 - 동일 모임에 중복 참여 불가 (ALREADY_JOINED)
 */
  joinCreate = (
    { teamId, meetingId }: JoinCreateParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/meetings/${meetingId}/join`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 모임 참여를 취소합니다. - 호스트는 참여를 취소할 수 없습니다 (모임 취소를 이용해주세요) - 취소된 모임은 참여 취소 불가 - 이미 시작된 모임은 참여 취소 불가
 *
 * @tags Meetings
 * @name JoinDelete
 * @summary 참여 취소
 * @request DELETE:/{teamId}/meetings/{meetingId}/join
 * @secure
 * @response `200` `{
    message: string,

}` 취소 성공
 * @response `400` `ErrorResponse` 취소 불가 (참여하지 않음, 호스트, 취소된 모임, 시작된 모임)
 * @response `401` `ErrorResponse` 인증 필요
 * @response `404` `ErrorResponse` 모임 없음
 */
  joinDelete = (
    { teamId, meetingId }: JoinDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/meetings/${meetingId}/join`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 모임의 참가자 목록을 조회합니다.
   *
   * @tags Meetings
   * @name ParticipantsList
   * @summary 참가자 목록
   * @request GET:/{teamId}/meetings/{meetingId}/participants
   * @secure
   * @response `200` `ParticipantList` 조회 성공
   * @response `404` `ErrorResponse` 모임 없음
   */
  participantsList = (
    { teamId, meetingId, ...query }: ParticipantsListParams,
    params: RequestParams = {},
  ) =>
    this.request<ParticipantList, ErrorResponse>({
      path: `/${teamId}/meetings/${meetingId}/participants`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 모임을 확정하거나 취소합니다. 주최자만 가능합니다.
   *
   * @tags Meetings
   * @name StatusPartialUpdate
   * @summary 모임 상태 변경
   * @request PATCH:/{teamId}/meetings/{meetingId}/status
   * @secure
   * @response `200` `MeetingWithHost` 상태 변경 성공
   * @response `400` `ErrorResponse` 이미 취소된 모임
   * @response `403` `ErrorResponse` 권한 없음
   * @response `404` `ErrorResponse` 모임 없음
   */
  statusPartialUpdate = (
    { teamId, meetingId }: StatusPartialUpdateParams,
    data: UpdateMeetingStatus,
    params: RequestParams = {},
  ) =>
    this.request<MeetingWithHost, ErrorResponse>({
      path: `/${teamId}/meetings/${meetingId}/status`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 팀의 모임 종류 목록을 조회합니다.
   *
   * @tags MeetingTypes
   * @name MeetingTypesList
   * @summary 모임 종류 목록
   * @request GET:/{teamId}/meeting-types
   * @secure
   * @response `200` `MeetingTypeList` 조회 성공
   */
  meetingTypesList = (
    { teamId }: MeetingTypesListParams,
    params: RequestParams = {},
  ) =>
    this.request<MeetingTypeList, any>({
      path: `/${teamId}/meeting-types`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 새로운 모임 종류를 생성합니다. 팀 내에서 이름은 고유해야 합니다.
   *
   * @tags MeetingTypes
   * @name MeetingTypesCreate
   * @summary 모임 종류 생성
   * @request POST:/{teamId}/meeting-types
   * @secure
   * @response `201` `MeetingType` 생성 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `409` `ErrorResponse` 이미 존재하는 이름
   */
  meetingTypesCreate = (
    { teamId }: MeetingTypesCreateParams,
    data: CreateMeetingType,
    params: RequestParams = {},
  ) =>
    this.request<MeetingType, ErrorResponse>({
      path: `/${teamId}/meeting-types`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 모임 종류 정보를 수정합니다.
   *
   * @tags MeetingTypes
   * @name MeetingTypesPartialUpdate
   * @summary 모임 종류 수정
   * @request PATCH:/{teamId}/meeting-types/{typeId}
   * @secure
   * @response `200` `MeetingType` 수정 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `404` `ErrorResponse` 모임 종류 없음
   * @response `409` `ErrorResponse` 이미 존재하는 이름
   */
  meetingTypesPartialUpdate = (
    { teamId, typeId }: MeetingTypesPartialUpdateParams,
    data: UpdateMeetingType,
    params: RequestParams = {},
  ) =>
    this.request<MeetingType, ErrorResponse>({
      path: `/${teamId}/meeting-types/${typeId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
 * @description 모임 종류를 삭제합니다.
 *
 * @tags MeetingTypes
 * @name MeetingTypesDelete
 * @summary 모임 종류 삭제
 * @request DELETE:/{teamId}/meeting-types/{typeId}
 * @secure
 * @response `200` `{
    message: string,

}` 삭제 성공
 * @response `401` `ErrorResponse` 인증 필요
 * @response `404` `ErrorResponse` 모임 종류 없음
 */
  meetingTypesDelete = (
    { teamId, typeId }: MeetingTypesDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/meeting-types/${typeId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 리뷰 목록을 조회합니다.
   *
   * @tags Reviews
   * @name ReviewsList
   * @summary 리뷰 목록
   * @request GET:/{teamId}/reviews
   * @secure
   * @response `200` `PaginatedReview` 조회 성공
   */
  reviewsList = (
    { teamId, ...query }: ReviewsListParams,
    params: RequestParams = {},
  ) =>
    this.request<PaginatedReview, any>({
      path: `/${teamId}/reviews`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 팀 전체 리뷰 통계를 조회합니다.
   *
   * @tags Reviews
   * @name StatisticsList
   * @summary 리뷰 전체 통계
   * @request GET:/{teamId}/reviews/statistics
   * @secure
   * @response `200` `ReviewStatistics` 조회 성공
   */
  statisticsList = (
    { teamId }: StatisticsListParams,
    params: RequestParams = {},
  ) =>
    this.request<ReviewStatistics, any>({
      path: `/${teamId}/reviews/statistics`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 모임 종류별 리뷰 통계를 조회합니다.
   *
   * @tags Reviews
   * @name CategoriesStatisticsList
   * @summary 카테고리별 리뷰 통계
   * @request GET:/{teamId}/reviews/categories/statistics
   * @secure
   * @response `200` `CategoryStatistics` 조회 성공
   */
  categoriesStatisticsList = (
    { teamId }: CategoriesStatisticsListParams,
    params: RequestParams = {},
  ) =>
    this.request<CategoryStatistics, any>({
      path: `/${teamId}/reviews/categories/statistics`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 리뷰를 수정합니다. 본인의 리뷰만 수정할 수 있습니다.
   *
   * @tags Reviews
   * @name ReviewsPartialUpdate
   * @summary 리뷰 수정
   * @request PATCH:/{teamId}/reviews/{reviewId}
   * @secure
   * @response `200` `ReviewWithDetails` 수정 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `403` `ErrorResponse` 권한 없음 (본인 리뷰만 수정 가능)
   * @response `404` `ErrorResponse` 리뷰 없음
   */
  reviewsPartialUpdate = (
    { teamId, reviewId }: ReviewsPartialUpdateParams,
    data: UpdateReview,
    params: RequestParams = {},
  ) =>
    this.request<ReviewWithDetails, ErrorResponse>({
      path: `/${teamId}/reviews/${reviewId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
 * @description 리뷰를 삭제합니다. 본인의 리뷰만 삭제할 수 있습니다.
 *
 * @tags Reviews
 * @name ReviewsDelete
 * @summary 리뷰 삭제
 * @request DELETE:/{teamId}/reviews/{reviewId}
 * @secure
 * @response `200` `{
    message: string,

}` 삭제 성공
 * @response `401` `ErrorResponse` 인증 필요
 * @response `403` `ErrorResponse` 권한 없음 (본인 리뷰만 삭제 가능)
 * @response `404` `ErrorResponse` 리뷰 없음
 */
  reviewsDelete = (
    { teamId, reviewId }: ReviewsDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/reviews/${reviewId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 특정 모임에 리뷰를 작성합니다.
   *
   * @tags Reviews
   * @name ReviewsCreate
   * @summary 리뷰 작성
   * @request POST:/{teamId}/meetings/{meetingId}/reviews
   * @secure
   * @response `201` `ReviewWithDetails` 작성 성공
   * @response `400` `ErrorResponse` 유효하지 않은 요청 (미완료, 비참가자, 취소된 모임)
   * @response `401` `ErrorResponse` 인증 필요
   * @response `404` `ErrorResponse` 모임 없음
   * @response `409` `ErrorResponse` 이미 리뷰 작성함
   */
  reviewsCreate = (
    { teamId, meetingId }: ReviewsCreateParams,
    data: CreateReviewByMeeting,
    params: RequestParams = {},
  ) =>
    this.request<ReviewWithDetails, ErrorResponse>({
      path: `/${teamId}/meetings/${meetingId}/reviews`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 특정 모임의 리뷰 목록을 조회합니다.
   *
   * @tags Reviews
   * @name ReviewsList2
   * @summary 특정 모임 리뷰 목록 (중첩)
   * @request GET:/{teamId}/meetings/{meetingId}/reviews
   * @originalName reviewsList
   * @duplicate
   * @secure
   * @response `200` `PaginatedReview` 조회 성공
   */
  reviewsList2 = (
    { teamId, meetingId, ...query }: ReviewsList2Params,
    params: RequestParams = {},
  ) =>
    this.request<PaginatedReview, any>({
      path: `/${teamId}/meetings/${meetingId}/reviews`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 찜한 모임 목록을 조회합니다. **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함
   *
   * @tags Favorites
   * @name FavoritesList
   * @summary 찜 목록
   * @request GET:/{teamId}/favorites
   * @secure
   * @response `200` `FavoriteList` 조회 성공
   * @response `401` `ErrorResponse` 인증 필요
   */
  favoritesList = (
    { teamId, ...query }: FavoritesListParams,
    params: RequestParams = {},
  ) =>
    this.request<FavoriteList, ErrorResponse>({
      path: `/${teamId}/favorites`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 현재 사용자의 찜 개수를 조회합니다.
   *
   * @tags Favorites
   * @name CountList
   * @summary 찜 개수
   * @request GET:/{teamId}/favorites/count
   * @secure
   * @response `200` `FavoriteCount` 조회 성공
   * @response `401` `ErrorResponse` 인증 필요
   */
  countList = ({ teamId }: CountListParams, params: RequestParams = {}) =>
    this.request<FavoriteCount, ErrorResponse>({
      path: `/${teamId}/favorites/count`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 특정 모임을 찜합니다.
   *
   * @tags Favorites
   * @name FavoritesCreate
   * @summary 찜 추가 (중첩)
   * @request POST:/{teamId}/meetings/{meetingId}/favorites
   * @secure
   * @response `201` `FavoriteWithMeeting` 찜 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `404` `ErrorResponse` 모임 없음
   * @response `409` `ErrorResponse` 이미 찜함
   */
  favoritesCreate = (
    { teamId, meetingId }: FavoritesCreateParams,
    params: RequestParams = {},
  ) =>
    this.request<FavoriteWithMeeting, ErrorResponse>({
      path: `/${teamId}/meetings/${meetingId}/favorites`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 특정 모임의 찜을 해제합니다.
 *
 * @tags Favorites
 * @name FavoritesDelete
 * @summary 찜 해제 (중첩)
 * @request DELETE:/{teamId}/meetings/{meetingId}/favorites
 * @secure
 * @response `200` `{
    message: string,

}` 찜 해제 성공
 * @response `401` `ErrorResponse` 인증 필요
 * @response `404` `ErrorResponse` 찜하지 않은 모임
 */
  favoritesDelete = (
    { teamId, meetingId }: FavoritesDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/meetings/${meetingId}/favorites`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description S3 직접 업로드를 위한 presigned URL을 발급합니다. **사용 흐름:** 1. 이 엔드포인트로 presigned URL 발급 2. 발급받은 presignedUrl로 PUT 요청 (body: 파일, Content-Type 헤더 필수) 3. publicUrl을 서버에 저장/표시용으로 사용 **지원 형식:** JPEG, PNG, WebP, GIF **URL 유효 시간:** 5분
   *
   * @tags Images
   * @name ImagesCreate
   * @summary 이미지 업로드 (Presigned URL 발급)
   * @request POST:/{teamId}/images
   * @secure
   * @response `200` `PresignedUrlResponse` Presigned URL 발급 성공
   * @response `400` `void` 잘못된 요청: - INVALID_FILE_TYPE: 지원하지 않는 파일 형식
   * @response `401` `void` 인증 필요 - Bearer 토큰이 없거나 유효하지 않음
   */
  imagesCreate = (
    { teamId }: ImagesCreateParams,
    data: PresignedUrlRequest,
    params: RequestParams = {},
  ) =>
    this.request<PresignedUrlResponse, void>({
      path: `/${teamId}/images`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 게시글 목록을 조회합니다. **조회 타입:** - type=all: 전체 게시글 (기본값, 최신순) - type=best: 베스트 게시글 (최근 30일 내 작성, likeCount 높은 순) **정렬 기준 (sortBy):** - createdAt: 작성일순 (기본값) - viewCount: 조회수순 - likeCount: 좋아요순 - commentCount: 댓글 많은 순 **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함 **응답 필드:** - totalViewCount: 위 필터(type, keyword 등)와 동일한 조건의 게시글 조회수(viewCount) 합계
   *
   * @tags Posts
   * @name PostsList
   * @summary 게시글 목록
   * @request GET:/{teamId}/posts
   * @secure
   * @response `200` `PostList` 조회 성공
   */
  postsList = (
    { teamId, ...query }: PostsListParams,
    params: RequestParams = {},
  ) =>
    this.request<PostList, any>({
      path: `/${teamId}/posts`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 새로운 게시글을 작성합니다. **비즈니스 규칙:** - 제목(title)은 필수이며 최소 1자 이상 - 내용(content)은 필수이며 최소 1자 이상 - 이미지(image)는 선택 사항 - 작성 시 likeCount와 viewCount는 0으로 초기화
   *
   * @tags Posts
   * @name PostsCreate
   * @summary 게시글 작성
   * @request POST:/{teamId}/posts
   * @secure
   * @response `201` `PostWithAuthor` 작성 성공
   * @response `401` `ErrorResponse` 인증 필요 - Bearer 토큰이 없거나 유효하지 않음
   */
  postsCreate = (
    { teamId }: PostsCreateParams,
    data: CreatePost,
    params: RequestParams = {},
  ) =>
    this.request<PostWithAuthor, ErrorResponse>({
      path: `/${teamId}/posts`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 게시글 상세 정보를 조회합니다. 조회 시 조회수가 증가합니다.
   *
   * @tags Posts
   * @name PostsDetail
   * @summary 게시글 상세
   * @request GET:/{teamId}/posts/{postId}
   * @secure
   * @response `200` `PostWithComments` 조회 성공
   * @response `404` `ErrorResponse` 게시글 없음
   */
  postsDetail = (
    { teamId, postId }: PostsDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<PostWithComments, ErrorResponse>({
      path: `/${teamId}/posts/${postId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 게시글을 수정합니다. **비즈니스 규칙:** - 작성자만 수정할 수 있습니다 - 제목, 내용, 이미지를 개별적으로 수정 가능 - likeCount와 viewCount는 수정되지 않습니다
   *
   * @tags Posts
   * @name PostsPartialUpdate
   * @summary 게시글 수정
   * @request PATCH:/{teamId}/posts/{postId}
   * @secure
   * @response `200` `PostWithAuthor` 수정 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `403` `ErrorResponse` 권한 없음
   * @response `404` `ErrorResponse` 게시글 없음
   */
  postsPartialUpdate = (
    { teamId, postId }: PostsPartialUpdateParams,
    data: UpdatePost,
    params: RequestParams = {},
  ) =>
    this.request<PostWithAuthor, ErrorResponse>({
      path: `/${teamId}/posts/${postId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
 * @description 게시글을 삭제합니다. 작성자만 삭제할 수 있습니다.
 *
 * @tags Posts
 * @name PostsDelete
 * @summary 게시글 삭제
 * @request DELETE:/{teamId}/posts/{postId}
 * @secure
 * @response `200` `{
    message: string,

}` 삭제 성공
 * @response `401` `ErrorResponse` 인증 필요
 * @response `403` `ErrorResponse` 권한 없음
 * @response `404` `ErrorResponse` 게시글 없음
 */
  postsDelete = (
    { teamId, postId }: PostsDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/posts/${postId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 게시글에 댓글을 작성합니다. - 게시글 작성자에게 알림이 발생합니다 (본인 댓글 제외)
   *
   * @tags Posts
   * @name CommentsCreate
   * @summary 댓글 작성
   * @request POST:/{teamId}/posts/{postId}/comments
   * @secure
   * @response `201` `Comment` 작성 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `404` `ErrorResponse` 게시글 없음
   */
  commentsCreate = (
    { teamId, postId }: CommentsCreateParams,
    data: CreateComment,
    params: RequestParams = {},
  ) =>
    this.request<Comment, ErrorResponse>({
      path: `/${teamId}/posts/${postId}/comments`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 게시글의 댓글 목록을 조회합니다. **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함
   *
   * @tags Posts
   * @name CommentsList
   * @summary 댓글 목록
   * @request GET:/{teamId}/posts/{postId}/comments
   * @secure
   * @response `200` `CommentList` 조회 성공
   * @response `404` `ErrorResponse` 게시글 없음
   */
  commentsList = (
    { teamId, postId, ...query }: CommentsListParams,
    params: RequestParams = {},
  ) =>
    this.request<CommentList, ErrorResponse>({
      path: `/${teamId}/posts/${postId}/comments`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 댓글에 좋아요를 추가합니다.
   *
   * @tags Posts
   * @name CommentsLikeCreate
   * @summary 댓글 좋아요 추가
   * @request POST:/{teamId}/posts/{postId}/comments/{commentId}/like
   * @secure
   * @response `201` `CommentLike` 좋아요 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `404` `ErrorResponse` 댓글 없음
   * @response `409` `ErrorResponse` 이미 좋아요함
   */
  commentsLikeCreate = (
    { teamId, postId, commentId }: CommentsLikeCreateParams,
    params: RequestParams = {},
  ) =>
    this.request<CommentLike, ErrorResponse>({
      path: `/${teamId}/posts/${postId}/comments/${commentId}/like`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 댓글의 좋아요를 취소합니다.
 *
 * @tags Posts
 * @name CommentsLikeDelete
 * @summary 댓글 좋아요 취소
 * @request DELETE:/{teamId}/posts/{postId}/comments/{commentId}/like
 * @secure
 * @response `200` `{
    message: string,

}` 좋아요 취소 성공
 * @response `401` `ErrorResponse` 인증 필요
 * @response `404` `ErrorResponse` 좋아요하지 않은 댓글
 */
  commentsLikeDelete = (
    { teamId, postId, commentId }: CommentsLikeDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/posts/${postId}/comments/${commentId}/like`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 댓글을 삭제합니다. 작성자만 삭제할 수 있습니다.
 *
 * @tags Posts
 * @name CommentsDelete
 * @summary 댓글 삭제
 * @request DELETE:/{teamId}/posts/{postId}/comments/{commentId}
 * @secure
 * @response `200` `{
    message: string,

}` 삭제 성공
 * @response `401` `ErrorResponse` 인증 필요
 * @response `403` `ErrorResponse` 권한 없음
 * @response `404` `ErrorResponse` 댓글 없음
 */
  commentsDelete = (
    { teamId, postId, commentId }: CommentsDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/posts/${postId}/comments/${commentId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 댓글을 수정합니다. 작성자만 수정할 수 있습니다.
   *
   * @tags Posts
   * @name CommentsPartialUpdate
   * @summary 댓글 수정
   * @request PATCH:/{teamId}/posts/{postId}/comments/{commentId}
   * @secure
   * @response `200` `Comment` 수정 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `403` `ErrorResponse` 권한 없음
   * @response `404` `ErrorResponse` 댓글 없음
   */
  commentsPartialUpdate = (
    { teamId, postId, commentId }: CommentsPartialUpdateParams,
    data: UpdateComment,
    params: RequestParams = {},
  ) =>
    this.request<Comment, ErrorResponse>({
      path: `/${teamId}/posts/${postId}/comments/${commentId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 게시글에 좋아요를 추가합니다.
   *
   * @tags Posts
   * @name LikeCreate
   * @summary 좋아요 추가
   * @request POST:/{teamId}/posts/{postId}/like
   * @secure
   * @response `201` `PostLike` 좋아요 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `404` `ErrorResponse` 게시글 없음
   * @response `409` `ErrorResponse` 이미 좋아요함
   */
  likeCreate = (
    { teamId, postId }: LikeCreateParams,
    params: RequestParams = {},
  ) =>
    this.request<PostLike, ErrorResponse>({
      path: `/${teamId}/posts/${postId}/like`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 게시글의 좋아요를 취소합니다.
 *
 * @tags Posts
 * @name LikeDelete
 * @summary 좋아요 취소
 * @request DELETE:/{teamId}/posts/{postId}/like
 * @secure
 * @response `200` `{
    message: string,

}` 좋아요 취소 성공
 * @response `401` `ErrorResponse` 인증 필요
 * @response `404` `ErrorResponse` 좋아요하지 않은 게시글
 */
  likeDelete = (
    { teamId, postId }: LikeDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/posts/${postId}/like`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 현재 사용자의 알림 목록을 조회합니다. - 알림 종류: 개설 확정(MEETING_CONFIRMED), 모임 취소(MEETING_CANCELED), 모임 삭제(MEETING_DELETED), 댓글(COMMENT) - isRead 파라미터로 읽음/미읽음 필터링 가능
   *
   * @tags Notifications
   * @name NotificationsList
   * @summary 알림 목록
   * @request GET:/{teamId}/notifications
   * @secure
   * @response `200` `NotificationList` 조회 성공
   * @response `401` `ErrorResponse` 인증 필요
   */
  notificationsList = (
    { teamId, ...query }: NotificationsListParams,
    params: RequestParams = {},
  ) =>
    this.request<NotificationList, ErrorResponse>({
      path: `/${teamId}/notifications`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 현재 사용자의 모든 알림을 삭제합니다.
 *
 * @tags Notifications
 * @name NotificationsDelete
 * @summary 전체 알림 삭제
 * @request DELETE:/{teamId}/notifications
 * @secure
 * @response `200` `{
    count: number,

}` 삭제 성공
 * @response `401` `ErrorResponse` 인증 필요
 */
  notificationsDelete = (
    { teamId }: NotificationsDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        count: number;
      },
      ErrorResponse
    >({
      path: `/${teamId}/notifications`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 현재 사용자의 읽지 않은 알림 수를 조회합니다.
 *
 * @tags Notifications
 * @name UnreadCountList
 * @summary 읽지 않은 알림 수 조회
 * @request GET:/{teamId}/notifications/unread-count
 * @secure
 * @response `200` `{
    count: number,

}` 조회 성공
 * @response `401` `ErrorResponse` 인증 필요
 */
  unreadCountList = (
    { teamId }: UnreadCountListParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        count: number;
      },
      ErrorResponse
    >({
      path: `/${teamId}/notifications/unread-count`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 모든 읽지 않은 알림을 읽음으로 표시합니다.
 *
 * @tags Notifications
 * @name ReadAllUpdate
 * @summary 모든 알림 읽음 처리
 * @request PUT:/{teamId}/notifications/read-all
 * @secure
 * @response `200` `{
    count: number,

}` 처리 성공
 * @response `401` `ErrorResponse` 인증 필요
 */
  readAllUpdate = (
    { teamId }: ReadAllUpdateParams,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        count: number;
      },
      ErrorResponse
    >({
      path: `/${teamId}/notifications/read-all`,
      method: "PUT",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 특정 알림을 읽음으로 표시합니다.
   *
   * @tags Notifications
   * @name ReadUpdate
   * @summary 알림 읽음 처리
   * @request PUT:/{teamId}/notifications/{notificationId}/read
   * @secure
   * @response `200` `Notification` 처리 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `404` `ErrorResponse` 알림 없음
   */
  readUpdate = (
    { teamId, notificationId }: ReadUpdateParams,
    params: RequestParams = {},
  ) =>
    this.request<Notification, ErrorResponse>({
      path: `/${teamId}/notifications/${notificationId}/read`,
      method: "PUT",
      secure: true,
      format: "json",
      ...params,
    });
  /**
 * @description 특정 알림을 삭제합니다.
 *
 * @tags Notifications
 * @name NotificationsDelete2
 * @summary 알림 삭제
 * @request DELETE:/{teamId}/notifications/{notificationId}
 * @originalName notificationsDelete
 * @duplicate
 * @secure
 * @response `200` `{
    message: string,

}` 삭제 성공
 * @response `401` `ErrorResponse` 인증 필요
 * @response `404` `ErrorResponse` 알림 없음
 */
  notificationsDelete2 = (
    { teamId, notificationId }: NotificationsDelete2Params,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message: string;
      },
      ErrorResponse
    >({
      path: `/${teamId}/notifications/${notificationId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
}
