import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaToggleOn, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router'
import postService from '../../../services/postService';
import { UrlImg } from '../../../config';
const List = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await postService.list();
      console.log("Kết quả từ API:", result);
      setPosts(result);
    })();
  }, []);
  const loadPosts = async () => {
    const res = await postService.getAll();
    if (res && res.posts) {
      setPosts(res.posts);
    }
  };
  useEffect(() => {
    loadPosts();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá bài viết này không?")) {
      await postService.delete(id);
    }
  };
  return (
    <>
      <div className=''>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-bold uppercase text-black'>DANH SÁCH BÀI VIẾT</h1>
          <div className=''>
            <NavLink to="/admin/post/create" className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaPlus className="inline" />Thêm mới
            </NavLink>
            <NavLink to="/admin/post/trash" className="bg-red-600 p-2 rounded-xl text-white mx-1">
              <FaTrash className="inline" />Thùng rác
            </NavLink>
          </div>
        </div>
        <div className='p-2 border border-[#cccccc]'>
          <table class="border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th class="border border-gray-300 p-2 w-28">Hình</th>
                <th class="border border-gray-300 p-2">Tiêu đề bài viết</th>
                <th class="border border-gray-300 p-2">Slug</th>
                <th class="border border-gray-300 p-2">Chức năng</th>
                <th class="border border-gray-300 p-2 w-7">ID</th>
              </tr>
            </thead>
            <tbody>
              {posts && posts.length > 0 && posts.map((post, index) => {
                return (
                  <tr key={index}>
                    <td class="border border-gray-300 p-2">
                      <img src={UrlImg + "post/" + post.thumbnail} alt='hinh' />
                    </td>
                    <td class="border border-gray-300 p-2">{post.title}</td>
                    <td class="border border-gray-300 p-2">{post.slug}</td>
                    <td class="border border-gray-300 p-2 text-center">
                      <button className='inline-block mx-1 text-green-500'>
                        <FaToggleOn />
                      </button>
                      <NavLink className="inline-block mx-1 text-blue-600" to={'/admin/post/edit/' + post.id}>
                        <FaEdit />
                      </NavLink>
                      <NavLink className="inline-block mx-1 text-green-600" to={'/admin/post/show/' + post.id}>
                        <FaEye />
                      </NavLink>
                      <button onClick={() => handleDelete(post.id)} className="text-red-600 mx-1">
                        <FaTrash />
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">{post.id}</td>
                  </tr>
                );
              })}


            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default List
