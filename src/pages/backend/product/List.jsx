import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router'
import productService from '../../../services/productService';
import { UrlImg } from '../../../config';

const List = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 5,
    current_page: 1,
    last_page: 1
  });

  const loadProducts = async (page = 1) => {
    try {
      const res = await productService.list(page, pagination.per_page);
      console.log('Load products response:', res); // Log để debug

      if (res && Array.isArray(res.products)) {
        setProducts(res.products);
        setPagination({
          total: res.total || 0,
          per_page: res.per_page || 5,
          current_page: res.current_page || page,
          last_page: res.last_page || 1
        });
      } else {
        setProducts([]);
        setPagination({
          total: 0,
          per_page: 5,
          current_page: page,
          last_page: 1
        });
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
      setPagination({
        total: 0,
        per_page: 5,
        current_page: page,
        last_page: 1
      });
    }
  };

  useEffect(() => {
    loadProducts(1);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      loadProducts(page);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
      try {
        await productService.delete(id);
        loadProducts(); // Làm mới danh sách sau khi xóa
      } catch (err) {
        setError('Không thể xóa sản phẩm. Vui lòng thử lại sau.');
        console.error('Lỗi khi xóa sản phẩm:', err);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    await productService.changeStatus(id);
    loadProducts(pagination.current_page);
  };

  return (
    <div className="flex-1 p-6 overflow-auto w-full">
      {/* Tiêu đề + nút */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-black uppercase">Danh sách sản phẩm</h1>
        <div>
          <NavLink to="/admin/product/create" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl mr-2 inline-flex items-center">
            <FaPlus className="mr-1" /> Thêm mới
          </NavLink>
          <NavLink to="/admin/product/trash" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl inline-flex items-center">
            <FaTrash className="mr-1" /> Thùng rác
          </NavLink>
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <div className="p-2 border border-[#cccccc]">
        <table className="border-collapse border border-gray-400 w-full">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="border border-gray-300 p-2 w-28">Hình</th>
              <th className="border border-gray-300 p-2">Tên sản phẩm</th>
              <th className="border border-gray-300 p-2">Danh mục</th>
              <th className="border border-gray-300 p-2">Thương hiệu</th>
              <th className="border border-gray-300 p-2">Trạng thái</th>
              <th className="border border-gray-300 p-2 text-center">Chức năng</th>
              <th className="border border-gray-300 p-2 w-10 text-center">ID</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const statusIcon = product.status === 1
                ? <FaToggleOn className="text-green-500 text-lg cursor-pointer" />
                : <FaToggleOff className="text-red-500 text-lg cursor-pointer" />;

              return (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 w-80"> {/* tăng w-28 thành w-60 */}
                    <div className="flex flex-row items-center gap-3">
                      {/* Thumbnail chính */}
                      <img
                        src={UrlImg + "product/" + product.thumbnail}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      {/* Tất cả hình chi tiết */}
                      {product.images && product.images.length > 0 && (
                        <div className="flex flex-row gap-3">
                          {product.images.map((img, idx) => (
                            <img
                              key={img.id || idx}
                              src={UrlImg + "product/" + img.thumbnail}
                              alt={`Chi tiết ${idx + 1}`}
                              className="w-20 h-20 object-cover border rounded"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">{product.name}</td>
                  <td className="border border-gray-300 p-2">{product.catname}</td>
                  <td className="border border-gray-300 p-2">{product.brandname}</td>
                  <td className="border border-gray-300 p-2">
                    {product.status === 1 ? (
                      <span className="text-green-600 font-semibold">Hiện</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Ẩn</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 text-center space-x-2">
                    <button
                      onClick={() => handleToggleStatus(product.id)}
                      className="inline-block focus:outline-none"
                      title="Đổi trạng thái"
                    >
                      {statusIcon}
                    </button>
                    <NavLink to={`/admin/product/edit/${product.id}`} className="text-blue-600 hover:text-blue-800 inline-block">
                      <FaEdit />
                    </NavLink>
                    <NavLink to={`/admin/product/show/${product.id}`} className="text-green-600 hover:text-green-800 inline-block">
                      <FaEye />
                    </NavLink>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 inline-block">
                      <FaTrash />
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{product.id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* PHÂN TRANG */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &lt;
          </button>
          {[...Array(pagination.last_page)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${pagination.current_page === i + 1 ? 'bg-blue-500 text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default List
