import { HttpLink } from "@apollo/client"
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs"

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // 절대 URL 사용 (SSR에서는 상대 URL 사용 불가)
      uri: process.env.NODE_ENV === 'development' 
        ? "http://localhost:3000/api/graphql"
        : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/graphql`,
      fetchOptions: {
        // Next.js fetch 옵션 설정
        cache: 'no-store', // 개발 중에는 캐시 비활성화
      },
    }),
  })
}) 