// src/pages/ReportPage.jsx
import React, { useMemo } from 'react';
import { usePos } from '../context/PosContext';
import ReportCard from '../components/ReportCard';
import { motion } from 'framer-motion';

const ReportPage = () => {
  const { transactionHistory } = usePos();

  // Memoize perhitungan laporan
  const reportData = useMemo(() => {
    const totalSales = transactionHistory.reduce((sum, t) => sum + t.total, 0);
    const totalTransactions = transactionHistory.length;
    const totalItemsSold = transactionHistory.reduce((sum, t) => sum + t.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

    return {
      totalSales,
      totalTransactions,
      totalItemsSold,
    };
  }, [transactionHistory]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="container mx-auto p-4 sm:p-6 pb-20 sm:pb-4 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {/* Header Laporan */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Laporan Penjualan 📈</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Ringkasan performa penjualan dan aktivitas transaksi.</p>
        </div>

        {/* Statistik Ringkas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ReportCard title="Total Penjualan" value={reportData.totalSales} type="total_sales" />
          <ReportCard title="Jumlah Transaksi" value={reportData.totalTransactions} type="transactions" />
          <ReportCard title="Total Item Terjual" value={reportData.totalItemsSold} type="items_sold" />
        </div>

        {/* Riwayat Transaksi */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Riwayat Transaksi Lengkap</h2>

          {reportData.totalTransactions > 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-600 dark:text-gray-300">
                Lihat detail lengkap transaksi di halaman <span className="font-semibold text-blue-600 dark:text-blue-400">Riwayat Transaksi</span>.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-600 dark:text-gray-300">Data laporan akan muncul setelah transaksi pertama dilakukan.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReportPage;
