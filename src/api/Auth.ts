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
  EmailCheckCreateParams,
  EmailCheckRequest,
  EmailCheckResponse,
  ErrorResponse,
  LoginCreateParams,
  LoginRequest,
  LoginResponse,
  LogoutCreateParams,
  OauthCreateParams,
  OAuthRequest,
  RefreshCreateParams,
  RefreshRequest,
  SignupCreateParams,
  SignupRequest,
  User,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<
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
}
