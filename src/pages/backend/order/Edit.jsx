import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaSave } from 'react-icons/fa'
import { NavLink, useNavigate, useParams } from 'react-router'
import orderService from '../../../services/orderService';
import userService from '../../../services/userService';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userid, setUserId] = useState([]);
  const [users, setUsers] = useState([]); 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersData, orderData] = await Promise.all([
          userService.list(),
          orderService.getRow(id)
        ]);
        setUsers(usersData);
        setUserId(orderData.userid);
        setName(orderData.name);
        setPhone(orderData.phone);
        setEmail(orderData.email);
        setAddress(orderData.address);
        setNote(orderData.note);
        setStatus(Number(orderData.status ?? 0));
      } catch (err) {
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Ensure all required fields have values
      if (!name?.trim() || !phone?.trim() || !email?.trim() || !address?.trim()) {
        setError('Vui lòng điền đầy đủ thông tin bắt buộc');
        setLoading(false);
        return;
      }

      const orderData = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        note: note?.trim() || '',
        status: status || 0,
        userid: userid || null
      };

      const result = await orderService.update(orderData, id);

      if (result.success) {
        alert(result.message || "Cập nhật đơn hàng thành công");
        navigate('/admin/order');
      } else {
        setError(result.message || "Cập nhật đơn hàng thất bại");
      }
    } catch (err) {
      console.error('Error updating order:', err);
      setError(err.message || 'Có lỗi xảy ra khi cập nhật đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className=''>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='font-bold uppercase text-blue-700'>CẬP NHẬT ĐƠN HÀNG</h1>
        <div className=''>
          <button 
            type='submit' 
            onClick={handleUpdate}
            disabled={loading}
            className="bg-green-600 p-2 rounded-xl text-white mx-1"
          >
            <FaSave className="inline" /> Lưu
          </button>
          <NavLink to="/admin/order" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
            <FaArrowLeft className="inline" /> Quay lại
          </NavLink>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className='p-4 border border-[#cccccc]'>
        <div className="flex gap-6">
          <div className='basis-9/12'>
            <div className='mb-3'>
              <label htmlFor='name' className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                type='text' 
                id='name' 
                className='p-2 border rounded-xl w-full mt-1' 
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='phone' className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                type='tel' 
                id='phone' 
                className='p-2 border rounded-xl w-full mt-1'
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type='email' 
                id='email' 
                className='p-2 border rounded-xl w-full mt-1'
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='address' className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
              <textarea 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                id='address' 
                rows="3"
                className='p-2 border rounded-xl w-full mt-1'
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='note' className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
              <textarea 
                value={note} 
                onChange={(e) => setNote(e.target.value)} 
                id='note' 
                rows="3"
                className='p-2 border rounded-xl w-full mt-1'
              />
            </div>
          </div>

          <div className='basis-3/12'>
            <div className='mb-3'>
              <label htmlFor='user_id' className="block text-sm font-medium text-gray-700 mb-1">Người dùng</label>
              <select
                value={userid || ""} 
                onChange={(e) => setUserId(parseInt(e.target.value, 10))}
                id="user_id"
                className="p-2 border rounded-xl w-full mt-1"
                required
              >
                <option value="">-- Chọn người dùng --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='status' className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(Number(e.target.value))} 
                id="status" 
                className={`p-2 border rounded-xl w-full mt-1 ${getStatusBadgeClass(status)}`}
              >
                <option value={0}>Chờ xử lý</option>
                <option value={1}>Đang xử lý</option>
                <option value={2}>Hoàn thành</option>
                <option value={3}>Đã hủy</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
