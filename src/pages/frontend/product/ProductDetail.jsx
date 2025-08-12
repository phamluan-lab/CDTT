import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import productService from '../../../services/productService';
import { UrlImg } from '../../../config';
import { useCart } from '../home/CartContext';
import Breadcrumb from '../../frontend/home/BreadCrumb';
import  FavoriteButton from '../components/FavoriteButton';


const ProductDetail = () => {
  const { addToCart } = useCart();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const result = await productService.getBySlug(slug, 4);
        setProduct(result.product);
        setRelatedProducts(result.relatedProducts);
        // Set ảnh đầu tiên làm ảnh được chọn
        if (result.product && result.product.images && result.product.images.length > 0) {
          setSelectedImage(result.product.images[0]);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Sản phẩm', to: '/san-pham' },
    { label: product ? product.name : 'Đang tải...' },
  ];

  if (loading) return <div className="flex justify-center items-center min-h-screen"><p className="text-xl">Đang tải dữ liệu...</p></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen"><p className="text-xl text-red-500">{error}</p></div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Breadcrumb items={breadcrumbItems} />
      {product ? (
        <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6 mt-6">
          {/* Phần hình ảnh */}
          <div className="space-y-4">
            {/* Ảnh chính */}
            <div className="overflow-hidden">
              <img
                src={selectedImage ? UrlImg + "product/" + selectedImage.thumbnail : UrlImg + "product/" + product.thumbnail}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              <div 
                className={`border rounded-lg overflow-hidden cursor-pointer ${!selectedImage ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedImage(null)}
              >
                <img
                  src={UrlImg + "product/" + product.thumbnail}
                  alt={product.name}
                  className="w-full h-20 object-cover"
                />
              </div>
              {product.images && product.images.map((image, index) => (
                <div 
                  key={image.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer ${selectedImage && selectedImage.id === image.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={UrlImg + "product/" + image.thumbnail}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-30 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Phần thông tin sản phẩm */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            
            <div className="flex items-center space-x-4">
              {product.price_root > product.price_sale ? (
                <>
                  <span className="text-2xl font-bold text-red-600">
                    {product.price_sale.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {product.price_root.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Giảm {Math.round((1 - product.price_sale / product.price_root) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-red-600">
                  {product.price_root.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>

            <div className="border-t border-b py-4">
              <p className="text-gray-600">Mô tả: {product.description}</p>
             
            </div>
            <div className=" border-b py-4">
              <p className="text-gray-600">Chi tiết: {product.detail}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Số lượng còn lại: {product.qty}</span>
            </div>

            <div className="flex space-x-4 mt-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold"
              >
                Thêm vào giỏ hàng
              </button>
              {product.id && <FavoriteButton productId={product.id} />}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl mt-8">Không tìm thấy sản phẩm này</p>
      )}

      {/* Sản phẩm liên quan */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={UrlImg + "product/" + relatedProduct.thumbnail}
                  alt={relatedProduct.name}
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                  <div className="flex justify-between items-center">
                    {relatedProduct.price_root > relatedProduct.price_sale ? (
                      <>
                        <span className="text-red-600 font-bold">
                          {relatedProduct.price_sale.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="text-gray-500 line-through">
                          {relatedProduct.price_root.toLocaleString('vi-VN')}₫
                        </span>
                      </>
                    ) : (
                      <span className="text-red-600 font-bold">
                        {relatedProduct.price_root.toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    
    </div>
  );
};

export default ProductDetail;
