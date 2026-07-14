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
  ImagesCreateParams,
  PresignedUrlRequest,
  PresignedUrlResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Images<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
}
