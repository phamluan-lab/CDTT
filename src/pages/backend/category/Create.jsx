import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';  
import categoryService from '../../../services/categoryService';

const Create = () => {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const result = await categoryService.getList();
        setCategorys(result);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    })();
  }, []);

  const handleCategoryStore = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Vui lòng nhập tên danh mục");
      return;
    }

      const category = new FormData();
      category.append('name', name);
      category.append('description', description);
      category.append('parent_id', parentId || 0);  
      category.append('sort_order', Number(sortOrder));
      category.append('status', Number(status));

      // Lấy file hình ảnh từ input
      const imageE = document.getElementById('image');
      const image = imageE?.files?.[0];
      if (image) {
        category.append('image', image);
      }

      // Gọi API để tạo danh mục mới
      await categoryService.create(category);
      navigate('/admin/category');  // Chuyển hướng về danh sách danh mục
  
  };

  return (
    <>
      <form onSubmit={handleCategoryStore}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold uppercase text-green-700">THÊM DANH MỤC</h1>
          <div>
            <button type="submit" className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" /> Lưu
            </button>
            <NavLink to="/admin/category" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
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
                <label htmlFor="parent_id">Danh mục cha</label>
                <select
                  value={parentId}
                  onChange={(e) => setParentId(Number(e.target.value))}
                  id="parent_id"
                  className="p-2 border rounded-xl w-full mt-2"
                >
                  <option value={0}>Chọn danh mục cha</option>
                  {categorys.map((cat, index) => (
                    <option key={index} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

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
