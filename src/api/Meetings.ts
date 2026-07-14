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
  CreateMeeting,
  ErrorResponse,
  GetMeetingsParams,
  JoinCreateParams,
  JoinDeleteParams,
  JoinedListParams,
  JoinedMeetingList,
  MeetingList,
  MeetingsCreateParams,
  MeetingsDeleteParams,
  MeetingsDetailParams,
  MeetingsListParams,
  MeetingsPartialUpdateParams,
  MeetingWithHost,
  ParticipantList,
  ParticipantsListParams,
  StatusPartialUpdateParams,
  UpdateMeeting,
  UpdateMeetingStatus,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Meetings<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
   * @name GetMeetings
   * @summary 내가 만든 모임 목록
   * @request GET:/{teamId}/meetings/my
   * @secure
   * @response `200` `MeetingList` 조회 성공
   * @response `401` `ErrorResponse` 인증 필요
   */
  getMeetings = (
    { teamId, ...query }: GetMeetingsParams,
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
}
