import axios from 'axios';
import { CLIENT_API_URL } from '@/constants/api';
import { ErrorResponse } from '@/lib/error-response';

export const clientApi = axios.create({
  baseURL: `${CLIENT_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const isNetworkError = !error.response;

    throw new ErrorResponse(
      data?.message ||
        (isNetworkError
          ? '네트워크 연결 상태를 확인해 주세요.'
          : error.message) ||
        '요청 처리 중 오류가 발생했습니다.',
      data?.code || (isNetworkError ? 'NETWORK_ERROR' : 'UNKNOWN_ERROR'),
      error.response?.status || 0,
      { cause: error },
    );
  },
);
