import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 p-8 text-center">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          랜딩 페이지 개발 중입니다
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          더 멋진 모습으로 찾아뵙겠습니다. <br />
          아래 버튼을 클릭하여 등록된 모임들을 둘러보세요!
        </p>
        <Link
          href="/meetings"
          className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
        >
          모임 둘러보기
        </Link>
      </div>
    </div>
  );
}
