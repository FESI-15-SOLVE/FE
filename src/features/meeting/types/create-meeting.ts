import { MeetingCategory } from '@/constants/categories';

export interface CreateMeetingValues {
  categoryId: number;
  name: string;
  location: string;
  detailAddress: string;
  file: File | null;
  dateTime?: Date;
  registrationEnd?: Date;
  capacity: number | '';
  description?: string;
}

export interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
  onSubmit: (values: CreateMeetingValues) => void;
  categories: MeetingCategory[];
}
