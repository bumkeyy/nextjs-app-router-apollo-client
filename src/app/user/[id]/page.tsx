import { Suspense } from 'react';
import { PreloadQuery } from '@/lib/apollo-rsc';
import { GET_USER } from '@/lib/queries';
import UserDetail from './user-detail';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 로딩 컴포넌트 - 새로운 스타일에 맞게 업데이트
function UserPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="h-6 bg-gray-200/60 rounded-lg w-48 animate-pulse"></div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        {/* 헤더 스켈레톤 */}
        <div className="bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border-b border-blue-200/20 p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-10 bg-gray-200/60 rounded-lg w-3/4 mb-3 animate-pulse"></div>
              <div className="h-6 bg-gray-200/60 rounded-lg w-1/2 mb-4 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-7 bg-gray-200/60 rounded-full w-32 animate-pulse"></div>
                <div className="h-7 bg-gray-200/60 rounded-full w-24 animate-pulse"></div>
              </div>
            </div>
            <div className="w-20 h-20 bg-gray-200/60 rounded-2xl animate-pulse"></div>
          </div>
        </div>

        {/* 컨텐츠 스켈레톤 */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 사용자 정보 스켈레톤 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-50/60 rounded-xl p-4 border border-gray-200/30">
                    <div className="h-4 bg-gray-200/60 rounded w-1/3 mb-3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200/60 rounded w-2/3 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* 사이드바 스켈레톤 */}
            <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/60 rounded-xl p-6 border border-blue-200/20">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-200/60 rounded-lg mr-3 animate-pulse"></div>
                <div className="h-6 bg-gray-200/60 rounded w-1/2 animate-pulse"></div>
              </div>

              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 bg-gray-200/60 rounded-full mr-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200/60 rounded flex-1 animate-pulse"></div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-white/40 rounded-lg border border-blue-200/20">
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-3 bg-gray-200/60 rounded w-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 로딩 표시기 */}
      <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-gray-700">사용자 정보 로딩 중...</span>
        </div>
      </div>
    </div>
  );
}

// Server Component - SSR을 위한 메인 페이지
export default async function UserPage({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <PreloadQuery query={GET_USER} variables={{ id: resolvedParams.id }}>
      <Suspense fallback={<UserPageSkeleton />}>
        <UserDetail userId={resolvedParams.id} />
      </Suspense>
    </PreloadQuery>
  );
}
