import React, { useState } from 'react'
import { FaArrowLeft, FaSave } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router'
import userService from '../../../services/userService'

const Create = () => {
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [roles, setRoles] = useState("customer");
  const [status, setStatus] = useState(1);

  // Hàm xử lý submit
  const handleUserStore = async (event) => {
    event.preventDefault();
    try {
      const avatar = document.getElementById('avatar')?.files?.[0];
      const user = new FormData();
      user.append("name", name);
      user.append("username", username);
      user.append("email", email);
      user.append("phone", phone);
      user.append("password", password);
      user.append("address", address);
      user.append("roles", roles);
      user.append("status", status);
      if (avatar) {
        user.append("avatar", avatar);
      }
      await userService.create(user);
      alert('Thêm người dùng thành công!');
      navigate('/admin/user');
    } catch (error) {
      console.error('Lỗi khi thêm người dùng:', error);
      alert('Đã xảy ra lỗi khi thêm người dùng.');
    }
  };

  return (
    <>
      <form onSubmit={handleUserStore}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-bold uppercase text-green-700'>THÊM NGƯỜI DÙNG</h1>
          <div>
            <button type='submit' className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" /> Lưu
            </button>
            <NavLink to="/admin/user/create" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
              <FaArrowLeft className="inline" /> Thêm mới
            </NavLink>
          </div>
        </div>
        <div className='p-4 border border-[#cccccc]'>
          <div className="flex gap-6">
            <div className='basis-9/12'>
              <div className='mb-3'>
                <label htmlFor='name'>Tên người dùng</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' id='name' className='p-2 border rounded-xl w-full mt-1' />
              </div>
              <div className='mb-3'>
                <label htmlFor='username'>Username</label>
                <textarea value={username} onChange={(e) => setUsername(e.target.value)} id='username' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div>
              <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <textarea value={email} onChange={(e) => setEmail(e.target.value)} id='email' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div>
              <div className='mb-3'>
                <label htmlFor='phone'>Số điện thoại</label>
                <textarea value={phone} onChange={(e) => setPhone(e.target.value)} id='phone' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div>
              <div className='mb-3'>
                <label htmlFor='password'>Mật khẩu</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' className='p-2 border rounded-xl w-full mt-1' />
              </div>
              <div className='mb-3'>
                <label htmlFor='address'>Địa chỉ</label>
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} id='address' className='p-2 border rounded-xl w-full mt-1' />
              </div>
              <div className='mb-3'>
                <label htmlFor='roles'>Vai trò</label>
                <input type='text' value={roles} onChange={(e) => setRoles(e.target.value)} id='roles' className='p-2 border rounded-xl w-full mt-1' />
              </div>
            </div>

            <div className='basis-3/12'>
              <div className='mb-3'>
                <label htmlFor='avatar'>Avatar</label>
                <input type='file' id='avatar' className='p-2 border rounded-xl w-full mt-2' />
              </div>
              <div className='mb-3'>
                <label htmlFor='status'>Trạng thái</label>
                <select value={status} onChange={(e) => setStatus(parseInt(e.target.value))} id="status" className='p-2 border rounded-xl w-full mt-2'>
                  <option value="1">Hiện</option>
                  <option value="0">Ẩn</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
};

export default Create;

