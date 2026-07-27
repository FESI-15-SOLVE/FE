'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CreateButton } from '@/components/ui/button';
import { SocialButton } from '@/components/ui/button';
import { UtilityButton } from '@/components/ui/button';
import { EditButton } from '@/components/ui/button';
import { DeleteButton } from '@/components/ui/button';
import { CreateMeetingModal } from '@/features/meeting/components/create-meeting';
import { RegionSelectModal } from '@/features/meeting/components/region-select';
import { WriteReviewModal } from '@/features/review/components';
import { ProfileModal } from '@/features/profile/components';
import {
  InformationCard,
  DetailCard,
  GroupCard,
  PersonnelContainer,
} from '@/features/meeting/components/cards';
import { AlertModal } from '@/components/ui/alert-modal';
import { Badge, StatusBadge, CountBadge } from '@/components/ui/badge';
import { Calendar, DatePicker, TimePicker } from '@/components/ui/calendar';
import { EmptyState } from '@/components/ui/empty';
import { Progress, ProgressBar } from '@/components/ui/progress';
import { RatingDisplay, RatingInput } from '@/components/ui/rating';
import { Tag } from '@/components/ui/tag';
import { toast, Toaster } from '@/components/ui/toast';
import {
  Input,
  InputField,
  TextArea,
  TextAreaField,
  FileInput,
} from '@/components/ui/Input';

import imgCategoryBusiness from '@/assets/imgs/img_category_business.svg';
import imgCategoryEtc from '@/assets/imgs/img_category_etc.svg';
import imgCategoryFamily from '@/assets/imgs/img_category_family.svg';
import imgCategoryHobby from '@/assets/imgs/img_category_hobby.svg';
import imgCategorySports from '@/assets/imgs/img_category_sports.svg';
import imgCategoryStudy from '@/assets/imgs/img_category_study.svg';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-8">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center py-16 px-8 bg-white rounded-2xl shadow-sm dark:bg-zinc-900">
        <h1 className="text-3xl font-bold mb-12">Components Preview</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-orange-600 px-4 py-2 text-white font-medium hover:bg-orange-700"
          >
            모임 만들기
          </button>

          <button
            onClick={() => setRegionModalOpen(true)}
            className="rounded-lg bg-brand-600 px-4 py-2 text-white font-medium hover:bg-brand-700"
          >
            지역 선택 ({selectedRegion || '선택 안됨'})
          </button>

          <button
            onClick={() => setReviewModalOpen(true)}
            className="rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700"
          >
            리뷰 쓰기 모달
          </button>

          <button
            onClick={() => setAlertModalOpen(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700"
          >
            얼럿 모달
          </button>

          <button
            onClick={() => setProfileModalOpen(true)}
            className="rounded-lg bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700"
          >
            프로필 모달
          </button>
        </div>

        <CreateMeetingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={(values) => {
            console.log('Submitted:', values);
            setModalOpen(false);
          }}
          categories={[
            {
              id: 'business',
              name: '비즈니스',
              imageSrc: imgCategoryBusiness.src,
            },
            { id: 'study', name: '스터디', imageSrc: imgCategoryStudy.src },
            { id: 'sports', name: '스포츠', imageSrc: imgCategorySports.src },
            { id: 'family', name: '가족', imageSrc: imgCategoryFamily.src },
            { id: 'hobby', name: '취미', imageSrc: imgCategoryHobby.src },
            { id: 'etc', name: '기타', imageSrc: imgCategoryEtc.src },
          ]}
        />

        <RegionSelectModal
          isOpen={regionModalOpen}
          onClose={() => setRegionModalOpen(false)}
          selectedRegion={selectedRegion}
          onSelect={(region) => {
            console.log('Selected region:', region);
            setSelectedRegion(region);
          }}
        />

        <WriteReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          onSubmitReview={(data) => {
            console.log('Submitted review:', data);
          }}
        />

        <AlertModal
          isOpen={alertModalOpen}
          onOpenChange={setAlertModalOpen}
          title="로그인이 필요한 서비스입니다."
          onCancel={() => setAlertModalOpen(false)}
          onConfirm={() => {
            console.log('Confirmed');
            setAlertModalOpen(false);
          }}
        />

        <ProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          userId={1}
        />

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

          {/* Input Components */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Input Components
            </h2>
            <div className="flex flex-col gap-8 max-w-md w-full">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  Basic Input (Large)
                </span>
                <Input placeholder="Placeholder..." inputSize="lg" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  Basic Input (Small)
                </span>
                <Input placeholder="Placeholder..." inputSize="sm" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  Input with Right Icon
                </span>
                <Input
                  placeholder="Password"
                  rightIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  InputField with Label
                </span>
                <InputField
                  label="Email"
                  required
                  error="We'll never share your email with anyone else."
                >
                  <Input placeholder="Enter your email" required />
                </InputField>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  InputField (Destructive/Error)
                </span>
                <InputField
                  label="Username"
                  error="This username is already taken."
                >
                  <Input
                    placeholder="Enter username"
                    destructive
                    rightIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-error-500"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    }
                  />
                </InputField>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  InputField (Disabled)
                </span>
                <InputField label="Disabled Input">
                  <Input placeholder="Cannot type here" disabled />
                </InputField>
              </div>

              {/* Text Area */}
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-sm text-gray-500">TextAreaField</span>
                <TextAreaField
                  label="Description"
                  placeholder="Enter a description..."
                  helperText="Provide detailed information."
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  TextAreaField (Destructive)
                </span>
                <TextAreaField
                  label="Description"
                  placeholder="Enter a description..."
                  destructive
                  helperText="Description is too short."
                />
              </div>

              {/* File Input */}
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-sm text-gray-500">
                  FileInput (Default)
                </span>
                <FileInput />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">FileInput (Small)</span>
                <FileInput size="sm" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  FileInput (Disabled)
                </span>
                <FileInput disabled />
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

          {/* Information Card Component */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Information Card
            </h2>
            <div className="flex flex-col gap-8 items-start bg-gray-100 p-8 rounded-xl w-full overflow-hidden">
              <InformationCard
                meeting={{
                  id: '1',
                  title: '작은 독서 습관 만들기',
                  date: '1월 7일',
                  time: '17:30',
                  location: '중구',
                  category: '취미/여가',
                  deadlineTag: '오늘 21시 마감',
                  isSaved: false,
                }}
                isHost={false}
                onClick={() => console.log('Card clicked')}
                onSaveClick={() => console.log('Save clicked')}
                onJoinClick={() => console.log('Join clicked')}
              />
              <InformationCard
                meeting={{
                  id: '2',
                  title: '주말 풋살 모임',
                  date: '2월 10일',
                  time: '09:00',
                  location: '강남구',
                  category: '스포츠',
                  isSaved: true,
                }}
                isHost={true}
                onClick={() => console.log('Card clicked')}
                onSaveClick={() => console.log('Save clicked')}
                onJoinClick={() => console.log('Join clicked')}
                onOptionsClick={() => console.log('Options clicked')}
              />
            </div>
          </section>

          {/* Detail Card Component */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Detail Card
            </h2>
            <div className="flex flex-col gap-8 items-start bg-gray-100 p-4 sm:p-8 rounded-xl w-full overflow-hidden">
              <DetailCard
                meeting={{
                  id: '1',
                  title: '작은 독서 습관 만들기',
                  imageUrl: imgCategoryBusiness.src,
                  location: '중구',
                  date: '1월 7일',
                  time: '17:30',
                  participantCount: 5,
                  maxParticipant: 10,
                  isSaved: false,
                }}
                badgeStatuses={['upcoming', 'confirmed']}
                actionStatus="reserved"
                onActionClick={() => console.log('Action clicked')}
                onSaveClick={() => console.log('Save clicked')}
              />
            </div>
          </section>

          {/* Group Card Component */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Group Card
            </h2>
            <div className="flex flex-col gap-8 items-start bg-gray-100 p-4 sm:p-8 rounded-xl w-full overflow-hidden">
              <GroupCard
                meeting={{
                  id: '1',
                  title: '달램핏 오피스 스트레칭',
                  imageUrl: imgCategoryBusiness.src,
                  location: '을지로 3가',
                  category: '운동/건강',
                  date: '1월 7일',
                  time: '17:30',
                  deadlineTag: '오늘 21시 마감',
                  participantCount: 12,
                  maxParticipant: 20,
                  isFavorited: false,
                }}
                isConfirmed={true}
                isClosed={false}
                onJoinClick={() => console.log('Join clicked')}
                onSaveClick={() => console.log('Save clicked')}
              />
              <GroupCard
                meeting={{
                  id: '2',
                  title: '달램핏 오피스 스트레칭 (마감)',
                  imageUrl: imgCategoryBusiness.src,
                  location: '을지로 3가',
                  category: '운동/건강',
                  date: '1월 7일',
                  time: '17:30',
                  participantCount: 20,
                  maxParticipant: 20,
                  isFavorited: true,
                }}
                isClosed={true}
              />
            </div>
          </section>

          {/* Personnel Container Component */}
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">
              Personnel Container
            </h2>
            <div className="flex flex-col gap-8 items-start bg-slate-100 p-4 sm:p-8 rounded-xl w-full overflow-hidden">
              <div className="flex flex-col gap-4 w-full">
                <span className="text-sm text-slate-500">
                  Example 1 (Confirmed, 16 participants)
                </span>
                <PersonnelContainer
                  currentParticipant={16}
                  minParticipant={5}
                  maxParticipant={20}
                  isConfirmed={true}
                  participantImages={[
                    imgCategoryBusiness.src,
                    imgCategoryBusiness.src,
                    imgCategoryBusiness.src,
                    imgCategoryBusiness.src,
                    imgCategoryBusiness.src,
                    imgCategoryBusiness.src,
                  ]}
                />
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-sm text-slate-500">
                  Example 2 (Unconfirmed, 3 participants)
                </span>
                <PersonnelContainer
                  currentParticipant={3}
                  minParticipant={5}
                  maxParticipant={20}
                  isConfirmed={false}
                  participantImages={[
                    imgCategoryBusiness.src,
                    imgCategoryBusiness.src,
                  ]}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Toaster />
      <FileInput />
    </div>
  );
}
