import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';

// 간단한 GraphQL 스키마 정의
const typeDefs = `
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

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
  }
`;

// 타입 정의
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

// 가짜 데이터
const users: User[] = [
  { id: '1', name: '김철수', email: 'kim@example.com', age: 30 },
  { id: '2', name: '이영희', email: 'lee@example.com', age: 25 },
  { id: '3', name: '박민수', email: 'park@example.com', age: 35 },
];

const posts: Post[] = [
  {
    id: '1',
    title: 'Next.js와 Apollo Client',
    content: 'Next.js App Router에서 Apollo Client를 사용하는 방법에 대해 알아보겠습니다.',
    authorId: '1',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'GraphQL의 장점',
    content: 'GraphQL을 사용하면 필요한 데이터만 요청할 수 있어 효율적입니다.',
    authorId: '2',
    createdAt: '2024-01-16T14:30:00Z',
  },
  {
    id: '3',
    title: 'React Server Components',
    content: 'RSC를 활용하여 서버에서 데이터를 미리 로드하는 방법을 살펴보겠습니다.',
    authorId: '1',
    createdAt: '2024-01-17T09:15:00Z',
  },
];

// 리졸버 정의
const resolvers = {
  Query: {
    users: () => users,
    user: (_: any, { id }: { id: string }) => users.find((user) => user.id === id),
    posts: () =>
      posts.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.authorId)!,
      })),
    post: (_: any, { id }: { id: string }) => {
      const post = posts.find((p) => p.id === id);
      if (!post) return null;
      return {
        ...post,
        author: users.find((user) => user.id === post.authorId)!,
      };
    },
  },
  Mutation: {
    createUser: (_: any, { name, email, age }: { name: string; email: string; age?: number }) => {
      const newUser: User = {
        id: String(users.length + 1),
        name,
        email,
        ...(age && { age }),
      };
      users.push(newUser);
      return newUser;
    },
    createPost: (_: any, { title, content, authorId }: { title: string; content: string; authorId: string }) => {
      const author = users.find((user) => user.id === authorId);
      if (!author) {
        throw new Error('작성자를 찾을 수 없습니다.');
      }

      const newPost: Post = {
        id: String(posts.length + 1),
        title,
        content,
        authorId,
        createdAt: new Date().toISOString(),
      };
      posts.push(newPost);

      return {
        ...newPost,
        author,
      };
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  // GraphQL Playground 활성화 (개발 환경에서만)
  graphiql: process.env.NODE_ENV === 'development',
  fetchAPI: { Response },
});

// Next.js App Router에서 사용할 핸들러
export { yoga as GET, yoga as POST };
