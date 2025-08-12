import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import productService from '../../services/productService';
import ProductCard from '../../components/frontend/ProductCard';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductsByCategory(categoryId);
        setProducts(data);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sản phẩm theo danh mục</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Không có sản phẩm nào trong danh mục này
        </div>
      )}
    </div>
  );
};

export default Products; 