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
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h1 className="text-xl font-bold text-yellow-800 mb-2">사용자를 찾을 수 없습니다</h1>
          <p className="text-yellow-600">ID: {userId}</p>
          <Link href="/users" className="inline-block mt-4 text-blue-600 hover:text-blue-800">
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
        <Link href="/users" className="text-blue-600 hover:text-blue-800 flex items-center">
          ← 사용자 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
          <p className="text-gray-600 text-lg">사용자 상세 정보</p>
          <div className="mt-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">✨ SSR + useSuspenseQuery로 렌더링됨</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">사용자 ID</label>
              <p className="text-lg text-gray-900">{user.id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">이름</label>
              <p className="text-lg text-gray-900">{user.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">이메일</label>
              <p className="text-lg text-gray-900">{user.email}</p>
            </div>

            {user.age && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">나이</label>
                <p className="text-lg text-gray-900">{user.age}세</p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">SSR 정보</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 🚀 이 페이지는 Server-Side Rendering으로 렌더링됩니다</p>
              <p>• ⚡ PreloadQuery로 서버에서 데이터를 미리 로드했습니다</p>
              <p>• 🔄 useSuspenseQuery로 추가 요청 없이 데이터 사용</p>
              <p>• 📈 더 빠른 초기 로딩과 SEO 최적화</p>
              <p>• 🎯 Header에서 현재 사용자 정보가 표시됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
