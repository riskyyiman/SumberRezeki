// src/components/Cart.jsx
import React from 'react';
import { usePos } from '../context/PosContext';
import { formatRupiah } from '../utils/format';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, calculateTotal, updateCartItemQuantity, removeItemFromCart, resetCart, checkout } = usePos();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl h-full flex flex-col transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">Keranjang Belanja</h2>

      {/* Daftar Item Keranjang */}
      <div className="grow overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">Keranjang kosong. Tambahkan produk dari katalog!</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b last:border-b-0 pb-3">
              {/* Detail Produk */}
              <div className="grow pr-2">
                <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatRupiah(item.price)} x {item.quantity}
                </p>
              </div>

              {/* Kontrol Kuantitas */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  aria-label="Kurangi Jumlah"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold w-6 text-center text-gray-800 dark:text-gray-100">{item.quantity}</span>
                <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} className="p-1.5 rounded-full bg-tosca text-white hover:bg-teal-600 transition" aria-label="Tambah Jumlah">
                  <Plus size={16} />
                </button>
              </div>

              {/* Subtotal & Hapus */}
              <div className="ml-4 text-right">
                <p className="font-bold text-lg text-gray-800 dark:text-gray-100">{formatRupiah(item.price * item.quantity)}</p>
                <button onClick={() => removeItemFromCart(item.id)} className="text-red-500 hover:text-red-700 transition mt-1" aria-label="Hapus Item">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total dan Tombol Aksi */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-700 dark:text-gray-200">TOTAL</span>
          <span className="text-3xl font-extrabold text-tosca dark:text-teal-400">{formatRupiah(calculateTotal)}</span>
        </div>

        <div className="space-y-3">
          <button
            onClick={checkout}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-xl text-white font-bold text-lg transition-all duration-200 ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/50'}`}
          >
            BAYAR SEKARANG
          </button>
          <button
            onClick={resetCart}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${cart.length === 0 ? 'text-gray-500 border border-gray-300 cursor-not-allowed' : 'bg-transparent text-red-500 border border-red-500 hover:bg-red-50'}`}
          >
            RESET KERANJANG
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
