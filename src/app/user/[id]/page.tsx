import { Suspense } from 'react';
import { PreloadQuery } from '@/lib/apollo-rsc';
import { GET_USER } from '@/lib/queries';
import UserDetail from './user-detail';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 로딩 컴포넌트
function UserPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-1 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              ))}
            </div>
          </div>
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
