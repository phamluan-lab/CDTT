import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import productService from '../../../services/productService'; 
import { UrlImg } from '../../../config';

export default function ShowProduct() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true); 
      try {
        const productData = await productService.getRow(id); 
        if (productData) {
          setProduct(productData); 
        } else {
          setError('Sản phẩm không tồn tại.');
        }
      } catch (error) {
        setError('Lỗi khi tải chi tiết sản phẩm.');
      } finally {
        setLoading(false); 
      }
    };

    loadProduct();
  }, [id]); 
  if (!product) return <div className="text-center p-5 text-xl">Sản phẩm không tồn tại.</div>;
  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Chi tiết sản phẩm: {product.name}</h1> 
      <div className="flex justify-center mb-6">
        <img
          src={UrlImg + "product/" + product.thumbnail}
          alt={product.name}
          className="max-w-sm w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Hiển thị các hình liên quan nếu có */}
      {product.images && product.images.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Hình liên quan:</h2>
          <div className="flex flex-wrap gap-4">
            {product.images.map((img, idx) => (
              <img
                key={img.id || idx}
                src={UrlImg + "product/" + img.thumbnail}
                alt={`Hình chi tiết ${idx + 1}`}
                className="w-32 h-32 object-cover rounded border"
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <p className="text-lg"><strong>Mô tả:</strong> {product.description || 'Không có mô tả.'}</p>
        <p className="text-lg"><strong>Giá bán:</strong> {product.price_root ? product.price_root : 'Liên hệ'} VND</p>
        <p className="text-lg"><strong>Giá khuyến mãi:</strong> {product.price_sale ? product.price_sale : 'Liên hệ'} VND</p>
        <p className="text-lg"><strong>Số lượng:</strong> {product.qty} sản phẩm</p>
        <p className="text-lg"><strong>Trạng thái:</strong> {product.status === 1 ? 'Hiển thị' : 'Ẩn'}</p>
      </div>
    </div>
  );
}



