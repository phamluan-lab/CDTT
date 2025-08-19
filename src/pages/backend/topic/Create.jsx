import React, { useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import topicService from '../../../services/topicService';

const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(1);

  const handleTopicStore = async (event) => {
    event.preventDefault();

    try {
      const topic = new FormData();
      topic.append('name', name);
      topic.append('description', description);
      topic.append('status', Number(status));

      await topicService.create(topic);
      alert('Thêm chủ đề thành công!');
      navigate('/admin/topic');
    } catch (error) {
      console.error('Lỗi khi thêm chủ đề:', error);
      alert('Đã xảy ra lỗi khi thêm chủ đề.');
    }
  };

  return (
    <>
      <form onSubmit={handleTopicStore}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-bold uppercase text-green-700'>THÊM CHỦ ĐỀ</h1>
          <div>
            <button type='submit' className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" /> Lưu
            </button>
            <NavLink to="/admin/topic" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
              <FaArrowLeft className="inline" /> Quay lại
            </NavLink>
          </div>
        </div>

        <div className='p-4 border border-[#cccccc]'>
          <div className="flex gap-6">
            <div className='basis-9/12'>
              <div className='mb-3'>
                <label htmlFor='name'>Tên chủ đề</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type='text'
                  id='name'
                  className='p-2 border rounded-xl w-full mt-1'
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='description'>Mô tả</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id='description'
                  className='p-2 border rounded-xl w-full mt-1'
                ></textarea>
              </div>
            </div>

            <div className='basis-3/12'>
              <div className='mb-3'>
                <label htmlFor='status'>Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  id="status"
                  className='p-2 border rounded-xl w-full mt-2'
                >
                  <option value="1">Hiện</option>
                  <option value="0">Ẩn</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;

