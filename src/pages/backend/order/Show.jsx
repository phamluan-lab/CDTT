import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import orderService from '../../../services/orderService';


const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const result = await orderService.getRow(id);
      setOrder(result);
      setError(null);
    } catch (err) {
      setError('Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.');
      console.error('Lỗi khi tải thông tin đơn hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (parseInt(status)) {
      case 0:
        return 'bg-yellow-100 text-yellow-800';
      case 1:
        return 'bg-blue-100 text-blue-800';
      case 2:
        return 'bg-green-100 text-green-800';
      case 3:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (parseInt(status)) {
      case 0:
        return 'Chờ xử lý';
      case 1:
        return 'Đang xử lý';
      case 2:
        return 'Hoàn thành';
      case 3:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Lỗi!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không tìm thấy thông tin đơn hàng</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/admin/order')}
            className="mr-4 text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng #{order.id}</h1>
        </div>
        <button
          onClick={() => navigate(`/admin/order/edit/${order.id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FaEdit className="mr-2" /> Chỉnh sửa
        </button>
      </div>

      {/* Thông tin đơn hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">Trạng thái:</p>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Ngày tạo:</p>
            <p>{new Date(order.created_at).toLocaleString('vi-VN')}</p>
          </div>
          
        </div>
      </div>

      {/* Thông tin khách hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">Họ tên:</p>
            <p className="font-medium">{order.name}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Email:</p>
            <p>{order.email}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Số điện thoại:</p>
            <p>{order.phone}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Địa chỉ:</p>
            <p>{order.address}</p>
          </div>
        </div>
      </div>

      {/* Chi tiết sản phẩm */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Chi tiết sản phẩm</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.details?.map((detail, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {detail.product?.name || 'Sản phẩm không tồn tại'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {detail.price_root?.toLocaleString('vi-VN')} VNĐ
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{detail.qty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {(detail.price_root * detail.qty)?.toLocaleString('vi-VN')} VNĐ
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Show;





