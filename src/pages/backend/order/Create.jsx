import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaSave } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router'
import orderService from '../../../services/orderService';
import userService from '../../../services/userService';

const Create = () => {
  const navigate= useNavigate();
  const [userid, setUserId] = useState([]);
  const [users, setUsers] = useState([]); 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState(1);

  useEffect(() => {
    (async () => {
      const users = await userService.list(); // Lấy danh sách người dùng
      setUsers(users); // Gán danh sách người dùng vào state
    })();
  }, []); 
  //handleOrderStore
  const handleOrderStore = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);  
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("note", note);
    formData.append("status", status);
    formData.append("user_id", userid);
    await orderService.create(formData);
      alert('Thêm đơn hàng thành công!');
      navigate('/admin/order');


 
    
 
  };
  return (
    <>
      <form onSubmit={handleOrderStore}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-bold uppercase text-green-700'>THÊM ĐƠN HÀNG</h1>
          <div className=''>
            <button type='submit' className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" />
              Lưu
            </button>
            <NavLink to="/admin/order/create" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
              <FaArrowLeft className="inline" />Thêm mới
            </NavLink>

          </div>
        </div>
        <div className='p-4 border border-[#cccccc]'>
          <div className="flex gap-6">
            <div className='basis-9/12'>
              <div className='mb-3'>
                <label htmlFor='name'>Tên đơn hàng</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' id='name' className='p-2 border rounded-xl w-full mt-1' />
              </div>
              <div className='mb-3'>
                <label htmlFor='phone'>Số điện thoại</label>
                <textarea value={phone} onChange={(e) => setPhone(e.target.value)} id='phone' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div>
              <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <textarea value={email} onChange={(e) => setEmail(e.target.value)} id='type' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div>
              <div className='mb-3'>
                <label htmlFor='address'>Địa chỉ</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} id='address' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div> 
              <div className='mb-3'>
                <label htmlFor='note'>Ghi chú</label>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} id='note' className='p-2 border rounded-xl w-full mt-1'></textarea>
              </div> 

          
            </div>
            <div className='basis-3/12'>
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
              <div className='mb-3'>
                <label htmlFor='status'>Trạng thái</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} id="status" className='p-2 border rounded-xl w-full mt-2'>
                  <option value="1">Hiện</option>
                  <option value="0">Ân</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default Create