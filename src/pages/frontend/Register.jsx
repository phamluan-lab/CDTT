import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import userService from '../../services/userService';

const Register = () => {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', phone: '', address: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      await userService.register(form);
      setMessage('Đăng ký thành công!');
      setTimeout(() => {
        navigate('/dang-nhap');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Đăng ký thất bại!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Đăng ký</h2>
      <input
        name="name"
        placeholder="Họ và tên"
        onChange={handleChange}
        required
        className="block w-full mb-2 p-2 border"
      />
      <input name="username" placeholder="Tên đăng nhập" onChange={handleChange} required className="block w-full mb-2 p-2 border" />
      <input name="email" placeholder="Email" onChange={handleChange} required className="block w-full mb-2 p-2 border" />
      <input name="password" type="password" placeholder="Mật khẩu" onChange={handleChange} required className="block w-full mb-2 p-2 border" />
      <input
        name="phone"
        placeholder="Số điện thoại"
        onChange={handleChange}
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        name="address"
        placeholder="Địa chỉ"
        onChange={handleChange}
        required
        className="block w-full mb-2 p-2 border"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Đăng ký
      </button>

      <div className="mt-2 text-red-500">{message}</div>

      <div className="mt-4 text-center">
        <span>Bạn đã có tài khoản? </span>
        <Link to="/dang-nhap" className="text-blue-600 hover:underline">Đăng nhập</Link>
      </div>
    </form>
  );
};

export default Register;
