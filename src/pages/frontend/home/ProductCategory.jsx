import React, { useEffect, useState } from 'react';
import categoryService from '../../../services/categoryService';
import productService from '../../../services/productService';
import { UrlImg } from '../../../config';
import { useNavigate } from 'react-router';
import ProductCard from '../../../ProductCard';

const ProductCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Lấy danh mục khi load component
  useEffect(() => {
    (async () => {
      try {
        const data = await categoryService.categorylist(0);
        setCategories(data);
        if (data.length > 0) setSelectedCat(data[0].id); // Chọn mặc định danh mục đầu tiên
      } catch (err) {
        setCategories([]);
      }
    })();
  }, []);

  // Lấy sản phẩm khi chọn danh mục
  useEffect(() => {
    if (!selectedCat) return;
    setLoadingProducts(true);
    (async () => {
      try {
        const data = await productService.getProductsByCategory(selectedCat, 20);
        setProducts(data);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, [selectedCat]);

  return (
    <section className="mb-8">
      <h1 className="text-2xl text-center mb-4">
        <strong className="border-b-3">Sản phẩm theo danh mục</strong>
      </h1>
      {/* Thanh trượt danh mục */}
      <div className="overflow-x-auto whitespace-nowrap flex gap-2 py-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-2 rounded-full border transition 
              ${selectedCat === cat.id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* Danh sách sản phẩm */}
      {loadingProducts ? (
        <div className="text-center py-8">Đang tải sản phẩm...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">Không có sản phẩm nào.</div>
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductCategory;