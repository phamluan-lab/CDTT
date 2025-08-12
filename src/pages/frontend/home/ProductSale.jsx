import React, { useEffect, useState } from 'react'
import ProductCard from '../../../ProductCard';
import productService from '../../../services/productService';

const ProductSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await productService.productsale(4);
        console.log('Response from service (products array):', productsData); // Log dữ liệu nhận được

        // Kiểm tra nếu dữ liệu nhận được là một mảng
        if (Array.isArray(productsData)) {
          setProducts(productsData); // Set state với mảng sản phẩm
        } else {
          console.log('Service did not return a valid products array:', productsData);
          setProducts([]); // Đặt mảng rỗng nếu không hợp lệ
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setError('Có lỗi xảy ra khi tải dữ liệu');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Log để debug
  console.log('Current products state:', products);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className='mt-5'>
      <h1 className='text-2xl text-center py-4'>
        <strong>Sản phẩm khuyến mãi</strong>
      </h1>
      <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
        {products && products.length > 0 ? (
          products.map((item) => (
            <ProductCard 
              key={item.id}
              product={item}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-4">
            Không có sản phẩm khuyến mãi
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductSale