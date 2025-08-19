import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import brandService from '../../services/brandService';
import { UrlImg } from '../../config';
import Breadcrumb from '../frontend/home/BreadCrumb';
import ProductCard from '../../components/frontend/ProductCard';

const Product = () => {
  const [cartItems, setCartItems] = useState([]);

  const [keyword, setKeyword] = useState("");  // Lưu từ khóa tìm kiếm
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  const [listcat, setListCat] = useState([]);
  const [listbrand, setListBrand] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;  // Giới hạn số sản phẩm trên mỗi trang

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      // Tăng số lượng nếu đã có
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Thêm mới
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Fetch sản phẩm từ API mỗi khi page, listcat, listbrand hoặc keyword thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productService.productall(listcat, listbrand, page, limit, keyword);  // Gọi API với keyword
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [page, listcat, listbrand, keyword]);

  // Fetch danh sách categories và brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResult, brandsResult] = await Promise.all([
          categoryService.getList(),
          brandService.getList()
        ]);
        
        if (categoriesResult) {
          setCategorys(categoriesResult);
        }
        if (brandsResult) {
          setBrands(brandsResult);
        }
      } catch (error) {
        console.error("Error fetching categories/brands:", error);
      }
    };

    fetchData();
  }, []);

  // Handle phân trang
  const handlePage = (number) => {
    setPage(number);
  };

  // Handle checkbox categories
  const handCheckCategory = () => {
    const checkListCat = document.querySelectorAll(".catid");
    const selectedCategories = Array.from(checkListCat)
      .filter(element => element.checked)
      .map(element => parseInt(element.value));
    setListCat(selectedCategories);
    setPage(1); // Reset về trang 1 khi filter
  };

  // Handle checkbox brands
  const handBrandList = () => {
    const checkListBrand = document.querySelectorAll(".brandid");
    const selectedBrands = Array.from(checkListBrand)
      .filter(element => element.checked)
      .map(element => parseInt(element.value));
    setListBrand(selectedBrands);
    setPage(1); // Reset về trang 1 khi filter
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Sản phẩm', to: '/san-pham' },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb items={breadcrumbItems} />
      {/* Tìm kiếm sản phẩm */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
        <div className="flex w-1/2">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setPage(1)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-400"
          />
          <button
            onClick={() => setPage(1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Bộ lọc bên trái */}
        <aside className="col-span-3 bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Bộ lọc</h3>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">Danh mục</h4>
            {categorys && categorys.map((cat) => (
              <div key={cat.id} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={`cat-${cat.id}`}
                  value={cat.id}
                  className="catid mr-2"
                  onChange={handCheckCategory}
                />
                <label htmlFor={`cat-${cat.id}`}>{cat.name}</label>
              </div>
            ))}
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-md font-semibold mb-2">Thương hiệu</h4>
            {brands && brands.map((brand) => (
              <div key={brand.id} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={`brand-${brand.id}`}
                  value={brand.id}
                  className="brandid mr-2"
                  onChange={handBrandList}
                />
                <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
              </div>
            ))}
          </div>
        </aside>

        {/* Danh sách sản phẩm */}
        <main className="col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 mt-8">
                <p>Không có sản phẩm nào phù hợp với tìm kiếm của bạn.</p>
              </div>
            )}
          </div>

          {/* Phân trang */}
          <div className="mt-10 flex justify-center space-x-2">
            <button
              onClick={() => handlePage(1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${page === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              ««
            </button>
            <button
              onClick={() => handlePage(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${page === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              «
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handlePage(num)}
                className={`px-3 py-1 rounded ${page === num ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handlePage(page + 1)}
              disabled={page === 5}
              className={`px-3 py-1 rounded ${page === 5 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              »
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Product;
