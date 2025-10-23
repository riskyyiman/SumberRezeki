// src/pages/CartPage.jsx
import React from 'react';
import Cart from '../components/Cart';
import { motion } from 'framer-motion';

const CartPage = () => {
  return (
    <motion.div initial={{ x: '100vw' }} animate={{ x: 0 }} exit={{ x: '-100vw' }} transition={{ type: 'spring', stiffness: 100, damping: 20 }} className="container mx-auto p-4 sm:p-6 pb-20 sm:pb-4 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 lg:hidden">Keranjang Belanja 🛒</h1>
        <div className="h-full">
          <Cart />
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
