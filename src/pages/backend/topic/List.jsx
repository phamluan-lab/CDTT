import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaToggleOn, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router'
import topicService from '../../../services/topicService';
const List = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await topicService.list();
      console.log("Kết quả từ API:", result);
      setTopics(result);
    })();
  }, []);
  const loadTopics = async () => {
    const res = await topicService.getAll();
    if (res && res.topics) {
      setTopics(res.topics);
    }
  };
  useEffect(() => {
    loadTopics();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá chủ đề này không?")) {
      await topicService.delete(id);
    }
  };
  return (
    <>
      <div className=''>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-bold uppercase text-black'>DANH SÁCH CHỦ ĐỀ</h1>
          <div className=''>
            <NavLink to="/admin/topic/create" className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaPlus className="inline" />Thêm mới
            </NavLink>
            <NavLink to="/admin/topic/trash" className="bg-red-600 p-2 rounded-xl text-white mx-1">
              <FaTrash className="inline" />Thùng rác
            </NavLink>
          </div>
        </div>
        <div className='p-2 border border-[#cccccc]'>
          <table class="border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th class="border border-gray-300 p-2 w-28">Tên chủ đề</th>
                <th class="border border-gray-300 p-2">Slug</th>

                <th class="border border-gray-300 p-2">Chức năng</th>
                <th class="border border-gray-300 p-2 w-7">ID</th>
              </tr>
            </thead>
            <tbody>
              {topics && topics.length > 0 && topics.map((topic, index) => {
                return (
                  <tr key={index}>

                    <td class="border border-gray-300 p-2">{topic.name}</td>
                    <td class="border border-gray-300 p-2">{topic.slug}</td>
                    <td class="border border-gray-300 p-2 text-center">
                      <button className='inline-block mx-1 text-green-500'>
                        <FaToggleOn />
                      </button>
                      <NavLink className="inline-block mx-1 text-blue-600" to={'/admin/topic/edit/' + topic.id}>
                        <FaEdit />
                      </NavLink>
                      <NavLink className="inline-block mx-1 text-green-600" to={'/admin/topic/show/' + topic.id}>
                        <FaEye />
                      </NavLink>
                      <button onClick={() => handleDelete(topic.id)} className="text-red-600 mx-1">
                        <FaTrash />
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">{topic.id}</td>
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
