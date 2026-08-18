import { ProfileCard } from '@/features/profile/components/profile-card';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6 lg:text-3xl">
        마이페이지
      </h1>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {/* Profile Card (Left column on desktop, top banner on mobile/tablet) */}
        <ProfileCard />

        {/* Main Content Area */}
        {children}
      </div>
    </main>
  );
}
