'use client';

import { useSuspenseQuery } from '@apollo/client';
import { GET_USERS } from '@/lib/queries';
import { GetUsersData } from '@/lib/types';
import Link from 'next/link';

export function UsersList() {
  const { data } = useSuspenseQuery<GetUsersData>(GET_USERS);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">사용자 목록</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.users.map((user) => (
          <Link key={user.id} href={`/user/${user.id}`} className="block bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-all hover:border-blue-300 group">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{user.name}</h3>
            <p className="text-gray-600 mb-1">이메일: {user.email}</p>
            {user.age && <p className="text-gray-600">나이: {user.age}세</p>}
            <div className="mt-3 text-sm text-blue-600 group-hover:text-blue-800">상세 정보 보기 →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
