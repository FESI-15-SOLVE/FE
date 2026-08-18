import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TimePicker } from '../time-picker';

describe('TimePicker 컴포넌트', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  it('시간 및 분 옵션을 렌더링하고 클릭 시 콜백을 실행한다', () => {
    const handleHourChange = vi.fn();
    const handleMinuteChange = vi.fn();

    render(
      <TimePicker
        hour={10}
        minute={15}
        onHourChange={handleHourChange}
        onMinuteChange={handleMinuteChange}
      />
    );

    const hourListbox = screen.getByRole('listbox', { name: '시' });
    const minuteListbox = screen.getByRole('listbox', { name: '분' });

    expect(hourListbox).toBeDefined();
    expect(minuteListbox).toBeDefined();

    const targetHourOption = screen.getByRole('option', { name: '14시' });
    fireEvent.click(targetHourOption);
    expect(handleHourChange).toHaveBeenCalledWith(14);

    const targetMinuteOption = screen.getByRole('option', { name: '30분' });
    fireEvent.click(targetMinuteOption);
    expect(handleMinuteChange).toHaveBeenCalledWith(30);
  });
});
