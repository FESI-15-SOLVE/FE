import type { RequestParams } from "@/api/http-client";

export function createNotificationRequestParams(
  requestHeaders?: HeadersInit,
): RequestParams {
  if (!requestHeaders) {
    return {};
  }

  return {
    headers: requestHeaders,
  };
}

export function createAuthorizationHeaders(accessToken?: string): HeadersInit {
  if (!accessToken) {
    return {};
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}
