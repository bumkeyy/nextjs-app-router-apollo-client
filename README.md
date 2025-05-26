# Next.js App Router with Apollo Client

이 프로젝트는 Next.js의 App Router와 Apollo Client를 사용한 GraphQL 예제 애플리케이션입니다.

## 주요 기능

- Next.js App Router 사용
- Apollo Client를 통한 GraphQL 클라이언트 구현
- Apollo Server Micro를 사용한 GraphQL API 구현
- API Route를 통한 GraphQL 엔드포인트 제공
- 간단한 데이터 쿼리 및 표시 예제

## 시작하기

다음 명령어로 개발 서버를 실행할 수 있습니다:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 애플리케이션을 확인하세요.

## 프로젝트 구조

- `app/` - Next.js App Router 구조의 메인 디렉토리
- `app/api/graphql/` - GraphQL API 엔드포인트
- `app/providers.js` - Apollo Client Provider 설정
- `app/users/` - 사용자 목록 페이지
