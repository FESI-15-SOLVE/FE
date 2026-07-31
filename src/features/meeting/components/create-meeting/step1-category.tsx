import { Controller, useFormContext } from 'react-hook-form';
import { CreateMeetingValues } from '../../types/create-meeting';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/components/ui/field';
import { CategoryTab } from '@/components/ui/tab/category-tab';
import { MeetingCategory } from '@/constants/categories';

export interface Step1CategoryProps {
  categories: MeetingCategory[];
}

export function Step1Category({ categories }: Step1CategoryProps) {
  const { control } = useFormContext<CreateMeetingValues>();

  return (
    <div className="w-full space-y-6">
      <Controller
        control={control}
        name="categoryId"
        render={({ field, fieldState: { error } }) => (
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
                    isSelected={category.id === field.value}
                    onClick={() => field.onChange(category.id)}
                  />
                ))}
              </div>
            </FieldContent>
            {error?.message && (
              <FieldError errors={[{ message: error.message }]} />
            )}
          </Field>
        )}
      />
    </div>
  );
}
