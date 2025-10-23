// src/components/ProductCard.jsx
import React, { useState } from 'react'; // Import useState
import { formatRupiah } from '../utils/format';
import { usePos } from '../context/PosContext';
import { ShoppingCart, Image as ImageIcon } from 'lucide-react'; // Import ImageIcon untuk fallback
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = usePos();
  const isOutOfStock = product.stock <= 0;

  // State baru untuk melacak kegagalan pemuatan gambar
  const [imageError, setImageError] = useState(false);

  // Path gambar, menggunakan gambar lokal sebagai prioritas, lalu placeholder eksternal.
  // Jika imageError true, kita tidak mencoba memuat URL apa pun lagi.
  const imageSource = imageError ? null : product.image || 'https://via.placeholder.com/150';

  const handleImageError = (e) => {
    // Hentikan penanganan error lebih lanjut untuk elemen ini (mencegah loop)
    e.target.onerror = null;

    // Pindahkan elemen <img> keluar dari tata letak dan tampilkan fallback
    e.target.style.display = 'none';

    // Atur state error, yang akan memicu render fallback visual
    setImageError(true);
  };

  // Saat produk berganti (misalnya, setelah filter), reset status error
  React.useEffect(() => {
    setImageError(false);
  }, [product.id]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${isOutOfStock ? 'opacity-60 grayscale' : ''}`}
    >
      <div className="h-40 bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden relative">
        {/* 1. Elemen Gambar */}
        <img
          src={imageSource}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity ${imageError ? 'opacity-0' : 'opacity-100'}`}
          onError={handleImageError} // Gunakan handler yang diperbarui
          // Kita tidak perlu menggunakan onError untuk mengganti src lagi, karena state imageError sudah menangani visual fallback.
        />

        {/* 2. Fallback Visual */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 p-2">
            <ImageIcon size={32} className="mb-1" />
            <span className="text-xs">Gambar Gagal Dimuat</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 truncate mb-1">{product.name}</h3>
        {/* ... (kode tombol dan detail lainnya) */}
        <p className="text-xl font-bold text-tosca dark:text-teal-400 mb-2">{formatRupiah(product.price)}</p>
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-600 dark:text-gray-300">Stok: {product.stock}</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: product.category === 'Sembako' ? '#f39c12' : product.category === 'Minuman' ? '#3498db' : '#2ecc71' }}>
            {product.category}
          </span>
        </div>
        <button
          onClick={() => addToCart(product)}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center py-2 rounded-lg font-semibold transition-all duration-200 ${
            isOutOfStock ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-tosca text-white hover:bg-teal-600 shadow-md hover:shadow-lg'
          }`}
        >
          <ShoppingCart size={18} className="mr-2" />
          {isOutOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
