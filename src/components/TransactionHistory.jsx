// src/components/TransactionHistory.jsx
import React from 'react';
import { usePos } from '../context/PosContext';
import { formatRupiah } from '../utils/format';

const TransactionHistory = () => {
  const { transactionHistory } = usePos();

  if (transactionHistory.length === 0) {
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400">Belum ada transaksi yang tercatat.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="space-y-4">
      {transactionHistory.map((transaction) => (
        <div key={transaction.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border-l-4 border-tosca dark:border-teal-400">
          <div className="flex justify-between items-start border-b pb-3 mb-3 border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-white">Transaksi #{transaction.id.toString().slice(-6)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tanggal: {formatDate(transaction.date)}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">{formatRupiah(transaction.total)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{transaction.items.length} item</p>
            </div>
          </div>

          {/* Detail Item (Bisa disembunyikan/di-toggle jika terlalu banyak) */}
          <div className="mt-3">
            <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Items:</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {transaction.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.name} ({item.quantity}x)
                  </span>
                  <span>{formatRupiah(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
