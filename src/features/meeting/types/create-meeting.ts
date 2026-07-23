export interface Category {
  id: string;
  name: string;
  imageSrc: string;
}

export interface CreateMeetingValues {
  categoryId?: string;
  name: string;
  location: string;
  detailAddress: string;
  file: File | null;
  dateTime?: Date;
  registrationEnd?: Date;
  capacity: number | '';
}

export interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number; // 숏컷용 초기 단계 설정 (기본값: 1)
  onSubmit: (values: CreateMeetingValues) => void; // 최종 모임 개설 데이터 콜백
  categories: Category[];
}
