import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import bannerService from '../../../services/bannerService'; 
import { UrlImg } from '../../../config';

export default function Showbanner() {
  const { id } = useParams(); 
  const [banner, setbanner] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loadbanner = async () => {
      setLoading(true); 
      try {
        const bannerData = await bannerService.getRow(id); 
        if (bannerData) {
          setbanner(bannerData); 
        } else {
          setError('Sản phẩm không tồn tại.');
        }
      } catch (error) {
        setError('Lỗi khi tải chi tiết sản phẩm.');
      } finally {
        setLoading(false); 
      }
    };

    loadbanner();
  }, [id]); 
  if (!banner) return <div className="text-center p-5 text-xl">Banner không tồn tại.</div>;
  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Chi tiết Banner: {banner.name}</h1> 
      <div className="flex justify-center mb-6">
        <img
          src={UrlImg + "banner/" + banner.image}
          alt={banner.name}
          className="max-w-sm w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="space-y-4">
        <p className="text-lg"><strong>Mô tả:</strong> {banner.description || 'Không có mô tả.'}</p>
        <p className="text-lg"><strong>Trạng thái:</strong> {banner.status === 1 ? 'Hiển thị' : 'Ẩn'}</p>
      </div>
    </div>
  );
}




