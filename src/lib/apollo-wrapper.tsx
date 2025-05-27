'use client';
// ^ 이 파일은 "use client" pragma가 필요합니다

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { makeClient } from './apollo-client';

// 앱을 감싸는 컴포넌트
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
