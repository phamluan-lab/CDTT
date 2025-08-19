import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate, useParams } from 'react-router';
import brandService from '../../../services/brandService';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brands, setbrands] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);

  // Lấy danh sách danh mục cha
  useEffect(() => {
    (async () => {       
        const brands = await brandService.getList();
        setbrands(brands);     
    })();
  }, []);

  // Lấy dữ liệu danh mục để chỉnh sửa
  useEffect(() => {
    (async () => {
      const brand = await brandService.getRow(id);
      console.log('Danh mục đã được tìm thấy:', brand);
      setName(brand.name || '');
      setDescription(brand.description || '');
      setSortOrder(brand.sortOrder || 0);
      setStatus(Number(brand.status || 1));
    })();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('sort_order', Number(sortOrder));
    formData.append('status', Number(status));

    // Lấy file hình ảnh từ input
    const imageE = document.getElementById('image');
    const image = imageE?.files?.[0];
    if (image) {
      formData.append('image', image);
    }

    const result = await brandService.update(formData, id);
    if (result.success) {
      alert('Cập nhật thương hiệu thành công');
      navigate('/admin/brand');
    } else {
      alert('Cập nhật thương hiệu thất bại');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold uppercase text-green-700">CHỈNH SỬA THƯƠNG HIỆU</h1>
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
              <label htmlFor="name">Tên thương hiệu</label>
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
  );
};

export default Edit;
