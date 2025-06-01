'use client';

import { useQuery } from '@apollo/client';
import { GET_USER } from '@/lib/queries';
import Link from 'next/link';
import { use } from 'react';

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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { data, loading, error } = useQuery<GetUserData, GetUserVars>(GET_USER, {
    variables: { id: resolvedParams.id },
  });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-xl font-bold text-red-800 mb-2">오류 발생</h1>
          <p className="text-red-600">{error.message}</p>
          <Link href="/users" className="inline-block mt-4 text-blue-600 hover:text-blue-800">
            ← 사용자 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h1 className="text-xl font-bold text-yellow-800 mb-2">사용자를 찾을 수 없습니다</h1>
          <p className="text-yellow-600">ID: {resolvedParams.id}</p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">추가 정보</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 이 사용자의 상세 정보를 확인하고 있습니다.</p>
              <p>• Header에서 현재 보고 있는 사용자 정보가 표시됩니다.</p>
              <p>• GraphQL 쿼리를 통해 실시간으로 데이터를 가져옵니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
