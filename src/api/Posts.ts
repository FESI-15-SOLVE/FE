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
  Comment,
  CommentLike,
  CommentList,
  CommentsCreateParams,
  CommentsDeleteParams,
  CommentsLikeCreateParams,
  CommentsLikeDeleteParams,
  CommentsListParams,
  CommentsPartialUpdateParams,
  CreateComment,
  CreatePost,
  ErrorResponse,
  LikeCreateParams,
  LikeDeleteParams,
  PostLike,
  PostList,
  PostsCreateParams,
  PostsDeleteParams,
  PostsDetailParams,
  PostsListParams,
  PostsPartialUpdateParams,
  PostWithAuthor,
  PostWithComments,
  UpdateComment,
  UpdatePost,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Posts<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
}
