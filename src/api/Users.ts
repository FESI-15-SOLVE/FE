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
  ErrorResponse,
  GetUsersParams,
  MeMeetingsListParams,
  MePostsListParams,
  MeReviewsListParams,
  PatchUsersParams,
  PublicUser,
  UpdateUserRequest,
  User,
  UserMeetingsResponse,
  UserPostsResponse,
  UserReviewsResponse,
  UsersDetailParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 현재 로그인된 사용자의 정보를 조회합니다. Authorization 헤더에 Bearer 토큰이 필요합니다.
   *
   * @tags Users
   * @name GetUsers
   * @summary 내 정보 조회
   * @request GET:/{teamId}/users/me
   * @secure
   * @response `200` `User` 조회 성공 - 현재 로그인된 사용자 정보
   * @response `401` `ErrorResponse` 인증 필요 - 유효한 accessToken이 필요합니다
   */
  getUsers = ({ teamId }: GetUsersParams, params: RequestParams = {}) =>
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
   * @name PatchUsers
   * @summary 내 정보 수정
   * @request PATCH:/{teamId}/users/me
   * @secure
   * @response `200` `User` 수정 성공 - 업데이트된 사용자 정보 반환
   * @response `401` `ErrorResponse` 인증 필요 - 유효한 accessToken이 필요합니다
   */
  patchUsers = (
    { teamId }: PatchUsersParams,
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
}
