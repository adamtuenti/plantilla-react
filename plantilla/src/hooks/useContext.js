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


  const removeFromCart = () => {
    console.log(cartItems)
    console.log('aca')
    const storedCartItems = JSON.parse(localStorage.getItem('productos')) || [];
    console.log(storedCartItems, storedCartItems.length)
    //const updatedCartItems = cartItems.slice(0, -1);
    setCartItems([...storedCartItems]);
  }



  useEffect(() => {
    // Recuperar elementos del carrito almacenados en localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('productos')) || [];
    setCartItems(storedCartItems);
  }, []);

  const cartItemCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartItemCount, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
