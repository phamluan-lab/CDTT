import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import postService from '../../../services/postService'; 
import { UrlImg } from '../../../config';

export default function Showpost() {
  const { id } = useParams(); 
  const [post, setPost] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true); 
      try {
        const postData = await postService.getRow(id); 
        if (postData) {
          setPost(postData); 
        } else {
          setError('Sản phẩm không tồn tại.');
        }
      } catch (error) {
        setError('Lỗi khi tải chi tiết sản phẩm.');
      } finally {
        setLoading(false); 
      }
    };

    loadPost();
  }, [id]); 
  if (!post) return <div className="text-center p-5 text-xl">Bài viết không tồn tại.</div>;
  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Chi tiết bài viết: {post.title}</h1> 
      <div className="flex justify-center mb-6">
        <img
          src={UrlImg + "post/" + post.thumbnail}
          alt={post.title}
          className="max-w-sm w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="space-y-4">
      <p className="text-lg"><strong>Chi tiết:</strong> {post.detail}</p>
      <p className="text-lg"><strong>Loại:</strong> {post.type}</p>
        <p className="text-lg"><strong>Mô tả:</strong> {post.description || 'Không có mô tả.'}</p>
        <p className="text-lg"><strong>Trạng thái:</strong> {post.status === 1 ? 'Hiển thị' : 'Ẩn'}</p>
      </div>
    </div>
  );
}





