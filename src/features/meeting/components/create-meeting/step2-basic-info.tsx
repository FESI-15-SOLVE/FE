import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { InputField, FileInput } from '@/components/ui/Input';
import { MapPin } from 'lucide-react';
import { CreateMeetingValues } from '../../types';

export function Step2BasicInfo() {
  const generatedId = useId();
  const locationId = `location-${generatedId}`;
  
  const { watch, setValue, formState: { errors } } = useFormContext<CreateMeetingValues>();
  const name = watch('name');
  const location = watch('location');
  const detailAddress = watch('detailAddress');
  const file = watch('file');

  return (
    <div className="w-full space-y-5">
      <InputField label="모임 이름" required error={errors.name?.message}>
        <Input
          placeholder="모임 이름을 입력해주세요"
          value={name}
          onChange={(e) => setValue('name', e.target.value, { shouldValidate: true })}
          destructive={!!errors.name}
        />
      </InputField>

      <InputField label="장소" required error={errors.location?.message}>
        <Input
          id={locationId}
          placeholder="건물, 지번 또는 도로명 검색"
          value={location}
          onChange={(e) => setValue('location', e.target.value, { shouldValidate: true })}
          destructive={!!errors.location}
          rightIcon={<MapPin className="size-5" />}
        />
      </InputField>

      <InputField label="상세주소" error={errors.detailAddress?.message}>
        <Input
          placeholder="상세주소를 입력해주세요"
          value={detailAddress}
          onChange={(e) => setValue('detailAddress', e.target.value, { shouldValidate: true })}
          destructive={!!errors.detailAddress}
        />
      </InputField>

      <InputField label="이미지" required error={errors.file?.message as string}>
        <FileInput
          value={file}
          onChange={(f) => setValue('file', f, { shouldValidate: true })}
          size="lg"
        />
      </InputField>
    </div>
  );
}
