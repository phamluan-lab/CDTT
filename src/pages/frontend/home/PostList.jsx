import React, { useEffect, useState } from "react";
import postService from "../../../services/postService";
import { UrlImg } from "../../../config";
import Breadcrumb from '../../frontend/home/BreadCrumb';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const result = await postService.postall(limit, page);
        setPosts(result); 
        setLastPage(result.pagination?.last_page || 1); 
      } catch (err) {
        setError("Không thể tải bài viết");
        setPosts([]);
      }
    };
    loadPosts();
  }, [page]);
    const handlePage = (number) => {
    setPage(number);
  };
   const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Tin tức', to: '/tin-tuc' },
   
  ];
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
        <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-4">Danh sách Bài Viết</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="flex gap-4 border-b pb-4">
            <img
              src={UrlImg + "post/" + post.thumbnail}
              alt={post.title}
              className="w-40 h-28 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
                {post.title}
              </h2>
              <div className="text-sm text-gray-500 mb-1">
                Đăng bởi:{" "}
                <span className="text-blue-600">{post.author || "Admin"}</span>{" "}
                |{" "}
                {new Date(post.created_at).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">
                {post.description || "Không có mô tả"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Không có bài viết</p>
      )}

      {/* Nút phân trang */}
      <div className="mt-8 flex justify-center">
            <div className="flex space-x-2 items-center">
              <button
                onClick={() => handlePage(1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded ${
                  page === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                ««
              </button>
              <button
                onClick={() => handlePage(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded ${
                  page === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                «
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePage(num)}
                  className={`px-4 py-2 rounded ${
                    page === num
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handlePage(page + 1)}
                disabled={page === 5}
                className={`px-4 py-2 rounded ${
                  page === 5
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                »
              </button>
            </div>
          </div>
    </div>
  );
};

export default PostList;
