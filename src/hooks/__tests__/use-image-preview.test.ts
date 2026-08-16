import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useImagePreview } from '../use-image-preview';

describe('useImagePreview', () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  beforeEach(() => {
    URL.createObjectURL = vi.fn((file: File) => `blob:http://localhost/${file.name}`);
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
  });

  it('null/undefined 값 전달 시 null을 반환해야 한다', () => {
    const { result } = renderHook(() => useImagePreview(null));
    expect(result.current).toBeNull();
  });

  it('문자열 URL 전달 시 그대로 반환하고 revokeObjectURL을 호출하지 않아야 한다', () => {
    const url = 'https://example.com/image.png';
    const { result, unmount } = renderHook(() => useImagePreview(url));
    expect(result.current).toBe(url);
    unmount();
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
  });

  it('File 객체 전달 시 createObjectURL을 호출하고 언마운트 시 revokeObjectURL을 호출해야 한다', () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const { result, unmount } = renderHook(() => useImagePreview(file));
    expect(result.current).toBe('blob:http://localhost/test.png');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);

    unmount();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/test.png');
  });

  it('File이 다른 File로 교체되면 이전 objectURL을 revoke해야 한다', () => {
    const file1 = new File(['a'], 'a.png', { type: 'image/png' });
    const file2 = new File(['b'], 'b.png', { type: 'image/png' });

    const { result, rerender } = renderHook(
      ({ file }) => useImagePreview(file),
      { initialProps: { file: file1 as File | string | null } },
    );
    expect(result.current).toBe('blob:http://localhost/a.png');

    rerender({ file: file2 });

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/a.png');
    expect(result.current).toBe('blob:http://localhost/b.png');
  });

  it('File에서 null로 바뀌면 이전 objectURL을 revoke하고 null을 반환해야 한다', () => {
    const file = new File(['a'], 'a.png', { type: 'image/png' });
    const { result, rerender } = renderHook(
      ({ file }) => useImagePreview(file),
      { initialProps: { file: file as File | string | null } },
    );

    rerender({ file: null });

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/a.png');
    expect(result.current).toBeNull();
  });
});
