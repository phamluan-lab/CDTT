import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; // Import Link để điều hướng
import { UrlImg } from '../../../config';
import postService from '../../../services/postService';

const PostNew = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const posts = await postService.postnew(4); // Giới hạn 4 bài viết
      console.log("Kết quả từ API:", posts);
      setPosts(posts);
    })();
  }, []);
  

  return (
    <>
      <h1><strong>TIN TỨC MỚI NHẤT</strong></h1>
      <div className='grid grid-cols-4 gap-4'>
        {posts.map(function (post, index) {
          return (
            <div key={index} className='flex flex-col'>
              <img src={UrlImg + "post/" + post.thumbnail} alt={post.thumbnail} />
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {/* Thêm Link với slug */}
              <Link to={`/post-detail/${post.id}`} className="text-blue-500">
                Xem chi tiết
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostNew;

