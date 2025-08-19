import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate, useParams } from 'react-router';
import productService from '../../../services/productService';
import categoryService from '../../../services/categoryService';
import brandService from '../../../services/brandService';
import { UrlImg } from '../../../config';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    (async () => {   
      const brands = await brandService.getList();
      const categorys = await categoryService.getList();
      setBrands(brands);
      setCategorys(categorys);     
    })();
  }, []);
  // State cho form
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState(1);
  const [priceBuy, setPriceBuy] = useState(100);
  const [priceSale, setPriceSale] = useState(100);
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [status, setStatus] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const product = await productService.getRow(id);
        console.log("Sản phẩm đã được tìm thấy:", product);

        setName(product.name ?? '');
        setDetail(product.detail ?? '');
        setDescription(product.description ?? '');
        setQty(product.qty ?? 0);
        setPriceBuy(product.price_root ?? 100);
        setPriceSale(product.price_sale ?? 100);
        setCategoryId(product.category_id ?? '');
        setBrandId(product.brand_id ?? '');
        setStatus(Number(product.status ?? 1));
        
        if (product.images) {
          setCurrentImages(product.images);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        alert('Không thể tải dữ liệu sản phẩm');
      }
    })();
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages(files);

    // Tạo preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('detail', detail);
    formData.append('description', description);
    formData.append('qty', qty);
    formData.append('price_buy', priceBuy);
    formData.append('price_sale', priceSale);
    formData.append('category_id', Number(categoryId));
    formData.append('brand_id', Number(brandId));
    formData.append('status', status);
    const thumbnail = document.getElementById('thumbnail')?.files?.[0];
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
        const result = await productService.update(formData, id);
        if (result.success === true) {
            alert("Cập nhật sản phẩm thành công");
            navigate('/admin/product');
        } else {
            alert("Cập nhật sản phẩm thất bại");
        }
    };
  return (
    <form onSubmit={handleUpdate}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold uppercase text-green-700">SỬA SẢN PHẨM</h1>
        <div>
          <button type="submit" className="bg-green-600 p-2 rounded-xl text-white mx-1">
            <FaSave className="inline" /> Lưu
          </button>
          <NavLink to="/admin/product" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
            <FaArrowLeft className="inline" /> Quay lại
          </NavLink>
        </div>
      </div>
      <div className="p-4 border border-[#cccccc]">
        <div className="flex gap-6">
          <div className="basis-9/12">
            <div className="mb-3">
              <label htmlFor="name">Tên sản phẩm</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded-xl w-full mt-1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="detail">Chi tiết</label>
              <textarea
                id="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="p-2 border rounded-xl w-full mt-1"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="description">Mô tả</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border rounded-xl w-full mt-1"
              ></textarea>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="mb-3">
                <label htmlFor="qty">Số lượng</label>
                <input
                  type="number"
                  id="qty"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="priceBuy">Giá gốc</label>
                <input
                  type="number"
                  id="priceBuy"
                  value={priceBuy}
                  onChange={(e) => setPriceBuy(e.target.value)}
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="priceSale">Giá khuyến mãi</label>
                <input
                  type="number"
                  id="priceSale"
                  value={priceSale}
                  onChange={(e) => setPriceSale(e.target.value)}
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>
            </div>
          </div>

          <div className="basis-3/12">
            <div className="mb-3">
              <label htmlFor="category_id">Danh mục</label>
              <select
                id="category_id"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="p-2 border rounded-xl w-full mt-2"
              >
                <option value="">Chọn danh mục</option>
                {categorys.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="brand_id">Thương hiệu</label>
              <select
                id="brand_id"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="p-2 border rounded-xl w-full mt-2"
              >
                <option value="">Chọn thương hiệu</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="thumbnail">Hình ảnh chính</label>
              <input
                type="file"
                id="thumbnail"
                className="p-2 border rounded-xl w-full mt-2"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="images">Hình ảnh chi tiết</label>
              <input
                type="file"
                id="images"
                multiple
                onChange={handleImageChange}
                className="p-2 border rounded-xl w-full mt-2"
              />
            </div>

            {/* Hiển thị hình ảnh hiện tại */}
            {currentImages.length > 0 && (
              <div className="mb-3">
                <label className="block mb-2">Hình ảnh hiện tại</label>
                <div className="grid grid-cols-3 gap-2">
                  {currentImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={UrlImg + "product/" + image.thumbnail}
                        alt={`Hình ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hiển thị preview hình ảnh mới */}
            {previewImages.length > 0 && (
              <div className="mb-3">
                <label className="block mb-2">Hình ảnh mới</label>
                <div className="grid grid-cols-3 gap-2">
                  {previewImages.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="status">Trạng thái</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(Number(e.target.value))}
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
