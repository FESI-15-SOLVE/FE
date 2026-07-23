'use client';

import { Button } from '@/components/ui/button';
import { CreateButton } from '@/components/ui/button';
import { SocialButton } from '@/components/ui/button';
import { UtilityButton } from '@/components/ui/button';
import { EditButton } from '@/components/ui/button';
import { DeleteButton } from '@/components/ui/button';
import { Badge, StatusBadge, CountBadge } from '@/components/ui/badge';
import { Calendar, DatePicker, TimePicker } from '@/components/ui/calendar';
import { EmptyState } from '@/components/ui/empty';
import { Progress, ProgressBar } from '@/components/ui/progress';
import { RatingDisplay, RatingInput } from '@/components/ui/rating';
import { Tag } from '@/components/ui/tag';
import { toast, Toaster } from '@/components/ui/toast';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-8">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center py-16 px-8 bg-white rounded-2xl shadow-sm dark:bg-zinc-900">
        <h1 className="text-3xl font-bold mb-12">Components Preview</h1>

        <div className="flex flex-col gap-16 w-full">
          {/* Primary Buttons */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Primary Buttons
            </h2>
            <div className="flex flex-wrap items-end gap-8">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Large</span>
                <Button variant="primary" size="lg">
                  참여하기
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Medium</span>
                <Button variant="primary" size="md">
                  회원가입
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Small</span>
                <Button variant="primary" size="sm">
                  참여하기
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Disabled (Large)</span>
                <Button variant="primary" size="lg" disabled>
                  참여하기
                </Button>
              </div>
            </div>
          </section>

          {/* Secondary Buttons */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Secondary Buttons
            </h2>
            <div className="flex flex-wrap items-end gap-8">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Large</span>
                <Button variant="secondary" size="lg">
                  참여하기
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Medium</span>
                <Button variant="secondary" size="md">
                  회원가입
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Small</span>
                <Button variant="secondary" size="sm">
                  참여하기
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Disabled (Medium)</span>
                <Button variant="secondary" size="md" disabled>
                  회원가입
                </Button>
              </div>
            </div>
          </section>

          {/* Tertiary Buttons */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Tertiary Buttons
            </h2>
            <div className="flex flex-wrap items-end gap-8">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Large</span>
                <Button variant="tertiary" size="lg">
                  참여하기
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Medium</span>
                <Button variant="tertiary" size="md">
                  회원가입
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Small</span>
                <Button variant="tertiary" size="sm">
                  참여하기
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Disabled (Small)</span>
                <Button variant="tertiary" size="sm" disabled>
                  참여하기
                </Button>
              </div>
            </div>
          </section>

          {/* Domain Specific Buttons */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Domain-Specific Buttons
            </h2>
            <div className="flex flex-wrap items-end gap-8">
              {/* CreateButton */}
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">
                  CreateButton (Large)
                </span>
                <CreateButton size="lg" />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">
                  CreateButton (Small)
                </span>
                <CreateButton size="sm" />
              </div>

              {/* SocialButton */}
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">
                  SocialButton (Kakao)
                </span>
                <SocialButton social="kakao" />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">
                  SocialButton (Google)
                </span>
                <SocialButton social="google" />
              </div>

              {/* UtilityButton */}
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">
                  UtilityButton (Active Lg)
                </span>
                <UtilityButton size="lg" isActive={true} />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">
                  UtilityButton (Default Md)
                </span>
                <UtilityButton size="md" isActive={false} />
              </div>

              {/* Other Circular Buttons */}
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">EditButton</span>
                <EditButton />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">DeleteButton</span>
                <DeleteButton />
              </div>
            </div>
          </section>

          {/* Badge Components */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Badge Components
            </h2>
            <div className="flex flex-wrap items-end gap-8">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Badge</span>
                <Badge>Default Badge</Badge>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">StatusBadge</span>
                <div className="flex gap-2">
                  <StatusBadge status="upcoming" />
                  <StatusBadge status="completed" />
                  <StatusBadge status="confirmed" />
                  <StatusBadge status="pending" />
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">CountBadge</span>
                <div className="flex gap-4">
                  <CountBadge count={5} />
                  <CountBadge count={150} />
                </div>
              </div>
            </div>
          </section>

          {/* Tag Component */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Tag Component
            </h2>
            <div className="flex flex-wrap items-end gap-8">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Default</span>
                <Tag variant="default">태그</Tag>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Accent</span>
                <Tag variant="accent">태그</Tag>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-gray-500">Success</span>
                <Tag variant="success">태그</Tag>
              </div>
            </div>
          </section>

          {/* Rating Components */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Rating Components
            </h2>
            <div className="flex flex-wrap items-end gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">RatingDisplay</span>
                <RatingDisplay rating={3.5} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">RatingInput</span>
                <RatingInput />
              </div>
            </div>
          </section>

          {/* Progress Components */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Progress Components
            </h2>
            <div className="flex flex-col gap-8 w-full max-w-md">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">Progress (Radial)</span>
                <ProgressBar />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  ProgressBar (Linear)
                </span>
                <ProgressBar current={10} total={100} />
              </div>
            </div>
          </section>

          {/* Calendar Components */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Calendar Components
            </h2>
            <div className="flex flex-wrap items-start gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">DatePicker</span>
                <DatePicker />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">TimePicker</span>
                <TimePicker />
              </div>
              <div className="flex flex-col gap-2 border p-4 rounded-xl shadow-sm bg-white">
                <span className="text-sm text-gray-500 mb-2">
                  Calendar (Base)
                </span>
                <Calendar />
              </div>
            </div>
          </section>

          {/* EmptyState Component */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              EmptyState Component
            </h2>
            <div className="flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-2 border p-8 rounded-xl bg-slate-50">
                <EmptyState />
              </div>
            </div>
          </section>

          {/* Toast Component */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Toast Component
            </h2>
            <div className="flex flex-wrap items-end gap-8">
              <Button onClick={() => toast('이것은 토스트 메시지입니다!')}>
                토스트 띄우기
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Toaster />
    </div>
  );
}
