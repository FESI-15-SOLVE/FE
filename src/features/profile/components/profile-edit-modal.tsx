'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input/input';
import { InputField } from '@/components/ui/input/input-field';
import { useAuthStore } from '@/providers/auth-provider';
import { toast } from 'sonner';
import { updateProfile } from '../api/update-profile';
import { ProfileImageInput } from './profile-image-input';
import {
  profileEditSchema,
  ProfileEditFormValues,
} from '../schemas/profile-schema';
import { XIcon } from 'lucide-react';

export interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileEditModal({ isOpen, onClose }: ProfileEditModalProps) {
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const userName = user?.name;
  const userImage = user?.image;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: userName,
      image: userImage || '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: userName,
        image: userImage || '',
      });
    }
  }, [userName, userImage, isOpen, reset]);

  const onSubmit = async (values: ProfileEditFormValues) => {
    try {
      const updatedUser = await updateProfile({
        name: values.name,
        image: values.image,
      });

      if (updatedUser) {
        setAuth(updatedUser);
        toast.success('프로필이 수정되었습니다.');
        onClose();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : '프로필 수정 중 오류가 발생했습니다.',
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="border-none bg-white  p-6 sm:p-8 rounded-3xl gap-6"
      >
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <DialogTitle className="text-xl font-bold text-slate-900">
            프로필 수정하기
          </DialogTitle>
          <DialogClose aria-label="닫기" className="cursor-pointer">
            <XIcon aria-hidden="true" />
          </DialogClose>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 pt-2 "
        >
          {/* Profile Image Input Component via RHF Controller */}
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ProfileImageInput
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {/* Form Fields with RHF and Zod Error Message */}
          <div className="flex flex-col gap-4">
            <InputField label="닉네임" error={errors.name?.message}>
              <Input
                {...register('name')}
                placeholder="닉네임을 입력하세요"
                maxLength={20}
              />
            </InputField>

            <InputField label="이메일">
              <Input
                value={user?.email || ''}
                disabled
                readOnly
                className="bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </InputField>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 ">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="w-28 h-12 font-semibold cursor-pointer"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-32 h-12 font-semibold cursor-pointer"
            >
              {isSubmitting ? '수정 중...' : '수정하기'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
