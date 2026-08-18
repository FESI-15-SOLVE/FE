import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HostOptionsDropdown } from '../host-options-dropdown';

describe('HostOptionsDropdown 컴포넌트', () => {
  it('더보기 버튼 클릭 시 모임 수정 및 모임 취소 버튼이 노출되고 클릭 시 콜백이 실행된다', () => {
    const handleEditClick = vi.fn();
    const handleCancelClick = vi.fn();

    render(
      <HostOptionsDropdown
        onEditClick={handleEditClick}
        onCancelClick={handleCancelClick}
      />
    );

    const triggerBtn = screen.getByRole('button', { name: '주최자 옵션 더보기' });
    expect(triggerBtn).toBeDefined();

    fireEvent.click(triggerBtn);

    const editBtn = screen.getByRole('button', { name: '모임 수정' });
    const cancelBtn = screen.getByRole('button', { name: '모임 취소' });

    expect(editBtn).toBeDefined();
    expect(cancelBtn).toBeDefined();

    fireEvent.click(editBtn);
    expect(handleEditClick).toHaveBeenCalledTimes(1);
  });
});
