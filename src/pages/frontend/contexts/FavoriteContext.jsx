import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Đọc danh sách yêu thích từ localStorage khi component được tải
    useEffect(() => {
        const favoriteItems = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('favorite_') && localStorage.getItem(key) === 'true') {
                const productId = key.replace('favorite_', '');
                favoriteItems.push(productId);
            }
        }
        setFavorites(favoriteItems);
    }, []);

    // Thêm hoặc xóa sản phẩm khỏi danh sách yêu thích
    const toggleFavorite = (productId) => {
        const newStatus = !favorites.includes(productId);
        localStorage.setItem(`favorite_${productId}`, newStatus);
        
        if (newStatus) {
            setFavorites([...favorites, productId]);
        } else {
            setFavorites(favorites.filter(id => id !== productId));
        }
    };

    // Kiểm tra xem sản phẩm có trong danh sách yêu thích không
    const isFavorited = (productId) => {
        return favorites.includes(productId);
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorited }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error('useFavorite must be used within a FavoriteProvider');
    }
    return context;
}; 