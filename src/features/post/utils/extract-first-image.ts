import { JSONContent } from '@tiptap/react';

/**
 * Tiptap AST 문서 객체(JSONContent)를 재귀 탐색하여
 * 첫 번째 이미지 노드(type === 'image')의 src URL을 추출합니다.
 *
 * 정규식 대신 AST 구조를 직접 분석하므로 마크다운 코드 블록 내부의
 * `![alt](url)` 텍스트 오탐을 100% 방지합니다.
 */
export function extractFirstImageFromAST(doc: JSONContent | null | undefined): string | null {
  if (!doc) return null;

  if (doc.type === 'image' && typeof doc.attrs?.src === 'string') {
    return doc.attrs.src;
  }

  if (doc.content && Array.isArray(doc.content)) {
    for (const childNode of doc.content) {
      const foundSrc = extractFirstImageFromAST(childNode);
      if (foundSrc) return foundSrc;
    }
  }

  return null;
}
