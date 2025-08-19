import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import brandService from '../../../services/brandService'; 
import { UrlImg } from '../../../config';

export default function Showbrand() {
  const { id } = useParams(); 
  const [brand, setBrand] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loadBrand = async () => {
      setLoading(true); 
      try {
        const brandData = await brandService.getRow(id); 
        if (brandData) {
          setBrand(brandData); 
        } else {
          setError('Sản phẩm không tồn tại.');
        }
      } catch (error) {
        setError('Lỗi khi tải chi tiết sản phẩm.');
      } finally {
        setLoading(false); 
      }
    };

    loadBrand();
  }, [id]); 
  if (!brand) return <div className="text-center p-5 text-xl">Thuowng hiệu không tồn tại.</div>;
  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Chi tiết thương hiệu: {brand.name}</h1> 
      <div className="flex justify-center mb-6">
        <img
          src={UrlImg + "brand/" + brand.image}
          alt={brand.name}
          className="max-w-sm w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="space-y-4">
        <p className="text-lg"><strong>Mô tả:</strong> {brand.description || 'Không có mô tả.'}</p>
        <p className="text-lg"><strong>Trạng thái:</strong> {brand.status === 1 ? 'Hiển thị' : 'Ẩn'}</p>
      </div>
    </div>
  );
}



