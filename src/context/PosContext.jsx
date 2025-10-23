// src/context/PosContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { products as initialProducts } from '../data/products';

const PosContext = createContext();

const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
const initialHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];

export const PosProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState(initialCart);
  const [transactionHistory, setTransactionHistory] = useState(initialHistory);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Persist transaction history
  useEffect(() => {
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
  }, [transactionHistory]);

  // Persist dark mode state
  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Validasi stok
        const productInStock = products.find((p) => p.id === product.id);
        if (existingItem.quantity >= productInStock.stock) {
          alert(`Stok ${product.name} habis!`);
          return prevCart;
        }
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      const productInStock = products.find((p) => p.id === id);
      if (newQuantity > productInStock.stock) {
        alert(`Stok ${productInStock.name} hanya ${productInStock.stock}!`);
        return prevCart;
      }
      return prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)).filter((item) => item.quantity > 0); // Hapus jika quantity 0
    });
  };

  const removeItemFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const resetCart = () => {
    setCart([]);
  };

  const calculateTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) {
      alert('Keranjang belanja kosong!');
      return false;
    }

    // 1. Validasi Stok Akhir (sebelum pengurangan)
    for (const cartItem of cart) {
      const productData = products.find((p) => p.id === cartItem.id);
      if (!productData || cartItem.quantity > productData.stock) {
        alert(`Checkout Gagal: Stok ${cartItem.name} tidak mencukupi!`);
        return false;
      }
    }

    // 2. Kurangi Stok
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const itemInCart = cart.find((item) => item.id === product.id);
        if (itemInCart) {
          return { ...product, stock: product.stock - itemInCart.quantity };
        }
        return product;
      })
    );

    // 3. Catat Transaksi
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: calculateTotal,
    };
    setTransactionHistory((prevHistory) => [newTransaction, ...prevHistory]);

    // 4. Reset Keranjang
    resetCart();
    alert(`Pembayaran berhasil! Total: Rp ${calculateTotal.toLocaleString('id-ID')}`);
    return true;
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    products,
    cart,
    transactionHistory,
    calculateTotal,
    isDarkMode,
    toggleDarkMode,
    addToCart,
    updateCartItemQuantity,
    removeItemFromCart,
    resetCart,
    checkout,
  };

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};

export const usePos = () => useContext(PosContext);
