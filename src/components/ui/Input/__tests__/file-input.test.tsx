import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileInput } from '../file-input';

describe('FileInput 컴포넌트', () => {
  it('value가 null일 때 업로드 아이콘과 파일 첨부 텍스트를 렌더링한다', () => {
    render(<FileInput value={null} />);
    expect(screen.getByAltText('Upload Icon')).toBeInTheDocument();
    expect(screen.getByText('파일 첨부')).toBeInTheDocument();
  });

  it('value가 URL 문자열일 때 배경 이미지 프리뷰를 렌더링한다', () => {
    const { container } = render(
      <FileInput value="https://example.com/image.png" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle(
      'background-image: url(https://example.com/image.png)',
    );
    expect(screen.queryByAltText('Upload Icon')).not.toBeInTheDocument();
  });

  it('파일 업로드 시 onChange 콜백이 파일 객체를 인자로 받아 호출된다', async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <FileInput value={null} onChange={handleChange} />,
    );

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    await userEvent.upload(input, file);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(file);
  });

  it('프리뷰 상태일 때 삭제 버튼을 보여주고, 클릭 시 onChange(null)을 호출한다', async () => {
    const handleChange = vi.fn();
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    render(<FileInput value={file} onChange={handleChange} />);

    const deleteBtnImg = screen.getByRole('button', { name: '삭제' });
    expect(deleteBtnImg).toBeInTheDocument();

    const deleteBtn = deleteBtnImg.closest('button');
    expect(deleteBtn).toBeInTheDocument();
    await userEvent.click(deleteBtn!);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('disabled 상태일 때 파일 다이얼로그가 열리지 않고 이벤트가 무시된다', async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <FileInput value={null} onChange={handleChange} disabled />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('opacity-50');
    expect(wrapper).toHaveClass('cursor-not-allowed');

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    await userEvent.click(wrapper);
    expect(clickSpy).not.toHaveBeenCalled();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('기본 스타일에 커스텀 className이 정상적으로 병합된다', () => {
    const { container } = render(
      <FileInput value={null} className="custom-wrapper-class" />,
    );
    expect(container.firstChild).toHaveClass('custom-wrapper-class');
  });
});
