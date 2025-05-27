'use client';
// ^ 이 파일은 "use client" pragma가 필요합니다

import { HttpLink } from '@apollo/client';
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

// 클라이언트를 생성하는 함수
function makeClient() {
  const httpLink = new HttpLink({
    // 절대 URL 사용 (SSR에서는 상대 URL 사용 불가)
    uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/graphql' : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/graphql`,
    fetchOptions: {
      // Next.js fetch 옵션 설정
      cache: 'no-store', // 개발 중에는 캐시 비활성화
    },
  });

  // "@apollo/client-integration-nextjs"의 ApolloClient 사용
  return new ApolloClient({
    // "@apollo/client-integration-nextjs"의 InMemoryCache 사용
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

// 앱을 감싸는 컴포넌트
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
