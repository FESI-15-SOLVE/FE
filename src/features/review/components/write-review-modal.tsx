'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/ui/rating/rating';
import { TextAreaField } from '@/components/ui/Input/textarea-field';

const reviewSchema = z.object({
  rating: z.number().min(1, '별점을 선택해주세요.').max(5),
  content: z.string().min(10, '최소 10자 이상 작성해주세요.'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (data: ReviewFormValues) => void;
}

export function WriteReviewModal({
  isOpen,
  onClose,
  onSubmitReview,
}: WriteReviewModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      content: '',
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: ReviewFormValues) => {
    onSubmitReview(data);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-85.5 sm:max-w-136 p-6 pt-8 pb-6 sm:p-12 rounded-[24px] sm:rounded-[40px] gap-8 sm:gap-11 border-none bg-white outline-none">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg sm:text-2xl font-semibold text-neutral-900">
            리뷰 쓰기
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-12"
        >
          <div className="flex flex-col gap-12 w-full">
            {/* Rating Section */}
            <div className="flex flex-col gap-2.5 w-full max-w-51">
              <div className="flex items-center gap-1 w-full px-1">
                <span className="text-sm sm:text-base font-medium text-neutral-800">
                  만족스러운 경험이었나요?
                </span>
                <span className="text-sm sm:text-base font-medium text-brand-500">
                  *
                </span>
              </div>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    readOnly={false}
                    score={field.value}
                    onChange={field.onChange}
                    size={'lg'}
                    maxScore={5}

                    className="w-full justify-between"
                  />
                )}
              />
              {errors.rating && (
                <p className="text-sm text-error-500 font-medium px-1 mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Textarea Section */}
            <div className="flex flex-col w-full">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TextAreaField
                    label="좋았던 점을 자유롭게 적어주세요."
                    required
                    placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
                    className="h-30 bg-neutral-50 rounded-xl px-3 py-3 resize-none border-none placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-brand-500"
                    helperText={errors.content?.message}
                    destructive={!!errors.content}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <Button
              type="button"
              variant="tertiary"
              size="md"
              className="flex-1 h-12 sm:h-15 text-base sm:text-xl rounded-xl sm:rounded-2xl"
              onClick={handleClose}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="flex-1 h-12 sm:h-15 text-base sm:text-xl rounded-xl sm:rounded-2xl"
            >
              확인
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
