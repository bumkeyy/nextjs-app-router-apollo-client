'use client';

import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export default function UsersPage() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p className="p-4">로딩 중...</p>;
  if (error) return <p className="p-4">에러: {error.message}</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">사용자 목록</h1>
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          홈으로 돌아가기
        </Link>
      </div>
      <ul className="space-y-2">
        {data.users.map((user) => (
          <li key={user.id} className="p-3 border rounded">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
