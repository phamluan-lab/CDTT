import React from 'react';
import { useFavorite } from '../contexts/FavoriteContext';
import { Link } from 'react-router';

const FavoriteCount = () => {
    const { favorites } = useFavorite();

    return (
        <Link to="/favorites" className="relative inline-block">
            <svg
                className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors duration-200"
                fill="none"
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
            {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                </span>
            )}
        </Link>
    );
};

export default FavoriteCount; 