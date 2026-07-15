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
  CountListParams,
  ErrorResponse,
  FavoriteCount,
  FavoriteList,
  FavoritesCreateParams,
  FavoritesDeleteParams,
  FavoritesListParams,
  FavoriteWithMeeting,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Favorites<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
}
