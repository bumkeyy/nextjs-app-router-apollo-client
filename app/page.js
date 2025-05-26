'use client';

import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';

const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_HELLO);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Next.js App Router with Apollo Client</h1>
      <div className="p-4 border rounded mb-4">
        <h2 className="text-xl mb-2">GraphQL 응답:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="mt-4">
        <Link href="/users" className="text-blue-500 hover:underline">
          사용자 목록 보기
        </Link>
      </div>
    </main>
  );
}
