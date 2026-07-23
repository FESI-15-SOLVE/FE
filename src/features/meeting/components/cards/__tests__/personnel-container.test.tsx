import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PersonnelContainer } from '../personnel-container';

describe('PersonnelContainer 컴포넌트', () => {
  it('참여자 수가 올바르게 렌더링되어야 합니다', () => {
    render(
      <PersonnelContainer 
        currentParticipant={16} 
        minParticipant={5} 
        maxParticipant={20} 
      />
    );
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('명 참여')).toBeInTheDocument();
  });

  it('isConfirmed가 true일 때 개설확정 뱃지가 노출되어야 합니다', () => {
    render(
      <PersonnelContainer 
        currentParticipant={16} 
        minParticipant={5} 
        maxParticipant={20} 
        isConfirmed={true}
      />
    );
    expect(screen.getAllByText('개설확정').length).toBeGreaterThan(0);
  });

  it('아바타 이미지가 4개를 초과할 때 +N 뱃지가 나타나야 합니다', () => {
    const images = Array(16).fill('http://localhost:3845/assets/dummy.png');
    render(
      <PersonnelContainer 
        currentParticipant={16} 
        minParticipant={5} 
        maxParticipant={20} 
        participantImages={images}
      />
    );
    expect(screen.getByText('+12')).toBeInTheDocument();
  });
});
