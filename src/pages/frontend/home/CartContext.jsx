import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.quantity * item.price_root, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, getTotalPrice, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
