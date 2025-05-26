import { ApolloServer } from 'apollo-server-micro';
import { gql } from 'graphql-tag';
import { NextResponse } from 'next/server';

// GraphQL 스키마 정의
const typeDefs = gql`
  type Query {
    hello: String
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

// 리졸버 함수 정의
const resolvers = {
  Query: {
    hello: () => '안녕하세요, Next.js App Router + Apollo Client!',
    users: () => [
      { id: '1', name: '홍길동', email: 'hong@example.com' },
      { id: '2', name: '김철수', email: 'kim@example.com' },
      { id: '3', name: '이영희', email: 'lee@example.com' },
    ],
  },
};

// Apollo Server 인스턴스 생성
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// 서버 시작
const startServer = apolloServer.start();

export async function POST(request) {
  await startServer;

  const requestBody = await request.json();

  const { data } = await apolloServer.executeOperation({
    query: requestBody.query,
    variables: requestBody.variables,
  });

  return NextResponse.json({ data });
}

// OPTIONS 요청 처리 (CORS 지원)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
