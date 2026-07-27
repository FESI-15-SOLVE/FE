import { useFormContext } from 'react-hook-form';
import { CreateMeetingValues } from '../../types';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/components/ui/field';
import { CategoryTab } from '@/components/ui/tab';
import { MeetingCategory } from '@/constants/categories';

export interface Step1CategoryProps {
  categories: MeetingCategory[];
}

export function Step1Category({ categories }: Step1CategoryProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<CreateMeetingValues>();
  const selectedCategoryId = watch('categoryId');
  const error = errors.categoryId?.message;

  return (
    <div className="w-full space-y-6">
      <Field data-invalid={!!error}>
        <FieldLabel className="flex items-center gap-0.5 font-semibold text-neutral-800">
          모임 종류 선택 <span className="text-brand-500">*</span>
        </FieldLabel>
        <FieldContent>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <CategoryTab
                key={category.id}
                label={category.name}
                imageUrl={category.imageSrc}
                isSelected={category.id === selectedCategoryId}
                onClick={() => setValue('categoryId', category.id, { shouldValidate: true })}
              />
            ))}
          </div>
        </FieldContent>
        {error && (
          <FieldError errors={[{ message: error }]} />
        )}
      </Field>
    </div>
  );
}
