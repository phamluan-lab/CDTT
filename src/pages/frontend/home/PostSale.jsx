import React, { useEffect, useState } from 'react';
import postService from '../../../services/postService';
import { Link } from 'react-router'; // Sửa lại import Link
import { UrlImg } from '../../../config';

const PostSale = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService.postsale(4)
      .then(data => {
        setPosts(data); // data chính là mảng posts
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        // Có thể xử lý lỗi ở đây nếu muốn
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h2 className='text-2xl font-medium mb-5'>Chương trình khuyến mãi</h2>
      {posts.map((post) => (
        <div key={post.id} className='flex gap-4 mb-3'>
          <div className='basis-4/12'>
            <img src={UrlImg + "post/" + post.thumbnail} className='w-full rounded-lg' alt="" />
          </div>
          <div className='basis-8/12'>
            <h3 className='font-bold'>{post.title}</h3>
            <h6>{new Date(post.created_at).toLocaleDateString('vi-VN')}</h6>
          </div>
        </div>
      ))}
      <Link to="/tin-tuc" className='border border-red-500 px-2 py-1 rounded-2xl block text-center w-full'>
        Xem tất cả
      </Link>
    </>
  );
};

export default PostSale;