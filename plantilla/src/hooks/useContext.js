import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };



  useEffect(() => {
    // Recuperar elementos del carrito almacenados en localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('productos')) || [];
    setCartItems(storedCartItems);
  }, []);

  const cartItemCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
}
