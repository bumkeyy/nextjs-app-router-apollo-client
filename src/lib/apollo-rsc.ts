import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { registerApolloClient } from '@apollo/client-integration-nextjs';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  // 서버 사이드에서는 절대 URL이 필요
  const getGraphQLUrl = () => {
    // 개발 환경
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000/api/graphql';
    }

    // Vercel 배포 환경
    if (process.env.VERCEL_URL) {
      const url = `https://${process.env.VERCEL_URL}/api/graphql`;
      console.log('Using Vercel URL:', url);
      return url;
    }

    // 기타 배포 환경 (커스텀 도메인)
    if (process.env.GRAPHQL_URL && process.env.GRAPHQL_URL.startsWith('http')) {
      console.log('Using custom GRAPHQL_URL:', process.env.GRAPHQL_URL);
      return process.env.GRAPHQL_URL;
    }

    // 클라이언트 사이드 fallback
    const fallbackUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || '/api/graphql';
    console.log('Using fallback URL:', fallbackUrl);
    return fallbackUrl;
  };

  const uri = getGraphQLUrl();
  console.log('Apollo Client URI:', uri);

  return new ApolloClient({
    cache: new InMemoryCache(),
    uri,
  });
});
