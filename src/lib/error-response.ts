import { ErrorResponse as ErrorResponseGenerated } from '@/api/data-contracts';

/**
 * 프로젝트 전역 에러 클래스.
 * 서버/클라이언트 모두에서 사용 가능하도록 server-only 의존성 없이 분리되어 있다.
 * 백엔드 HTTP 에러, Server Action 에러, Route Handler 에러가 모두 이 타입으로 정규화된다.
 */
export class ErrorResponse extends Error implements ErrorResponseGenerated {
  code: string;
  status: number;

  constructor(
    message: string,
    code: string,
    status: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'ErrorResponse';
    this.code = code;
    this.status = status;
  }
}
