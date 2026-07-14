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
  CreateMeetingType,
  ErrorResponse,
  MeetingType,
  MeetingTypeList,
  MeetingTypesCreateParams,
  MeetingTypesDeleteParams,
  MeetingTypesListParams,
  MeetingTypesPartialUpdateParams,
  UpdateMeetingType,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class MeetingTypes<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
}
