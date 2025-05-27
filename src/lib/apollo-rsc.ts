import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { registerApolloClient } from '@apollo/client-integration-nextjs';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  // 서버 사이드에서는 절대 URL이 필요
  const getGraphQLUrl = () => {
    // 개발 환경
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000/api/graphql';
    }

    // 커스텀 도메인이 있는 경우 (가장 우선순위)
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/graphql`;
      console.log('Using custom site URL:', url);
      return url;
    }

    // Vercel 배포 환경
    const vercelUrl = process.env.VERCEL_URL;
    if (vercelUrl) {
      const url = `https://${vercelUrl}/api/graphql`;
      console.log('Using Vercel URL:', url);
      return url;
    }

    // 절대 URL로 설정된 GRAPHQL_URL
    if (process.env.GRAPHQL_URL && process.env.GRAPHQL_URL.startsWith('http')) {
      console.log('Using custom GRAPHQL_URL:', process.env.GRAPHQL_URL);
      return process.env.GRAPHQL_URL;
    }

    // 최후의 수단 - 에러를 발생시켜서 문제를 명확히 함
    const errorMsg = 'No valid GraphQL URL found. Please set NEXT_PUBLIC_SITE_URL or VERCEL_URL environment variable.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  };

  const uri = getGraphQLUrl();
  console.log('Final Apollo Client URI:', uri);

  return new ApolloClient({
    cache: new InMemoryCache(),
    uri,
    // 에러 처리 개선
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  });
});
