import { Tag } from './tag';
import IconAlarm from '@/assets/icons/alarm.svg';

interface AlarmTagProps {
  children: React.ReactNode;
}

function AlarmTag({ children }: AlarmTagProps) {
  return (
    <Tag
      className="border-blue-500 text-blue-500 font-semibold"
      icon={<IconAlarm className="text-blue-500 size-5" />}
    >
      {children}
    </Tag>
  );
}

export default AlarmTag;
