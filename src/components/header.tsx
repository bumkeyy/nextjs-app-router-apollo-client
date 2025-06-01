'use client';

import { usePathname } from 'next/navigation';
import { useQuery } from '@apollo/client';
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

export default function Header() {
  const pathname = usePathname();

  // 경로에서 유저 아이디 추출 (/user/[id] 형태)
  const userIdMatch = pathname.match(/\/user\/(\w+)/);
  const userId = userIdMatch ? userIdMatch[1] : null;

  // 유저 아이디가 있을 때만 쿼리 실행
  const { data, loading, error } = useQuery<GetUserData, GetUserVars>(GET_USER, {
    variables: { id: userId! },
    skip: !userId, // userId가 없으면 쿼리 실행하지 않음
  });

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고/홈 링크 */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
              GraphQL App
            </Link>
          </div>

          {/* 네비게이션 */}
          <nav className="flex items-center space-x-6">
            <Link href="/users" className="text-gray-600 hover:text-gray-900 transition-colors">
              사용자 목록
            </Link>
            <Link href="/posts" className="text-gray-600 hover:text-gray-900 transition-colors">
              게시글 목록
            </Link>
          </nav>

          {/* 유저 정보 표시 영역 */}
          <div className="flex items-center">
            {userId && (
              <div className="bg-gray-50 px-3 py-2 rounded-lg">
                {loading && <span className="text-gray-500 text-sm">유저 정보 로딩 중...</span>}
                {error && <span className="text-red-500 text-sm">오류: {error.message}</span>}
                {data?.user && (
                  <div className="text-sm">
                    <span className="text-gray-600">현재 보고 있는 사용자:</span> <span className="font-medium text-gray-900">{data.user.name}</span>
                    <span className="text-gray-500 ml-2">({data.user.email})</span>
                  </div>
                )}
                {data && !data.user && <span className="text-orange-500 text-sm">사용자를 찾을 수 없습니다 (ID: {userId})</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
