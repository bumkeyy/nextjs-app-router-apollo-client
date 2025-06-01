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
      <div className="bg-red-50/90 backdrop-blur-sm border border-red-200/50 rounded-2xl shadow-xl overflow-hidden">
        {/* 에러 헤더 */}
        <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border-b border-red-200/30 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-red-800">{isGraphQLError ? 'GraphQL 오류' : isNetworkError ? '네트워크 오류' : '페이지 로딩 오류'}</h1>
              <p className="text-red-600 mt-1">사용자 페이지를 로드하는 중 문제가 발생했습니다</p>
            </div>
          </div>
        </div>

        {/* 에러 내용 */}
        <div className="p-6">
          <div className="mb-6">
            <div className="bg-white/60 rounded-xl p-4 border border-red-200/30">
              <p className="text-red-700 font-medium mb-2">
                {isGraphQLError && '🔌 서버에서 데이터를 가져오는 중 문제가 발생했습니다.'}
                {isNetworkError && '📡 네트워크 연결에 문제가 있습니다.'}
                {!isGraphQLError && !isNetworkError && '⚠️ 예상치 못한 오류가 발생했습니다.'}
              </p>
              <p className="text-red-600 text-sm">아래 해결 방법을 시도해보세요. 문제가 지속되면 관리자에게 문의하세요.</p>
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer hover:text-red-800 text-red-700 font-medium bg-red-100/50 px-4 py-2 rounded-lg border border-red-200/50 inline-block">🔍 기술적 상세 정보 (개발자용)</summary>
              <div className="mt-3 bg-gray-900/90 backdrop-blur-sm text-green-400 text-xs p-4 rounded-xl border border-gray-700 overflow-auto">
                <pre className="whitespace-pre-wrap">
                  <strong>Error Message:</strong>
                  {error.message}

                  {error.digest && (
                    <>
                      <br />
                      <br />
                      <strong>Error Digest:</strong>
                      {error.digest}
                    </>
                  )}

                  <br />
                  <br />
                  <strong>Stack Trace:</strong>
                  {error.stack || 'Stack trace not available'}
                </pre>
              </div>
            </details>
          </div>

          {/* 해결 방법 제안 */}
          <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-200/30 mb-6">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              해결 방법
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• 페이지를 새로고침하거나 다시 시도 버튼을 클릭하세요</p>
              <p>• 인터넷 연결을 확인해보세요</p>
              <p>• 잠시 후 다시 시도해보세요</p>
              <p>• 문제가 지속되면 다른 사용자 페이지를 방문해보세요</p>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              다시 시도
            </button>

            <Link
              href="/users"
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              사용자 목록
            </Link>

            <Link
              href="/"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              홈으로 가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
