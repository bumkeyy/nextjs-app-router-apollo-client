'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function UserError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (실제 환경에서는 에러 리포팅 서비스 사용)
    console.error('User page error:', error);
  }, [error]);

  const isGraphQLError = error.message.includes('GraphQL');
  const isNetworkError = error.message.includes('fetch') || error.message.includes('network');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold text-red-800">{isGraphQLError ? 'GraphQL 오류' : isNetworkError ? '네트워크 오류' : '페이지 로딩 오류'}</h1>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-red-700 mb-2">
            {isGraphQLError && '서버에서 데이터를 가져오는 중 문제가 발생했습니다.'}
            {isNetworkError && '네트워크 연결에 문제가 있습니다.'}
            {!isGraphQLError && !isNetworkError && '예상치 못한 오류가 발생했습니다.'}
          </p>

          <details className="text-sm text-red-600">
            <summary className="cursor-pointer hover:text-red-800">기술적 상세 정보 (개발자용)</summary>
            <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        </div>

        <div className="flex gap-4">
          <button onClick={reset} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
            다시 시도
          </button>

          <Link href="/users" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
            사용자 목록으로 돌아가기
          </Link>

          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            홈으로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
