import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate, useParams } from 'react-router';
import categoryService from '../../../services/categoryService';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);

  // Lấy danh sách danh mục cha
  useEffect(() => {
    (async () => {       
        const categorys = await categoryService.getList();
        setCategorys(categorys);     
    })();
  }, []);

  // Lấy dữ liệu danh mục để chỉnh sửa
  useEffect(() => {
    (async () => {
      const category = await categoryService.getRow(id);
      console.log('Danh mục đã được tìm thấy:', category);
      setName(category.name || '');
      setDescription(category.description || '');
      setParentId(category.parentId || 0);
      setSortOrder(category.sortOrder || 0);
      setStatus(Number(category.status || 1));
    })();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('parent_id', parentId || 0);
    formData.append('sort_order', Number(sortOrder));
    formData.append('status', Number(status));

    // Lấy file hình ảnh từ input
    const imageE = document.getElementById('image');
    const image = imageE?.files?.[0];
    if (image) {
      formData.append('image', image);
    }

    const result = await categoryService.update(formData, id);
    if (result.success) {
      alert('Cập nhật danh mục thành công');
      navigate('/admin/category');
    } else {
      alert('Cập nhật danh mục thất bại');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold uppercase text-green-700">CHỈNH SỬA DANH MỤC</h1>
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
                {categorys.map((cat) => (
                  <option key={cat.id} value={cat.id}>
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
  );
};

export default Edit;
