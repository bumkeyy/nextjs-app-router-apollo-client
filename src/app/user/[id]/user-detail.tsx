'use client';

import { useSuspenseQuery } from '@apollo/client';
import { GET_USER } from '@/lib/queries';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

interface GetUserData {
  user: User | null;
}

interface GetUserVars {
  id: string;
}

interface UserDetailProps {
  userId: string;
}

export default function UserDetail({ userId }: UserDetailProps) {
  // useSuspenseQuery는 PreloadQuery로 미리 로드된 데이터를 사용하므로
  // 추가적인 네트워크 요청 없이 데이터를 즉시 반환합니다
  const { data } = useSuspenseQuery<GetUserData, GetUserVars>(GET_USER, { variables: { id: userId } });

  // useSuspenseQuery는 로딩 상태가 없고, 에러는 Error Boundary로 처리됩니다
  if (!data?.user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-50/90 backdrop-blur-sm border border-yellow-200 rounded-xl shadow-lg p-6">
          <h1 className="text-xl font-bold text-yellow-800 mb-2">사용자를 찾을 수 없습니다</h1>
          <p className="text-yellow-600">ID: {userId}</p>
          <Link href="/users" className="inline-block mt-4 text-blue-600 hover:text-blue-800 transition-colors">
            ← 사용자 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const { user } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/users" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          사용자 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-blue-200/30 p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-600 text-lg mb-3">사용자 상세 정보</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-green-600 bg-green-50/80 px-3 py-1 rounded-full font-medium border border-green-200/50">✨ SSR + useSuspenseQuery</span>
                <span className="text-sm text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full font-medium border border-blue-200/50">🚀 PreloadQuery</span>
              </div>
            </div>

            {/* 사용자 아바타 */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">{user.name.charAt(0).toUpperCase()}</div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 사용자 정보 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/50">
                  <label className="block text-sm font-medium text-gray-500 mb-2">사용자 ID</label>
                  <p className="text-lg font-semibold text-gray-900">{user.id}</p>
                </div>

                <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/50">
                  <label className="block text-sm font-medium text-gray-500 mb-2">이름</label>
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                </div>

                <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/50">
                  <label className="block text-sm font-medium text-gray-500 mb-2">이메일</label>
                  <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>

                {user.age && (
                  <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/50">
                    <label className="block text-sm font-medium text-gray-500 mb-2">나이</label>
                    <p className="text-lg font-semibold text-gray-900">{user.age}세</p>
                  </div>
                )}
              </div>
            </div>

            {/* SSR 정보 카드 */}
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-xl p-6 border border-blue-200/30 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">기술 스택</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Server-Side Rendering 활성화
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  PreloadQuery로 데이터 사전 로드
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  useSuspenseQuery로 즉시 렌더링
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Error Boundary로 에러 처리
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  SEO 최적화 및 성능 향상
                </div>
              </div>

              <div className="mt-6 p-3 bg-white/60 rounded-lg border border-blue-200/30">
                <p className="text-xs text-gray-600 leading-relaxed">이 페이지는 Next.js App Router의 최신 기능과 Apollo Client의 PreloadQuery + useSuspenseQuery 패턴을 활용하여 최적의 성능을 제공합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
