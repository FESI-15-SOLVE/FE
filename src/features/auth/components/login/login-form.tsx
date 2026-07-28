'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InputField } from '@/components/ui/Input/input-field';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { loginAction } from '@/actions/auth/auth-actions';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('이메일 형식으로 작성해 주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해 주세요.'),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });
  const router = useRouter();

  const onSubmit = async (data: LoginValues) => {
    const result = await loginAction(data);
    if (result?.serverError) {
      setError('root', { type: 'server', message: result.serverError.message });
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <InputField
          id="email"
          label="이메일"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            destructive={!!errors.email}
            {...register('email')}
          />
        </InputField>

        <InputField
          id="password"
          label="비밀번호"
          required
          error={errors.password?.message}
        >
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            destructive={!!errors.password}
            {...register('password')}
          />
        </InputField>
      </div>

      {errors.root && (
        <div className="text-sm font-medium text-red-500 text-center">
          {errors.root.message}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || !isValid}
      >
        로그인
      </Button>
    </form>
  );
}
