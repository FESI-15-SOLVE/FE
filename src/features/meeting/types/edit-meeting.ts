import { EditMeetingValues, EditMeetingPayload } from '../schema/edit-meeting-schema';

export type { EditMeetingValues, EditMeetingPayload };

export interface EditMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
