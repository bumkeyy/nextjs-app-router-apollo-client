import { Metadata } from 'next';

interface UserLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: UserLayoutProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `사용자 ${id} - GraphQL App`,
    description: `사용자 ${id}의 상세 정보를 확인하세요.`,
    openGraph: {
      title: `사용자 ${id} - GraphQL App`,
      description: `사용자 ${id}의 상세 정보를 확인하세요.`,
    },
  };
}

export default async function UserLayout({ children, params }: UserLayoutProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 유저 페이지 전용 헤더 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200/50 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">사용자 상세 페이지</h2>
                <p className="text-sm text-gray-600">ID: {id}</p>
              </div>
            </div>

            {/* 페이지 표시기 */}
            <div className="hidden sm:flex items-center space-x-2">
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">SSR 렌더링</span>
              <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Apollo GraphQL</span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="relative">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* 플로팅 요소들 */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-indigo-200/25 rounded-full blur-xl"></div>

        {/* 컨텐츠 */}
        <div className="relative z-10">{children}</div>
      </div>

      {/* 유저 페이지 푸터 */}
      <footer className="mt-12 border-t border-blue-200/50 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-2 sm:mb-0">🚀 Next.js App Router + Apollo Client + PreloadQuery</div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>SSR 최적화</span>
              <span>•</span>
              <span>useSuspenseQuery</span>
              <span>•</span>
              <span>Error Boundary</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// CSS-in-JS 스타일을 위한 글로벌 스타일 (선택사항)
// 또는 tailwind.config.js에서 bg-grid-pattern을 정의할 수 있습니다
