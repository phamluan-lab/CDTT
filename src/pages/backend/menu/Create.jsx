import React, { useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import menuService from '../../../services/menuService';

const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [parentId, setParentId] = useState(0);
  const [sortOrder, setSortOrder] = useState(1);
  const [type, setType] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState(1);

  const handleMenuStore = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("Vui lòng nhập tên menu!");
      return;
    }

    if (!type) {
      alert("Vui lòng chọn loại menu!");
      return;
    }

    if (!position) {
      alert("Vui lòng chọn vị trí menu!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('link', link);
      formData.append('parent_id', parentId);
      formData.append('sort_order', sortOrder);
      formData.append('type', type);
      formData.append('position', position);
      formData.append('status', status);

      const result = await menuService.create(formData);
      if (result.success) {
        alert('Thêm menu thành công!');
        navigate('/admin/menu');
      } else {
        alert(result.message || 'Thêm menu thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi tạo menu:', error);
      if (error.response?.data?.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert('Lỗi không xác định!');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleMenuStore}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold uppercase text-green-700">THÊM MENU</h1>
          <div>
            <button type="submit" className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" /> Lưu
            </button>
            <NavLink to="/admin/menu" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
              <FaArrowLeft className="inline" /> Quay lại
            </NavLink>
          </div>
        </div>

        <div className="p-4 border border-[#cccccc]">
          <div className="flex gap-6">
            <div className="basis-9/12">
              <div className="mb-3">
                <label htmlFor="name">Tên menu</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  className="p-2 border rounded-xl w-full mt-1"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="link">Liên kết</label>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  type="text"
                  id="link"
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="type">Loại menu</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  id="type"
                  className="p-2 border rounded-xl w-full mt-2"
                  required
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="custom">Custom</option>
                  <option value="category">Category</option>
                  <option value="page">Page</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="position">Vị trí</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  id="position"
                  className="p-2 border rounded-xl w-full mt-2"
                  required
                >
                  <option value="">-- Chọn vị trí --</option>
                  <option value="mainmenu">Main Menu</option>
                  <option value="footermenu">Footer Menu</option>
                </select>
              </div>
            </div>

            <div className="basis-3/12">
              <div className="mb-3">
                <label htmlFor="parent_id">Menu cha</label>
                <input
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  type="number"
                  id="parent_id"
                  className="p-2 border rounded-xl w-full mt-1"
                  min="0"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="sort_order">Thứ tự</label>
                <input
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  type="number"
                  id="sort_order"
                  className="p-2 border rounded-xl w-full mt-1"
                  min="1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="status">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  id="status"
                  className="p-2 border rounded-xl w-full mt-2"
                >
                  <option value="1">Hiện</option>
                  <option value="0">Ẩn</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
