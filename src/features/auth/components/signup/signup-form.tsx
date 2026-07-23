'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { InputField } from '@/components/ui/Input/input-field';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { SocialButton } from '@/components/ui/button/social-button';

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
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: SignupFormData) => {
    // 백엔드 연동 전 임시 출력
    console.log('Form submitted:', data);
  };

  return (
    <div className="w-full max-w-142 mx-auto bg-white md:rounded-3xl px-4 py-6 md:px-14 md:py-10 shadow-none md:shadow-sm border-0 md:border border-gray-100">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
          회원가입
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full h-14 text-base font-semibold mt-2"
        >
          확인
        </Button>
      </form>

      {/* 구분선 및 소셜 로그인 */}
      <div className="mt-8">
        <div className="relative flex items-center mb-6">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink-0 mx-4 text-xs font-medium text-gray-500">
            SNS 계정으로 회원가입
          </span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        <div className="flex gap-3 w-full">
          <SocialButton social="kakao" className="" />
          <SocialButton social="google" className="" />
        </div>
      </div>

      {/* 로그인 이동 링크 */}
      <div className="mt-8 flex justify-center items-center text-sm font-medium">
        <span className="text-gray-500">이미 회원이신가요? </span>
        <Link
          href="/login"
          className="text-green-500 ml-1 underline underline-offset-2"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
