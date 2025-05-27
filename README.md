# Next.js + Apollo Client + RSC 테스트 프로젝트

React Server Components(RSC)에서 Apollo Client의 PreloadQuery가 데이터를 useSuspenseQuery로 잘 전달하는지 실험하는 테스트 환경입니다.

## 🚀 기술 스택

- **Next.js 15** (App Router)
- **Apollo Client** with Next.js integration
- **GraphQL Yoga** (API 서버)
- **TypeScript**
- **Tailwind CSS**

## 📋 주요 기능

### 1. PreloadQuery + useSuspenseQuery 패턴

- 서버에서 `PreloadQuery`로 데이터 미리 로드
- 클라이언트 컴포넌트에서 `useSuspenseQuery`로 데이터 사용
- 추가 네트워크 요청 없이 서버에서 클라이언트로 데이터 전달

### 2. QueryRef 패턴

- `PreloadQuery`에서 render prop을 사용하여 `queryRef` 생성
- 클라이언트 컴포넌트에서 `useReadQuery`로 데이터 읽기
- 동일한 쿼리를 다른 변수로 독립적으로 사용 가능

### 3. GraphQL API

- GraphQL Yoga를 사용한 API 라우트
- User, Post 타입 정의
- 가짜 데이터와 리졸버 구현
- 개발 환경에서 GraphQL Playground 제공

## 🛠️ 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── api/graphql/route.ts    # GraphQL API 라우트
│   ├── page.tsx                # 메인 페이지 (PreloadQuery + useSuspenseQuery)
│   ├── queryref-test/page.tsx  # QueryRef 패턴 테스트 페이지
│   └── layout.tsx              # 루트 레이아웃
├── components/
│   ├── posts-list.tsx          # 게시글 목록 컴포넌트
│   ├── users-list.tsx          # 사용자 목록 컴포넌트
│   └── post-detail.tsx         # 게시글 상세 컴포넌트
└── lib/
    ├── apollo-rsc.ts           # RSC용 Apollo Client 설정
    ├── apollo-wrapper.tsx      # 클라이언트용 Apollo Provider
    ├── apollo-client.ts        # 클라이언트용 Apollo Client 설정
    ├── queries.ts              # GraphQL 쿼리 정의
    └── types.ts                # TypeScript 타입 정의
```

## 🌐 배포

### Vercel 배포

1. **GitHub 연결**: 프로젝트를 GitHub에 푸시
2. **Vercel 연결**: [Vercel](https://vercel.com)에서 GitHub 저장소 연결
3. **자동 배포**: 코드 변경 시 자동으로 배포됨

### 환경 변수

배포 시 다음 환경 변수가 자동으로 설정됩니다:

- `NEXT_PUBLIC_GRAPHQL_URL`: `/api/graphql`
- `GRAPHQL_URL`: `/api/graphql`

## 🧪 테스트 페이지

### 메인 페이지 (`/`)

- PreloadQuery + useSuspenseQuery 패턴 테스트
- 게시글 목록과 사용자 목록 표시
- 서버에서 데이터 미리 로드 후 클라이언트로 전달

### QueryRef 테스트 페이지 (`/queryref-test`)

- PreloadQuery + queryRef + useReadQuery 패턴 테스트
- 동일한 쿼리를 다른 변수로 여러 번 사용
- 각각 독립적인 queryRef 생성

### GraphQL Playground

개발 환경에서 `/api/graphql`에 접속하면 GraphQL Playground를 사용할 수 있습니다.

## 📝 주요 학습 포인트

1. **RSC와 Apollo Client 통합**: Next.js App Router에서 Apollo Client 사용법
2. **데이터 흐름**: 서버 → 클라이언트 데이터 전달 과정
3. **타입 안전성**: TypeScript와 GraphQL 타입 정의
4. **성능 최적화**: 서버에서 데이터 미리 로드로 초기 로딩 시간 단축

## 🔧 개발 환경

- Node.js >= 18.0.0
- npm 또는 yarn
- TypeScript 5.x
- Next.js 15.x

## 📄 라이선스

MIT License
