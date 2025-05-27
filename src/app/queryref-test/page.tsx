import { Suspense } from 'react';
import { PreloadQuery } from '@/lib/apollo-rsc';
import { GET_POST } from '@/lib/queries';
import { PostDetail } from '@/components/post-detail';

export default function QueryRefTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">QueryRef 패턴 테스트</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            <code className="bg-gray-200 px-2 py-1 rounded">PreloadQuery</code>에서
            <code className="bg-gray-200 px-2 py-1 rounded">queryRef</code>를 받아 클라이언트 컴포넌트로 전달하는 패턴을 테스트합니다.
          </p>
        </div>

        <div className="space-y-8">
          {/* 첫 번째 게시글 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">게시글 #1</h2>
            <PreloadQuery query={GET_POST} variables={{ id: '1' }}>
              {(queryRef) => (
                <Suspense
                  fallback={
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-gray-600">게시글을 불러오는 중...</p>
                    </div>
                  }
                >
                  <PostDetail queryRef={queryRef} />
                </Suspense>
              )}
            </PreloadQuery>
          </section>

          {/* 두 번째 게시글 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">게시글 #2</h2>
            <PreloadQuery query={GET_POST} variables={{ id: '2' }}>
              {(queryRef) => (
                <Suspense
                  fallback={
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      <p className="mt-2 text-gray-600">게시글을 불러오는 중...</p>
                    </div>
                  }
                >
                  <PostDetail queryRef={queryRef} />
                </Suspense>
              )}
            </PreloadQuery>
          </section>
        </div>

        {/* 설명 섹션 */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">QueryRef 패턴 설명</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>1. QueryRef 패턴:</strong> <code className="bg-gray-100 px-1 rounded">PreloadQuery</code>에서 render prop을 사용하여 <code className="bg-gray-100 px-1 rounded">queryRef</code>를 받습니다.
            </p>
            <p>
              <strong>2. useReadQuery:</strong> 클라이언트 컴포넌트에서
              <code className="bg-gray-100 px-1 rounded">useReadQuery</code>를 사용하여
              <code className="bg-gray-100 px-1 rounded">queryRef</code>로부터 데이터를 읽습니다.
            </p>
            <p>
              <strong>3. 장점:</strong> 동일한 쿼리를 여러 번 사용할 때 각각 다른 변수로 독립적인 <code className="bg-gray-100 px-1 rounded">queryRef</code>를 생성할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            메인 페이지로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
