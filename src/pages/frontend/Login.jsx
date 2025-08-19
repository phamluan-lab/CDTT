import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router'; 
import { GoogleLogin } from '@react-oauth/google';
import userService from '../../services/userService';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [googleSuccessMessage, setGoogleSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

 

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const user = await userService.login(form);
      console.log('Login success:', user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      let msg = 'Đăng nhập thất bại!';
      if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.message) {
        msg = err.message;
      }
      setMessage(msg);
    }
  };

  const handleGoogleSuccess = async (response) => {
    console.log('Google Login Successful:', response);
    setMessage('');
    setGoogleSuccessMessage('');
  
    try {
      if (!response.credential) {
          console.error('Google credential not found in response.');
          setMessage('Đăng nhập Google thất bại: Không nhận được thông tin xác thực.');
          return;
      }
  
      // Gửi credential lên backend Laravel
      const backendUrl = 'http://localhost/laravelapirestful/public/api/user/login/google';
  
      const backendResponse = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Thêm các headers khác nếu cần (ví dụ: CSRF token cho Laravel SPA)
        },
        body: JSON.stringify({ credential: response.credential }),
      });
  
      if (!backendResponse.ok) {
        // Xử lý lỗi từ backend (ví dụ: Invalid Google token hoặc lỗi SQL)
        const errorData = await backendResponse.json();
        console.error('Backend login failed:', errorData.message);
        setMessage('Đăng nhập Google thất bại: ' + (errorData.message || 'Lỗi không xác định từ backend.'));
        return;
      }
  
      // Đăng nhập backend thành công
      const data = await backendResponse.json();
      console.log('Backend login success:', data);
      setGoogleSuccessMessage('Đăng nhập Google thành công!');
      setMessage('');
      
      // TODO: Lưu token (data.token), chuyển hướng người dùng, cập nhật trạng thái UI, v.v.
      // Sau khi thành công và xử lý xong, bạn có thể chuyển hướng người dùng:
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate(from, { replace: true });
  
    } catch (error) {
      console.error('Error sending credential to backend:', error);
      setMessage('Đăng nhập Google thất bại: Lỗi kết nối hoặc xử lý.');
    }
  };
  

  const handleGoogleError = () => {
    console.log('Google Login Failed');
    setGoogleSuccessMessage('');
    setMessage('Đăng nhập bằng Google thất bại!');
  };

 

 
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
      
      {/* Form đăng nhập thông thường */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="username"
          placeholder="Tên đăng nhập"
          onChange={handleChange}
          required
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
          required
          className="block w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
          Đăng nhập
        </button>
      </form>

      {/* Phần ngăn cách */}
      <div className="flex items-center justify-center my-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500">hoặc</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Nút đăng nhập Google */}
      <div className="mb-4">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          theme="filled_blue"
          text="signin_with"
          shape="rectangular"
          width="100%"
        />
      </div>

      {/* Thông báo thành công Google (Hiển thị riêng) */}
      {googleSuccessMessage && <div className="text-green-500 text-center mb-4">{googleSuccessMessage}</div>}

      {/* Thông báo lỗi chung (message) */}
      {message && <div className="text-red-500 text-center mb-4">{message}</div>}

      {/* Link đăng ký */}
      <div className="text-center">
        <span>Bạn chưa có tài khoản? </span>
        <Link to="/dang-ky" className="text-blue-600 hover:underline">Đăng ký</Link>
      </div>
    </div>
  );
};

export default Login;
