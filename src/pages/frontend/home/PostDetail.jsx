import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'; // dùng useParams
import postService from '../../../services/postService';
import { UrlImg } from '../../../config';
import Breadcrumb from '../home/BreadCrumb';

const PostDetail = () => {
  const { id } = useParams(); // lấy ID từ URL
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    (async () => {
      const data = await postService.getPostDetail(id, 4);
      if (data) {
        setPost(data.post);
        setRelatedPosts(data.posts);
      } else {
        setPost(null);
        setRelatedPosts([]);
      }
      setLoading(false);
    })();
  }, [id]);
   const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Tin tức', to: '/tin-tuc' },
    { label: post ? post.title : 'Đang tải...' },
  ];

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!post) return <p>Không tìm thấy bài viết</p>;

 return (
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <img
        className="w-full h-80 object-cover rounded-md mb-6"
        src={UrlImg + "post/" + post.thumbnail}
        alt={post.title}
      />
      <div className="text-gray-700 leading-relaxed text-lg">
        <p>{post.detail}</p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bài viết liên quan</h2>
        <div className="grid grid-cols-2 gap-6">
          {relatedPosts.map((item) => (
            <div key={item.id} className="p-4 border rounded-md hover:shadow-md transition">
              <img
                src={UrlImg + "post/" + item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">Chủ đề: {item.name}</p>
              <Link to={`/post-detail/${item.id}`} className="text-blue-500 text-sm mt-2 inline-block">
                Xem chi tiết →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
