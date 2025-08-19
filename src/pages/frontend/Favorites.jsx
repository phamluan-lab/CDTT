import React, { useState, useEffect } from 'react';
import { useFavorite } from './contexts/FavoriteContext';
import productService from '../../services/productService';
import { UrlImg } from '../../config';
import { Link } from 'react-router';
import ProductDetail from '../frontend/product/ProductDetail';

const Favorites = () => {
    const { favorites, toggleFavorite } = useFavorite();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                const products = await Promise.all(
                    favorites.map(async (productId) => {
                        const product = await productService.getRow(productId);
                        return product;
                    })
                );
                setFavoriteProducts(products.filter(product => product)); // Lọc bỏ các sản phẩm null
            } catch (error) {
                console.error('Error fetching favorite products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (favorites.length > 0) {
            fetchFavoriteProducts();
        } else {
            setLoading(false);
        }
    }, [favorites]);

    const handleRemoveFavorite = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId);
    };

    if (loading) {
        return (
            <div className="container mx-auto py-8">
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Sản phẩm yêu thích</h1>
            
            {favoriteProducts.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">Bạn chưa có sản phẩm yêu thích nào.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {favoriteProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                            <img
                                src={UrlImg + "product/" + product.thumbnail}
                                alt={product.name}
                                className="w-full object-cover"
                            />
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={(e) => handleRemoveFavorite(e, product.id)}
                                    className="bg-gray-200 text-gray-500 rounded-full p-2 hover:bg-red-500 hover:text-white transition-colors duration-200"
                                    title="Xóa khỏi yêu thích"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500 font-bold">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(product.price_sale)}
                                        </span>
                                        {product.price_root > product.price_sale && (
                                            <span className="line-through text-gray-500 text-sm">{product.price_root?.toLocaleString('vi-VN')}₫</span>
                                        )}
                                    </div>
                                    <Link
                                        to={`/san-pham/${product.slug}`}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-center"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites; 