'use client';

import { useSuspenseQuery } from '@apollo/client';
import { GET_USERS } from '@/lib/queries';
import { GetUsersData } from '@/lib/types';

export function UsersList() {
  const { data } = useSuspenseQuery<GetUsersData>(GET_USERS);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">사용자 목록</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{user.name}</h3>
            <p className="text-gray-600 mb-1">이메일: {user.email}</p>
            {user.age && <p className="text-gray-600">나이: {user.age}세</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
