// src/pages/HistoryPage.jsx
import React from 'react';
import TransactionHistory from '../components/TransactionHistory';
import { motion } from 'framer-motion';

const HistoryPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="container mx-auto p-4 sm:p-6 pb-20 sm:pb-4 min-h-screen">
      <div className="w-full px-4 lg:px-8 py-6">
        {/* Judul halaman */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Riwayat Transaksi 🕰️</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Lihat semua transaksi yang telah dilakukan</p>
        </div>

        {/* Grid transaksi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <TransactionHistory />
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryPage;
