import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import postService from '../../services/postService';
import { UrlImg } from '../../config';

const PostsByCategory = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    limit: 10,
    total: 0,
    last_page: 1
  });
  const { topicId } = useParams();

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching posts for topicId:", topicId, "page:", page); // Debug log
      
      const response = await postService.getPostsByTopic(topicId, 10, page);
      console.log("Component received response:", response); // Debug log
      
      if (response && Array.isArray(response.posts)) {
        setPosts(response.posts);
        setPagination(response.pagination);
      } else {
        console.error("Invalid response format:", response);
        setPosts([]);
        setError('Dữ liệu không hợp lệ');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Không thể tải danh sách bài viết');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topicId) {
      console.log("TopicId changed:", topicId); // Debug log
      fetchPosts(1);
    }
  }, [topicId]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchPosts(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bài viết theo chủ đề</h1>
      
      {posts && posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative pb-[66.66%]">
                  <img
                    src={UrlImg + "post/" + post.thumbnail}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('vi-VN')}
                    </span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pagination.last_page > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Trước
              </button>
              
              {[...Array(pagination.last_page)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    pagination.current_page === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 py-8">
          Không có bài viết nào trong chủ đề này
        </div>
      )}
    </div>
  );
};

export default PostsByCategory; 