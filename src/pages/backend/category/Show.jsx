import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import categoryService from '../../../services/categoryService'; 
import { UrlImg } from '../../../config';

export default function Showcategory() {
  const { id } = useParams(); 
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true); 
      try {
        const categoryData = await categoryService.getRow(id); 
        if (categoryData) {
          setCategory(categoryData); 
        } else {
          setError('Sản phẩm không tồn tại.');
        }
      } catch (error) {
        setError('Lỗi khi tải chi tiết sản phẩm.');
      } finally {
        setLoading(false); 
      }
    };

    loadCategory();
  }, [id]); 
  if (!category) return <div className="text-center p-5 text-xl">Danh mục không tồn tại.</div>;
  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Chi tiết thương hiệu: {category.name}</h1> 
      <div className="flex justify-center mb-6">
        <img
          src={UrlImg + "category/" + category.image}
          alt={category.name}
          className="max-w-sm w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="space-y-4">
        <p className="text-lg"><strong>Mô tả:</strong> {category.description || 'Không có mô tả.'}</p>
        <p className="text-lg"><strong>Trạng thái:</strong> {category.status === 1 ? 'Hiển thị' : 'Ẩn'}</p>
      </div>
    </div>
  );
}




