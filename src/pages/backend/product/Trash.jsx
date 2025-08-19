import React, { useEffect, useState } from 'react';
import { FaUndo, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router';
import productService from '../../../services/productService';
import { UrlImg } from '../../../config';

const Trash = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 5,
    current_page: 1,
    last_page: 1
  });

  const loadProducts = async (page = 1) => {
    try {
      const res = await productService.trash(page, pagination.per_page);
      console.log('Trash API Response:', res);

      if (res.success) {
        setProducts(res.products);
        setPagination(res.pagination);
      } else {
        setProducts([]);
        setPagination({
          total: 0,
          per_page: 5,
          current_page: page,
          last_page: 1
        });
        if (res.message) {
          alert(res.message);
        }
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách thùng rác:', error);
      setProducts([]);
      setPagination({
        total: 0,
        per_page: 5,
        current_page: page,
        last_page: 1
      });
      alert('Có lỗi xảy ra khi tải danh sách thùng rác');
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

  const handleRestore = async (id) => {
    if (window.confirm("Bạn có chắc muốn khôi phục sản phẩm này?")) {
      try {
        const res = await productService.restore(id);
        if (res.success) {
          alert(res.message || "Khôi phục sản phẩm thành công");
          await loadProducts(pagination.current_page);
        } else {
          alert(res.message || "Không thể khôi phục sản phẩm");
        }
      } catch (error) {
        console.error('Lỗi khi khôi phục sản phẩm:', error);
        alert("Có lỗi xảy ra khi khôi phục sản phẩm");
      }
    }
  };

  const handleForceDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa vĩnh viễn sản phẩm này? Hành động này không thể hoàn tác!")) {
      try {
        const res = await productService.forceDelete(id);
        if (res.success) {
          alert(res.message || "Xóa vĩnh viễn sản phẩm thành công");
          await loadProducts(pagination.current_page);
        } else {
          alert(res.message || "Không thể xóa vĩnh viễn sản phẩm");
        }
      } catch (error) {
        console.error('Lỗi khi xóa vĩnh viễn sản phẩm:', error);
        alert("Có lỗi xảy ra khi xóa vĩnh viễn sản phẩm");
      }
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto w-full">
      {/* Tiêu đề + nút */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-red-700 uppercase">Thùng rác sản phẩm</h1>
        <NavLink to="/admin/product" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl inline-flex items-center">
          <FaArrowLeft className="mr-1" /> Quay lại
        </NavLink>
      </div>

      {/* Bảng sản phẩm */}
      <div className="p-2 border border-[#cccccc]">
        <table className="border-collapse border border-gray-400 w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="border border-gray-300 p-2 w-28">Hình</th>
              <th className="border border-gray-300 p-2">Tên sản phẩm</th>
              <th className="border border-gray-300 p-2">Danh mục</th>
              <th className="border border-gray-300 p-2">Thương hiệu</th>
              <th className="border border-gray-300 p-2">Ngày xóa</th>
              <th className="border border-gray-300 p-2 text-center">Chức năng</th>
              <th className="border border-gray-300 p-2 w-10 text-center">ID</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  <img
                    src={UrlImg + "product/" + product.thumbnail}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded border"
                  />
                </td>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">{product.category_name}</td>
                <td className="border border-gray-300 p-2">{product.brand_name}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(product.deleted_at).toLocaleDateString('vi-VN')}
                </td>
                <td className="border border-gray-300 p-2 text-center space-x-2">
                  <button
                    onClick={() => handleRestore(product.id)}
                    className="text-green-600 hover:text-green-800 inline-block"
                    title="Khôi phục"
                  >
                    <FaUndo />
                  </button>
                  <button
                    onClick={() => handleForceDelete(product.id)}
                    className="text-red-600 hover:text-red-800 inline-block"
                    title="Xóa vĩnh viễn"
                  >
                    <FaTrash />
                  </button>
                </td>
                <td className="border border-gray-300 p-2 text-center">{product.id}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
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
              className={`px-3 py-1 border rounded ${pagination.current_page === i + 1 ? 'bg-red-500 text-white' : ''}`}
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

export default Trash;