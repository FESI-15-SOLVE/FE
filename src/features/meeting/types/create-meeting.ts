import { MeetingCategory } from '@/constants/categories';
import { CreateMeetingValues } from '../schema/create-shcema';

export type { CreateMeetingValues };

export interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
  onSubmit: (meetingId: number) => void;
  categories: MeetingCategory[];
}
