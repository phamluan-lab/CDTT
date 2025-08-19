import React, { useEffect, useState } from 'react';
import topicService from '../../../services/topicService';
import { FaTrashRestore, FaTrashAlt } from 'react-icons/fa';

export default function Trash() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);  // State để lưu lỗi

  const loadTrash = async () => {
    try {
      const res = await topicService.trash();
      console.log('Dữ liệu từ API:', res); // Log để kiểm tra dữ liệu trả về
      if (res.success) {
        if (res.topics.length === 0) {
          setError('Thùng rác hiện tại không có dữ liệu.');
        } else {
          setTopics(res.topics);
          setError(null);  // Reset lỗi nếu có dữ liệu
        }
      } else {
        setError('Không có dữ liệu trong thùng rác');
        setTopics([]);  // Nếu không có dữ liệu, set mảng trống
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách trong thùng rác:', error);
      setError('Đã xảy ra lỗi khi tải thùng rác.');
    }
  };

  const handleRestore = async (id) => {
    try {
      await topicService.restore(id);
      loadTrash();
    } catch (error) {
      console.error('Lỗi khi khôi phục sản phẩm:', error);
    }
  };

  useEffect(() => {
    loadTrash();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">🗑 Thùng rác sản phẩm</h1>
      {error && <p className="text-red-600">{error}</p>}  {/* Hiển thị thông báo lỗi */}
      <table className="w-full border border-gray-200 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Tên</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {topics.map(topic => (
            <tr key={topic.id} className="border-b">
              <td className="p-2">{topic.name}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleRestore(topic.id)} className="text-blue-600 hover:text-blue-800">
                  <FaTrashRestore /> Khôi phục
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


