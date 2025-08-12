import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/dang-nhap', { state: { from: '/tai-khoan' } });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/dang-nhap'); 
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
      <p><strong>Họ tên:</strong> {user.name}</p>
      <p><strong>Tên đăng nhập:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Vai trò:</strong> {user.roles}</p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Account;
