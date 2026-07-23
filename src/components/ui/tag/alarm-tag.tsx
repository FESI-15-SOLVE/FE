import { Tag } from './tag';
import { IconAlarm } from '@/components/icons';

interface AlarmTagProps {
  value: string;
}

function AlarmTag({ value }: AlarmTagProps) {
  return (
    <Tag
      className="border-blue-500"
      icon={<IconAlarm className="text-blue-500 size-5" />}
    >
      <span className="text-blue-500 font-semibold">{value}</span>
    </Tag>
  );
}

export default AlarmTag;
