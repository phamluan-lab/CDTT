import React from 'react';
import { Link } from 'react-router';
import { UrlImg } from '../../config';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
                src={UrlImg + "product/" + product.thumbnail}
                alt={product.name}
                className="w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-red-600 font-bold text-xl">
                        {product.price_root.toLocaleString('vi-VN')}đ
                    </span>
                    <div className="flex gap-2">
                        <Link
                            to={`/san-pham/${product.slug}`}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-center"
                        >
                            Xem chi tiết
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 