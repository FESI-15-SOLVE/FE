import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { GlobalNavigationBar } from '@/components/layout/gnb';
import { QueryProvider } from '@/providers/query-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from '@/components/ui/toast/toaster';

import { LoginAlertModal } from '@/components/ui/login-alert-modal';

import { getMyProfileAction } from '@/actions/auth/auth-actions';
import { AuthProvider } from '@/providers/auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: '같이달램',
    template: '%s | 같이달램',
  },
  description: '취향이 통하는 사람들과 함께하는 온·오프라인 모임 커뮤니티',
  openGraph: {
    title: '같이달램',
    description: '취향이 통하는 사람들과 함께하는 온·오프라인 모임 커뮤니티',
    type: 'website',
    siteName: '같이달램',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SSR 단계에서 서버용 API를 통해 유저 정보 가져오기
  const userResult = await getMyProfileAction();
  const initialUser = userResult?.data || null;

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider initialUser={initialUser}>
            <GlobalNavigationBar initialUser={initialUser} />

            <main className="flex-1 flex flex-col w-full">
              <NuqsAdapter>{children}</NuqsAdapter>
            </main>

            <LoginAlertModal />
          </AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
