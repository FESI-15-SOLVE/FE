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
  CategoryStatistics,
  CreateReviewByMeeting,
  CreateReviewParams,
  DeleteReviewParams,
  ErrorResponse,
  GetCategoryReviewStatisticsParams,
  GetMeetingReviewsParams,
  GetReviewsParams,
  GetReviewStatisticsParams,
  PaginatedReview,
  ReviewStatistics,
  ReviewWithDetails,
  UpdateReview,
  UpdateReviewParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Reviews<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 리뷰 목록을 조회합니다.
   *
   * @tags Reviews
   * @name GetReviews
   * @summary 리뷰 목록
   * @request GET:/{teamId}/reviews
   * @secure
   * @response `200` `PaginatedReview` 조회 성공
   */
  getReviews = (
    { teamId, ...query }: GetReviewsParams,
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
   * @name GetReviewStatistics
   * @summary 리뷰 전체 통계
   * @request GET:/{teamId}/reviews/statistics
   * @secure
   * @response `200` `ReviewStatistics` 조회 성공
   */
  getReviewStatistics = (
    { teamId }: GetReviewStatisticsParams,
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
   * @name GetCategoryReviewStatistics
   * @summary 카테고리별 리뷰 통계
   * @request GET:/{teamId}/reviews/categories/statistics
   * @secure
   * @response `200` `CategoryStatistics` 조회 성공
   */
  getCategoryReviewStatistics = (
    { teamId }: GetCategoryReviewStatisticsParams,
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
   * @name UpdateReview
   * @summary 리뷰 수정
   * @request PATCH:/{teamId}/reviews/{reviewId}
   * @secure
   * @response `200` `ReviewWithDetails` 수정 성공
   * @response `401` `ErrorResponse` 인증 필요
   * @response `403` `ErrorResponse` 권한 없음 (본인 리뷰만 수정 가능)
   * @response `404` `ErrorResponse` 리뷰 없음
   */
  updateReview = (
    { teamId, reviewId }: UpdateReviewParams,
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
 * @name DeleteReview
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
  deleteReview = (
    { teamId, reviewId }: DeleteReviewParams,
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
   * @name CreateReview
   * @summary 리뷰 작성
   * @request POST:/{teamId}/meetings/{meetingId}/reviews
   * @secure
   * @response `201` `ReviewWithDetails` 작성 성공
   * @response `400` `ErrorResponse` 유효하지 않은 요청 (미완료, 비참가자, 취소된 모임)
   * @response `401` `ErrorResponse` 인증 필요
   * @response `404` `ErrorResponse` 모임 없음
   * @response `409` `ErrorResponse` 이미 리뷰 작성함
   */
  createReview = (
    { teamId, meetingId }: CreateReviewParams,
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
   * @name GetMeetingReviews
   * @summary 특정 모임 리뷰 목록 (중첩)
   * @request GET:/{teamId}/meetings/{meetingId}/reviews
   * @secure
   * @response `200` `PaginatedReview` 조회 성공
   */
  getMeetingReviews = (
    { teamId, meetingId, ...query }: GetMeetingReviewsParams,
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
}
