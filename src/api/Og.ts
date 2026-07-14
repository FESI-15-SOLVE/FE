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

import { GetOgParams, OgMetadata } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Og<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 주어진 URL에서 Open Graph 메타데이터(제목, 설명, 이미지 등)를 파싱하여 반환합니다.
   *
   * @tags OG
   * @name GetOg
   * @summary URL의 Open Graph 메타데이터 조회
   * @request GET:/og
   * @secure
   * @response `200` `OgMetadata` OG 메타데이터 조회 성공
   * @response `400` `void` 잘못된 URL
   * @response `502` `void` 대상 URL에서 데이터를 가져올 수 없음
   */
  getOg = (query: GetOgParams, params: RequestParams = {}) =>
    this.request<OgMetadata, void>({
      path: `/og`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
}
