import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import productsaleService from '../../../services/productsaleService';
import { UrlImg } from '../../../config';

const List = () => {
  const [productSales, setproductSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductSales = async () => {
    try {
      const result = await productsaleService.getAll();
      console.log("Kết quả từ API:", result);
      setproductSales(result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khuyến mãi:", error);
    }
  };

  useEffect(() => {
    fetchProductSales();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      try {
        setLoading(true);
        const result = await productsaleService.remove(id);
        if (result) {
          alert('Xóa khuyến mãi thành công');
          fetchProductSales(); // Refresh lại danh sách sau khi xóa
        } else {
          alert('Lỗi khi xóa khuyến mãi');
        }
      } catch (error) {
        console.error('Lỗi khi xóa khuyến mãi:', error);
        alert(error.response?.data?.message || error.message || 'Đã xảy ra lỗi không xác định khi xóa.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý khuyến mãi</h1>
        <Link
          to="/admin/product-sales/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" /> Thêm khuyến mãi
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá khuyến mãi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giảm giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày bắt đầu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày kết thúc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productSales && productSales.length > 0 ? (
                productSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                      {sale.price_sale != null && !isNaN(parseFloat(sale.price_sale)) ? parseFloat(sale.price_sale).toLocaleString('vi-VN') : 'N/A'}đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        -{sale.discount_percent}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(sale.date_begin).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(sale.date_end).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/product-sales/edit/${sale.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(sale.id)}
                          disabled={loading}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Không có dữ liệu khuyến mãi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;