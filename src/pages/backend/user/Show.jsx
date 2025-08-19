import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import userService from '../../../services/userService'; 
import { UrlImg } from '../../../config';

export default function Showuser() {
  const { id } = useParams(); 
  const [user, setuser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loaduser = async () => {
      setLoading(true); 
      try {
        const userData = await userService.getRow(id); 
        if (userData) {
          setuser(userData); 
        } else {
          setError('Sản phẩm không tồn tại.');
        }
      } catch (error) {
        setError('Lỗi khi tải chi tiết sản phẩm.');
      } finally {
        setLoading(false); 
      }
    };

    loaduser();
  }, [id]); 
  if (!user) return <div className="text-center p-5 text-xl">Người dùng không tồn tại.</div>;
  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Chi tiết người dùng: {user.name}</h1> 
       <div className="flex justify-center mb-6">
              <img
                src={UrlImg + "user/" + user.avatar}
                alt={user.name}
                className="max-w-sm w-full h-auto rounded-lg shadow-md"
              />
            </div>
      <div className="space-y-4">
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg"><strong>SĐT:</strong> {user.phone}</p>
        <p className="text-lg"><strong>Username:</strong> {user.username}</p>
        <p className="text-lg"><strong>Địa chỉ:</strong> {user.address}</p>
        <p className="text-lg"><strong>Trạng thái:</strong> {user.status === 1 ? 'Hiển thị' : 'Ẩn'}</p>
      </div>
    </div>
  );
}





