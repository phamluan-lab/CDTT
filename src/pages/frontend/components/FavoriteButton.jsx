import React from 'react';
import { useFavorite } from '../contexts/FavoriteContext';

const FavoriteButton = ({ productId }) => {
    const { isFavorited, toggleFavorite } = useFavorite();

    const handleClick = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định
        e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
        toggleFavorite(productId);
    };

    return (
        <button
            onClick={handleClick}
            className={`p-2 rounded-full transition-colors duration-200
                ${isFavorited(productId) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500 hover:bg-red-100 hover:text-red-500'}
            `}
            title={isFavorited(productId) ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
        >
            <svg
                className="w-6 h-6"
                fill={isFavorited(productId) ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
            </svg>
        </button>
    );
};

export default FavoriteButton; 