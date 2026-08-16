import { describe, it, expect } from 'vitest';
import { extractFirstImageFromAST, hasPendingUploadsInAST } from '../extract-first-image';

describe('extractFirstImageFromAST', () => {
  it('null/undefined 문서 입력 시 null을 반환해야 한다', () => {
    expect(extractFirstImageFromAST(null)).toBeNull();
    expect(extractFirstImageFromAST(undefined)).toBeNull();
  });

  it('중첩된 Tiptap AST 문서 구조에서 첫 번째 image 노드의 src를 성공적으로 추출해야 한다', () => {
    const mockAST = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: '본문 텍스트' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'image',
              attrs: { src: 'https://example.com/first-image.jpg' },
            },
            {
              type: 'image',
              attrs: { src: 'https://example.com/second-image.jpg' },
            },
          ],
        },
      ],
    };

    const src = extractFirstImageFromAST(mockAST);
    expect(src).toBe('https://example.com/first-image.jpg');
  });

  it('이미지 노드가 없으면 null을 반환해야 한다', () => {
    const mockAST = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: '텍스트만 있음' }] }],
    };
    expect(extractFirstImageFromAST(mockAST)).toBeNull();
  });
});

describe('hasPendingUploadsInAST', () => {
  it('AST 내부에 imageUpload 노드가 존재하면 true를 반환해야 한다', () => {
    const mockASTWithUpload = {
      type: 'doc',
      content: [
        {
          type: 'imageUpload',
          attrs: { id: 'upload-1' },
        },
      ],
    };
    expect(hasPendingUploadsInAST(mockASTWithUpload)).toBe(true);
  });

  it('imageUpload 노드가 없으면 false를 반환해야 한다', () => {
    const mockASTNormal = {
      type: 'doc',
      content: [{ type: 'image', attrs: { src: 'https://example.com/image.jpg' } }],
    };
    expect(hasPendingUploadsInAST(mockASTNormal)).toBe(false);
  });
});
