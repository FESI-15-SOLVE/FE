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
  Notification,
  NotificationList,
  NotificationsDelete2Params,
  NotificationsDeleteParams,
  NotificationsListParams,
  ReadAllUpdateParams,
  ReadUpdateParams,
  UnreadCountListParams,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Notifications<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
