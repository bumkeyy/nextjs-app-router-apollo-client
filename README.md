# Next.js App Router + Apollo Client + RSC 테스트 프로젝트

이 프로젝트는 Next.js App Router와 Apollo Client를 사용하여 React Server Components(RSC)에서 `PreloadQuery`가 데이터를 `useSuspenseQuery`로 잘 전달하는지 실험하는 테스트 환경입니다.

## 🚀 기술 스택

- **Next.js 15** (App Router)
- **Apollo Client** with Next.js integration (`@apollo/client-integration-nextjs`)
- **GraphQL Yoga** (서버)
- **TypeScript**
- **Tailwind CSS**

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

서버가 실행되면 http://localhost:3000 에서 확인할 수 있습니다.

## 🧪 테스트 내용

### 1. PreloadQuery + useSuspenseQuery 패턴

**위치**: `/` (메인 페이지)

- **RSC에서**: `PreloadQuery` 컴포넌트를 사용하여 GraphQL 쿼리를 미리 실행
- **클라이언트 컴포넌트에서**: `useSuspenseQuery`를 사용하여 서버에서 미리 로드된 데이터 사용
- **테스트 쿼리**:
  - `GET_POSTS` - 게시글 목록
  - `GET_USERS` - 사용자 목록

### 2. PreloadQuery + queryRef + useReadQuery 패턴

**위치**: `/queryref-test`

- **RSC에서**: `PreloadQuery`에서 render prop을 사용하여 `queryRef` 생성
- **클라이언트 컴포넌트에서**: `useReadQuery`를 사용하여 `queryRef`로부터 데이터 읽기
- **테스트 쿼리**:
  - `GET_POST` - 개별 게시글 상세 정보 (변수 포함)

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── api/graphql/route.ts      # GraphQL Yoga API 라우트
│   ├── queryref-test/page.tsx    # QueryRef 패턴 테스트 페이지
│   ├── layout.tsx                # 루트 레이아웃 (Apollo Wrapper 포함)
│   └── page.tsx                  # 메인 페이지 (PreloadQuery 테스트)
├── components/
│   ├── post-detail.tsx           # useReadQuery 사용 컴포넌트
│   ├── posts-list.tsx            # useSuspenseQuery 사용 컴포넌트
│   └── users-list.tsx            # useSuspenseQuery 사용 컴포넌트
└── lib/
    ├── apollo-rsc.ts             # RSC용 Apollo Client 설정
    ├── apollo-wrapper.tsx        # 클라이언트용 Apollo Provider
    ├── queries.ts                # GraphQL 쿼리 정의
    └── types.ts                  # TypeScript 타입 정의
```

## 🔧 Apollo Client 설정

### RSC용 설정 (`apollo-rsc.ts`)

```typescript
export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
      fetchOptions: { cache: 'no-store' },
    }),
  });
});
```

### 클라이언트용 설정 (`apollo-wrapper.tsx`)

```typescript
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
```

## 📊 GraphQL 스키마

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: String!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
  post(id: ID!): Post
}
```

## 🎯 테스트 목표

1. **데이터 전달 확인**: RSC에서 PreloadQuery로 로드한 데이터가 클라이언트 컴포넌트로 올바르게 전달되는지
2. **성능 최적화**: 클라이언트에서 추가 네트워크 요청 없이 데이터를 사용할 수 있는지
3. **Suspense 동작**: 로딩 상태가 올바르게 처리되는지
4. **타입 안전성**: TypeScript와 함께 사용할 때 타입 추론이 올바르게 작동하는지

## 🔍 GraphQL Playground

개발 환경에서는 http://localhost:3000/api/graphql 에서 GraphQL Playground를 사용할 수 있습니다.

## 📝 주요 특징

- ✅ **SSR 호환**: 서버 사이드 렌더링과 완전 호환
- ✅ **타입 안전**: TypeScript로 완전한 타입 안전성 제공
- ✅ **최적화된 데이터 로딩**: 서버에서 미리 로드하여 클라이언트 성능 향상
- ✅ **Suspense 지원**: React Suspense와 완벽 통합
- ✅ **두 가지 패턴**: useSuspenseQuery와 useReadQuery 패턴 모두 지원

## 🤝 기여

이 프로젝트는 Apollo Client와 Next.js App Router의 통합을 테스트하기 위한 실험적 프로젝트입니다. 개선사항이나 버그를 발견하시면 이슈를 등록해 주세요.
