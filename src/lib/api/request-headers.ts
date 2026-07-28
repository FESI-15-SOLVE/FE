import type { RequestParams } from "@/api/http-client";

/** accessToken → Authorization Bearer 헤더 */
export function createAuthorizationHeaders(
  accessToken?: string,
): HeadersInit {
  if (!accessToken) {
    return {};
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

/** HeadersInit → swagger HttpClient용 RequestParams */
export function createRequestParams(
  requestHeaders?: HeadersInit,
): RequestParams {
  if (!requestHeaders) {
    return {};
  }

  return {
    headers: requestHeaders,
  };
}
