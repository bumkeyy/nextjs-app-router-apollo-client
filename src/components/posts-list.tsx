'use client';

import { useSuspenseQuery } from '@apollo/client';
import { GET_POSTS } from '@/lib/queries';
import { GetPostsData } from '@/lib/types';

export function PostsList() {
  const { data } = useSuspenseQuery<GetPostsData>(GET_POSTS);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">게시글 목록</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>작성자: {post.author.name}</span>
              <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
