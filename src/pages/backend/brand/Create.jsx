import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import brandervice from '../../../services/brandService';

const Create = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const result = await brandervice.getList();
        setBrand(result);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    })();
  }, []);

  const handleBrandtore = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Vui lòng nhập tên danh mục");
      return;
    }

    try {
    const brand = new FormData();
     brand.append('name', name);
     brand.append('description', description);
     brand.append('sort_order', Number(sortOrder));
     brand.append('status', Number(status));

      // Lấy file hình ảnh từ input
      const imageE = document.getElementById('image');
      const image = imageE?.files?.[0];
      if (image) {
       brand.append('image', image);
      }

      // Gọi API để tạo danh mục mới
      await brandervice.create(brand);
      navigate('/admin/brand'); 
    } catch (error) {
      console.error('Lỗi từ API khi tạo danh mục:', error);
      if (error.response) {
        alert(`Lỗi: ${error.response.data.message || 'Không xác định'}`);
      } else {
        alert('Lỗi không xác định!');
      }
    }
  };

  

  return (
    <>
      <form onSubmit={handleBrandtore}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold uppercase text-green-700">THÊM DANH MỤC</h1>
          <div>
            <button type="submit" className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" /> Lưu
            </button>
            <NavLink to="/admin/brand" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
              <FaArrowLeft className="inline" /> Quay lại
            </NavLink>
          </div>
        </div>

        <div className="p-4 border border-[#cccccc]">
          <div className="flex gap-6">
            <div className="basis-9/12">
              <div className="mb-3">
                <label htmlFor="name">Tên danh mục</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Mô tả</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>
            </div>

            <div className="basis-3/12">
             

              <div className="mb-3">
                <label htmlFor="sort_order">Thứ tự sắp xếp</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  id="sort_order"
                  className="p-2 border rounded-xl w-full mt-2"
                >
                  <option value="0">Chọn vị trí</option>
                  {[...Array(20)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="image">Hình ảnh</label>
                <input type="file" id="image" className="p-2 border rounded-xl w-full mt-2" />
              </div>

              <div className="mb-3">
                <label htmlFor="status">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  id="status"
                  className="p-2 border rounded-xl w-full mt-2"
                >
                  <option value={1}>Hiện</option>
                  <option value={0}>Ẩn</option>
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

