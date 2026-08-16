import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFileInput } from '../use-file-input';

describe('useFileInput', () => {
  it('초기화 시 기본 ref, selectedFile, previewUrl을 반환해야 한다', () => {
    const { result } = renderHook(() => useFileInput());
    expect(result.current.selectedFile).toBeNull();
    expect(result.current.previewUrl).toBeNull();
  });

  it('비제어(Uncontrolled) 상태에서 handleFileChange 호출 시 파일이 선택되고 onChange 콜백이 호출되어야 한다', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useFileInput({ onChange }));

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const event = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleFileChange(event);
    });

    expect(result.current.selectedFile).toEqual(file);
    expect(onChange).toHaveBeenCalledWith(file);
  });

  it('handleDelete 호출 시 파일 상태가 초기화되고 onChange(null)이 호출되어야 한다', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useFileInput({ onChange }));

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const event = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleFileChange(event);
    });

    act(() => {
      result.current.handleDelete();
    });

    expect(result.current.selectedFile).toBeNull();
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('disabled 상태에서 handleClick 호출 시 click이 차단되어야 한다', () => {
    const { result } = renderHook(() => useFileInput({ disabled: true }));
    const inputEl = document.createElement('input');
    const clickSpy = vi.spyOn(inputEl, 'click');
    (result.current.fileInputRef as React.RefObject<HTMLInputElement>).current = inputEl;

    act(() => {
      result.current.handleClick();
    });

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('enabled 상태에서 handleClick 호출 시 inputRef의 click 메서드가 호출되어야 한다', () => {
    const { result } = renderHook(() => useFileInput({ disabled: false }));
    const inputEl = document.createElement('input');
    const clickSpy = vi.spyOn(inputEl, 'click');
    (result.current.fileInputRef as React.RefObject<HTMLInputElement>).current = inputEl;

    act(() => {
      result.current.handleClick();
    });

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
