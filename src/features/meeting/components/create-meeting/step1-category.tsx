import { Category, CreateMeetingValues } from '../../types';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/components/ui/field';
import { CategoryTab } from '@/components/ui/tab';

export interface Step1CategoryProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelectCategory: (id: string) => void;
  errors?: Partial<Record<keyof CreateMeetingValues, string>>;
}

export function Step1Category({
  categories,
  selectedCategoryId,
  onSelectCategory,

  errors,
}: Step1CategoryProps) {
  return (
    <div className="w-full space-y-6">
      <Field data-invalid={!!errors?.categoryId}>
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
                onClick={() => onSelectCategory(category.id)}
              />
            ))}
          </div>
        </FieldContent>
        {errors?.categoryId && (
          <FieldError errors={[{ message: errors.categoryId }]} />
        )}
      </Field>
    </div>
  );
}
