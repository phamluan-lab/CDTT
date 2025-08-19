import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaToggleOn, FaTrash, FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router'
import orderService from '../../../services/orderService';
const List = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await orderService.list();
      setOrders(result);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.');
      console.error('Lỗi khi tải đơn hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá đơn hàng này không?")) {
      try {
        await orderService.delete(id);
        fetchOrders(); // Làm mới danh sách sau khi xóa
      } catch (err) {
        setError('Không thể xóa đơn hàng. Vui lòng thử lại sau.');
        console.error('Lỗi khi xóa đơn hàng:', err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await orderService.updateStatus(id, newStatus);
      fetchOrders(); // Làm mới danh sách sau khi cập nhật trạng thái
    } catch (err) {
      setError('Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại sau.');
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err);
    }
  };

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone?.includes(searchTerm) ||
        order.address?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

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

  return (
    <div className=''>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold uppercase text-black'>QUẢN LÝ ĐƠN HÀNG</h1>
        <div className=''>
          <NavLink to="/admin/order/create" className="bg-green-600 p-2 rounded-xl text-white mx-1">
            <FaPlus className="inline" /> Thêm mới
          </NavLink>
          <NavLink to="/admin/order/trash" className="bg-red-600 p-2 rounded-xl text-white mx-1">
            <FaTrash className="inline" /> Thùng rác
          </NavLink>
        </div>
      </div>

      {/* Phần tìm kiếm và lọc */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <select
          className="border rounded-lg px-4 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="0">Chờ xử lý</option>
          <option value="1">Đang xử lý</option>
          <option value="2">Hoàn thành</option>
          <option value="3">Đã hủy</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="created_at">Ngày tạo</option>
          <option value="name">Tên khách hàng</option>
          <option value="status">Trạng thái</option>
        </select>

        <button
          className="border rounded-lg px-4 py-2"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '↑ Tăng dần' : '↓ Giảm dần'}
        </button>
      </div>

      <div className='p-2 border border-[#cccccc]'>
        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 w-28">Tên khách hàng</th>
              <th className="border border-gray-300 p-2 w-28">Email</th>
              <th className="border border-gray-300 p-2 w-28">Số điện thoại</th>
              <th className="border border-gray-300 p-2 w-28">Địa chỉ</th>
              <th className="border border-gray-300 p-2">Trạng thái</th>
              <th className="border border-gray-300 p-2">Thao tác</th>
              <th className="border border-gray-300 p-2 w-7">ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{order.name}</td>
                  <td className="border border-gray-300 p-2">{order.email}</td>
                  <td className="border border-gray-300 p-2">{order.phone}</td>
                  <td className="border border-gray-300 p-2">{order.address}</td>
                  <td className="border border-gray-300 p-2">
                    <select
                      className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeClass(order.status)}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, parseInt(e.target.value))}
                    >
                      <option value="0">Chờ xử lý</option>
                      <option value="1">Đang xử lý</option>
                      <option value="2">Hoàn thành</option>
                      <option value="3">Đã hủy</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <NavLink className="inline-block mx-1 text-blue-600" to={'/admin/order/edit/' + order.id}>
                      <FaEdit title="Chỉnh sửa" />
                    </NavLink>
                    <NavLink className="inline-block mx-1 text-green-600" to={'/admin/order/show/' + order.id}>
                      <FaEye title="Xem chi tiết" />
                    </NavLink>
                    <button onClick={() => handleDelete(order.id)} className="text-red-600 mx-1" title="Xóa">
                      <FaTrash />
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">{order.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border border-gray-300 p-4 text-center text-gray-500">
                  Không tìm thấy đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;