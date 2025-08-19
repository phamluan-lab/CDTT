import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate, useParams } from 'react-router';
import topicService from '../../../services/topicService';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(1);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await topicService.list();
      console.log("Kết quả từ API:", result);
      setTopics(result);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const topic = await topicService.getRow(id);
      console.log('Danh mục đã được tìm thấy:', topic);
      setName(topic.name);
      setDescription(topic.description);
      setStatus(Number(topic?.status ?? 1));
    })();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('status', Number(status));

      const result = await topicService.update(formData, id);
      if (result.success) {
        alert('Cập nhật chủ đề thành công');
        navigate('/admin/topic');
      } else {
        alert('Cập nhật chủ đề thất bại');
      }
   
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-bold uppercase text-green-700'>CẬP NHẬT CHỦ ĐỀ</h1>
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

export default Edit;

