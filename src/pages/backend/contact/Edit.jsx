import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate, useParams } from 'react-router';
import contactService from '../../../services/contactService';
import userService from '../../../services/userService';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userid, setUserId] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [replyId, setReplyId] = useState(null);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(1);
  const [users, setUsers] = useState([]); 
  useEffect(() => {
    (async () => {
      const result = await userService.list();
      console.log("Kết quả từ API:", result);
      setUsers(result);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const contact = await contactService.getRow(id);
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setTitle(contact.title);
      setReplyId(contact.replyId);
      setContent(contact.contact);
      setStatus(Number(contact?.status ?? 1));
    })();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append("user_id", userid);
      formData.append('phone', phone);
      formData.append('title', title);
      formData.append('reply_id', replyId);
      formData.append('content', content);
      formData.append('status', Number(status));

      const result = await contactService.update(formData, id);
      if (result.success) {
        alert('Cập nhật contact thành công');
        navigate('/admin/contact');
      } else {
        alert('Cập nhật contact thất bại');
      }
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold uppercase text-green-700">SỬA LIÊN HỆ</h1>
          <div>
            <button type="submit" className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" /> Lưu
            </button>
            <NavLink to="/admin/contact" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
              <FaArrowLeft className="inline" /> Quay lại
            </NavLink>
          </div>
        </div>

        <div className="p-4 border border-[#cccccc]">
          <div className="flex gap-6">
            <div className="basis-9/12">
              <div className="mb-3">
                <label htmlFor="name">Tên liên hệ</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="title">Tiêu đề</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="title"
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content">Nội dung</label>
                <input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  type='text'
                  id="content"
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>
   
   


              <div className="mb-3">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  id="phone"
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="reply_id">Phản hồi</label>
                <input
                  value={replyId}
                  onChange={(e) => setReplyId(e.target.value)}
                  type="text"
                  id="reply_id"
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>
            </div>

            <div className="basis-3/12">
            <div className='mb-3'>
              <label htmlFor='user_id'>Người dùng</label>
              <select
                value={userid || ""} 
                onChange={(e) => {
                  console.log('User ID Selected:', e.target.value); 
                  setUserId(parseInt(e.target.value, 10));  
                }}
                id="user_id"
                className="p-2 border rounded-xl w-full mt-2"
              >
                <option value="">-- Chọn người dùng --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
              <div className="mb-3">
                <label htmlFor="status">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  id="status"
                  className="p-2 border rounded-xl w-full mt-2"
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

