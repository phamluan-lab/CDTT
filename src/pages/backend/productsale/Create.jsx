import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import productService from '../../../services/productService';
import productsaleService from '../../../services/productsaleService';

const Create = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productid: '',
    price_sale: '',
    date_begin: '',
    date_end: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.list();
      setProducts(response.products);
    } catch (error) {
      console.error('Error fetching products for dropdown:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await productsaleService.create(formData);

      if (result && result.success) {
        console.log('Product sale created successfully:', result);
        navigate('/admin/product-sales');
      } else {
        const errorMessage = result?.message || 'Tạo khuyến mãi thất bại từ API';
        console.error('API returned error creating product sale:', errorMessage);
        setError(errorMessage);
      }

    } catch (error) {
      console.error('Error creating product sale (network/server error):', error.response?.data || error.message || error);
      const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi tạo khuyến mãi.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Thêm khuyến mãi mới</h1>
        <button
          onClick={() => navigate('/admin/product-sales')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Quay lại
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chọn sản phẩm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sản phẩm
              </label>
              <select
                name="productid"
                value={formData.productid}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn sản phẩm</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name ?? 'Không rõ tên'} - {product.price_root?.toLocaleString('vi-VN') ?? '0'}đ
                  </option>
                ))}
              </select>
            </div>

            {/* Giá khuyến mãi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá khuyến mãi
              </label>
              <input
                type="number"
                name="price_sale"
                value={formData.price_sale}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập giá khuyến mãi"
                required
              />
            </div>

            {/* Ngày bắt đầu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                name="date_begin"
                value={formData.date_begin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Ngày kết thúc */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày kết thúc
              </label>
              <input
                type="date"
                name="date_end"
                value={formData.date_end}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Nút lưu */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center"
            >
              <FaSave className="mr-2" />
              {loading ? 'Đang lưu...' : 'Lưu khuyến mãi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;