import axios from 'axios';
import {
  PostList,
  PostWithComments,
  GetPostsParams,
} from '@/api/data-contracts';

/**
 * 게시글 목록 조회 클라이언트 API (Route Handler /api/posts 호출)
 */
export async function fetchPosts(
  params: Omit<GetPostsParams, 'teamId'> = {},
): Promise<PostList> {
  const response = await axios.get<PostList>('/api/posts', { params });
  return response.data;
}

/**
 * HOT 베스트 게시글 목록 조회 클라이언트 API (Route Handler /api/posts/hot 호출)
 */
export async function fetchHotPosts(): Promise<PostList> {
  const response = await axios.get<PostList>('/api/posts/hot');
  return response.data;
}

/**
 * 게시글 상세 조회 클라이언트 API (Route Handler /api/posts/[id] 호출)
 */
export async function fetchPostDetail(
  postId: number,
): Promise<PostWithComments> {
  const response = await axios.get<PostWithComments>(`/api/posts/${postId}`);
  return response.data;
}
