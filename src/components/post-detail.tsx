'use client';

import { useReadQuery } from '@apollo/client';
import { GetPostData } from '@/lib/types';

interface PostDetailProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryRef: any; // TransportedQueryRef 타입 호환성을 위해 any 사용
}

export function PostDetail({ queryRef }: PostDetailProps) {
  const { data } = useReadQuery(queryRef);
  const typedData = data as GetPostData;

  if (!typedData.post) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <p className="text-gray-500 text-center">게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const { post } = typedData;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>

      <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">{post.author.name.charAt(0)}</div>
          <span>{post.author.name}</span>
        </div>
        <span>•</span>
        <span>{post.author.email}</span>
        {post.author.age && (
          <>
            <span>•</span>
            <span>{post.author.age}세</span>
          </>
        )}
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-400">
          게시글 ID: {post.id} | 작성자 ID: {post.author.id}
        </div>
      </div>
    </div>
  );
}
