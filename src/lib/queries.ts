import { gql } from '@apollo/client';

// 사용자 목록 조회 쿼리
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      age
    }
  }
`;

// 게시글 목록 조회 쿼리
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      createdAt
      author {
        id
        name
        email
      }
    }
  }
`;

// 개별 게시글 조회 쿼리
export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      createdAt
      author {
        id
        name
        email
        age
      }
    }
  }
`;

// 개별 사용자 조회 쿼리
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      age
    }
  }
`;

// 사용자 생성 뮤테이션
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $age: Int) {
    createUser(name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

// 게시글 생성 뮤테이션
export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $authorId: ID!) {
    createPost(title: $title, content: $content, authorId: $authorId) {
      id
      title
      content
      createdAt
      author {
        id
        name
        email
      }
    }
  }
`;
