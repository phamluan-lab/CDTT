import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate, useParams } from 'react-router';
import bannerService from '../../../services/bannerService';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banners, setbanners] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('top');
  const [link, setLink] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);
  useEffect(() => {
    (async () => {
      const banners = await bannerService.getList();
      setbanners(banners);
    })();
  }, []);
  // Lấy dữ liệu banner để chỉnh sửa
  useEffect(() => {
    (async () => {
      const banner = await bannerService.getRow(id);
      console.log('Danh mục đã được tìm thấy:', banner);
      setName(banner?.name || '');
      setDescription(banner?.description || '');
      setPosition(banner?.position || 'slideshow');
      setLink(banner?.link || '');
      setSortOrder(banner?.sort_order || 1);
      setStatus(Number(banner?.status ?? 1));

    })();
  }, [id]);
  const handleUpdate = async (event) => {
    event.preventDefault();


    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('position', position);
    formData.append('link', link);
    formData.append('sort_order', Number(sortOrder));
    formData.append('status', Number(status));

    const imageE = document.getElementById('image');
    const image = imageE?.files?.[0];
    if (image) {
      formData.append('image', image);
    }

    const result = await bannerService.update(formData, id);
    if (result.success) {
      alert('Cập nhật banner thành công');
      navigate('/admin/banner');
    } else {
      alert('Cập nhật banner thất bại');
    }

  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold uppercase text-green-700">THÊM BANNER</h1>
          <div>
            <button type="submit" className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" /> Lưu
            </button>
            <NavLink to="/admin/banner" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
              <FaArrowLeft className="inline" /> Quay lại
            </NavLink>
          </div>
        </div>

        <div className="p-4 border border-[#cccccc]">
          <div className="flex gap-6">
            <div className="basis-9/12">
              <div className="mb-3">
                <label htmlFor="name">Tên banner</label>
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
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                id="position"
                className="p-2 border rounded-xl w-full mt-2"
              >
                <option value="">-- Chọn vị trí --</option>
                <option value="slideshow">Slideshow</option>
                <option value="ads">Ads</option>
              </select>



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
            </div>

            <div className="basis-3/12">
              <div className="mb-3">
                <label htmlFor="sort_order">Sắp xếp</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  id="sort_order"
                  className="p-2 border rounded-xl w-full mt-2"
                >
                  <option value="">-- Chọn thứ tự --</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="image">Hình ảnh</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="p-2 border rounded-xl w-full mt-2"
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

export default Edit;


