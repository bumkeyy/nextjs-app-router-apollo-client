import { Suspense } from 'react';
import { PreloadQuery } from '@/lib/apollo-rsc';
import { GET_POSTS, GET_USERS } from '@/lib/queries';
import { PostsList } from '@/components/posts-list';
import { UsersList } from '@/components/users-list';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Next.js + Apollo Client + RSC 테스트</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            React Server Components에서 <code className="bg-gray-200 px-2 py-1 rounded">PreloadQuery</code>로 데이터를 미리 로드하고, 클라이언트 컴포넌트에서 <code className="bg-gray-200 px-2 py-1 rounded">useSuspenseQuery</code>로 데이터를 사용하는
            테스트입니다.
          </p>

          {/* 네비게이션 링크 */}
          <div className="mt-6">
            <a href="/queryref-test" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              QueryRef 패턴 테스트 보기
            </a>
          </div>
        </div>

        <div className="space-y-12">
          {/* 게시글 목록 섹션 */}
          <section>
            <PreloadQuery query={GET_POSTS}>
              <Suspense
                fallback={
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">게시글을 불러오는 중...</p>
                  </div>
                }
              >
                <PostsList />
              </Suspense>
            </PreloadQuery>
          </section>

          {/* 사용자 목록 섹션 */}
          <section>
            <PreloadQuery query={GET_USERS}>
              <Suspense
                fallback={
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <p className="mt-2 text-gray-600">사용자를 불러오는 중...</p>
                  </div>
                }
              >
                <UsersList />
              </Suspense>
            </PreloadQuery>
          </section>
        </div>

        {/* 설명 섹션 */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">테스트 설명</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>1. React Server Components (RSC):</strong> 이 페이지는 서버에서 렌더링되며,
              <code className="bg-gray-100 px-1 rounded">PreloadQuery</code> 컴포넌트를 사용하여 GraphQL 쿼리를 미리 실행합니다.
            </p>
            <p>
              <strong>2. 클라이언트 컴포넌트:</strong> <code className="bg-gray-100 px-1 rounded">PostsList</code>와<code className="bg-gray-100 px-1 rounded">UsersList</code> 컴포넌트는 클라이언트에서 실행되며,
              <code className="bg-gray-100 px-1 rounded">useSuspenseQuery</code>를 사용하여 서버에서 미리 로드된 데이터를 가져옵니다.
            </p>
            <p>
              <strong>3. 데이터 흐름:</strong> 서버에서 데이터를 미리 로드 → 클라이언트로 전달 → 클라이언트 컴포넌트에서 추가 네트워크 요청 없이 데이터 사용
            </p>
            <p>
              <strong>4. GraphQL API:</strong> <code className="bg-gray-100 px-1 rounded">/api/graphql</code>
              엔드포인트에서 GraphQL Yoga를 사용하여 API를 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
