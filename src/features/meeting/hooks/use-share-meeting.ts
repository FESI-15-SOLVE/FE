import { toast } from 'sonner';
import { useCallback } from 'react';

export function useShareMeeting() {
  const shareMeeting = useCallback(async (meetingId: number) => {
    const url = `${window.location.origin}/meetings/${meetingId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('복사가 완료되었습니다.');
    } catch {
      toast.error('복사에 실패했습니다.');
    }
  }, []);

  return { shareMeeting };
}
