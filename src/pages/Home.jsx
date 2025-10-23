// src/pages/Home.jsx
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { usePos } from '../context/PosContext';
import { productCategories } from '../data/products';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const { products } = usePos();
  const [selectedCategory, setSelectedCategory] = useState('Semua Produk');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products
    .filter(
      (product) =>
        // 1. Filter berdasarkan Kategori
        selectedCategory === 'Semua Produk' || product.category === selectedCategory
    )
    .filter(
      (product) =>
        // 2. Filter berdasarkan Search Query (case-insensitive)
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="container mx-auto p-4 sm:p-6 pb-20 sm:pb-4 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Product Catalog Area (Katalog akan mengambil 2/3 atau 3/4 layar desktop) */}
        <div className="lg:col-span-2 xl:col-span-3">
          {/* Header: Sekarang terlihat di semua ukuran layar */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Barang 🛒</h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Cari produk atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-tosca transition-all"
            />
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-red-500 p-1 rounded-full transition" aria-label="Clear Search">
                <X size={18} />
              </button>
            )}
          </div>

          {/* Navigasi Kategori */}
          <div className="flex space-x-3 overflow-x-auto whitespace-nowrap pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            {productCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category && !searchQuery
                    ? 'bg-tosca text-white shadow-md'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-light-gray dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                }`}
                disabled={searchQuery.length > 0 && category !== 'Semua Produk'}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Produk: 2 kolom di Mobile, 4 kolom di Desktop (sesuai spesifikasi awal) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-10">{searchQuery ? `Tidak ada produk yang cocok dengan "${searchQuery}".` : 'Tidak ada produk di kategori ini.'}</p>}
        </div>

        {/* Cart Sidebar (1/3 atau 1/4 lebar di desktop, Sembunyi di mobile) */}
        <div className="hidden lg:block lg:col-span-1 xl:col-span-1">
          <div className="sticky top-[80px] h-[calc(100vh-100px)]">
            <Cart />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
