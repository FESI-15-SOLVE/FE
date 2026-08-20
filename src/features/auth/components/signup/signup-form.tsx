'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { InputField } from '@/components/ui/input/input-field';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button';
import { signupAction } from '@/actions/auth/auth-actions';
import { unwrapAction } from '@/lib/safe-action';
import { useRouter } from 'next/navigation';
import { ErrorResponse } from '@/lib/error-response';

const signupSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상 입력해 주세요.'),
    email: z.string().email('유효한 이메일 형식이 아닙니다.'),
    password: z.string().min(8, '비밀번호는 8자 이상 입력해 주세요.'),
    passwordConfirm: z.string().min(1, '비밀번호를 다시 한 번 입력해 주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const [isNavPending, startTransition] = useTransition();

  const onSubmit = async (data: SignupFormData) => {
    const { passwordConfirm, ...requestData } = data;
    try {
      unwrapAction(await signupAction(requestData));
      startTransition(() => {
        router.push('/sign-in');
      });
    } catch (error) {
      if (error instanceof ErrorResponse) {
        setError('root', { type: 'server', message: error.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {/* 이름 입력 */}
        <InputField
          id="name"
          label="이름"
          error={errors.name?.message}
          required
        >
          <Input
            id="name"
            placeholder="이름을 입력해 주세요"
            destructive={!!errors.name}
            {...register('name')}
          />
        </InputField>

        {/* 이메일 입력 */}
        <InputField
          id="email"
          label="이메일"
          error={errors.email?.message}
          required
        >
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            destructive={!!errors.email}
            {...register('email')}
          />
        </InputField>

        {/* 비밀번호 입력 */}
        <InputField
          id="password"
          label="비밀번호"
          error={errors.password?.message}
          required
        >
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            destructive={!!errors.password}
            {...register('password')}
          />
        </InputField>

        {/* 비밀번호 확인 입력 */}
        <InputField
          id="passwordConfirm"
          label="비밀번호 확인"
          error={errors.passwordConfirm?.message}
          required
        >
          <Input
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
            destructive={!!errors.passwordConfirm}
            {...register('passwordConfirm')}
          />
        </InputField>

        {/* 회원가입 버튼 */}
        {errors.root && (
          <div className="text-sm font-medium text-red-500 text-center mt-2">
            {errors.root.message}
          </div>
        )}
        <Button
          type="submit"
          disabled={!isValid || isSubmitting || isNavPending}
          className="w-full h-14 text-base font-semibold mt-2"
        >
          확인
        </Button>
      </div>
    </form>
  );
}
