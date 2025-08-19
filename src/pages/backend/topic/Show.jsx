import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import topicService from '../../../services/topicService'; 
import { UrlImg } from '../../../config';

export default function Showtopic() {
  const { id } = useParams(); 
  const [topic, settopic] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loadtopic = async () => {
      setLoading(true); 
      try {
        const topicData = await topicService.getRow(id); 
        if (topicData) {
          settopic(topicData); 
        } else {
          setError('Sản phẩm không tồn tại.');
        }
      } catch (error) {
        setError('Lỗi khi tải chi tiết sản phẩm.');
      } finally {
        setLoading(false); 
      }
    };

    loadtopic();
  }, [id]); 
  if (!topic) return <div className="text-center p-5 text-xl">Danh mục không tồn tại.</div>;
  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Chi tiết thương hiệu: {topic.name}</h1> 
     
      <div className="space-y-4">
        <p className="text-lg"><strong>Mô tả:</strong> {topic.description || 'Không có mô tả.'}</p>
        <p className="text-lg"><strong>Trạng thái:</strong> {topic.status === 1 ? 'Hiển thị' : 'Ẩn'}</p>
      </div>
    </div>
  );
}




