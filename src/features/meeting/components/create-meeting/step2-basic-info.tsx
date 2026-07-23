import { useId } from 'react';
import { Input } from '@/components/ui/Input';
import { InputField, FileInput } from '@/components/ui/Input';
import { MapPin } from 'lucide-react';
import { CreateMeetingValues } from '../../types';

export interface Step2BasicInfoProps {
  values: Pick<
    CreateMeetingValues,
    'name' | 'location' | 'detailAddress' | 'file'
  >;
  errors?: Partial<Record<keyof CreateMeetingValues, string>>;
  onChange: <K extends keyof CreateMeetingValues>(
    field: K,
    value: CreateMeetingValues[K],
  ) => void;
}

export function Step2BasicInfo({
  values,
  errors,

  onChange,
}: Step2BasicInfoProps) {
  const generatedId = useId();
  const locationId = `location-${generatedId}`;

  return (
    <div className="w-full space-y-5">
      <InputField label="모임 이름" required error={errors?.name}>
        <Input
          placeholder="모임 이름을 입력해주세요"
          value={values.name}
          onChange={(e) => onChange('name', e.target.value)}
          destructive={!!errors?.name}
        />
      </InputField>

      <InputField label="장소" required error={errors?.location}>
        <Input
          id={locationId}
          placeholder="건물, 지번 또는 도로명 검색"
          value={values.location}
          onChange={(e) => onChange('location', e.target.value)}
          destructive={!!errors?.location}
          rightIcon={<MapPin className="size-5" />}
        />
      </InputField>

      <InputField label="상세주소" error={errors?.detailAddress}>
        <Input
          placeholder="상세주소를 입력해주세요"
          value={values.detailAddress}
          onChange={(e) => onChange('detailAddress', e.target.value)}
          destructive={!!errors?.detailAddress}
        />
      </InputField>

      <InputField label="이미지" required error={errors?.file}>
        <FileInput
          value={values.file}
          onChange={(file) => onChange('file', file)}
          size="lg"
        />
      </InputField>
    </div>
  );
}
