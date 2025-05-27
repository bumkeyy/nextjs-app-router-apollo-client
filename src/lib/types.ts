// GraphQL 스키마에 맞는 TypeScript 타입 정의

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number | null;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
}

// Query 타입들
export interface GetUsersData {
  users: User[];
}

export interface GetUserData {
  user: User | null;
}

export interface GetUserVariables {
  id: string;
}

export interface GetPostsData {
  posts: Post[];
}

export interface GetPostData {
  post: Post | null;
}

export interface GetPostVariables {
  id: string;
}

// Mutation 타입들
export interface CreateUserData {
  createUser: User;
}

export interface CreateUserVariables {
  name: string;
  email: string;
  age?: number;
}

export interface CreatePostData {
  createPost: Post;
}

export interface CreatePostVariables {
  title: string;
  content: string;
  authorId: string;
}
