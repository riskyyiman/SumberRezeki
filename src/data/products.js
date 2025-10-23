// src/data/products.js
export const productCategories = ['Sembako', 'Minuman', 'Makanan Ringan', 'Kebersihan', 'Semua Produk'];

export const products = [
  { id: 1, name: 'Beras Cap Mawar 1kg', price: 15000, stock: 30, image: '../../public/images/beras.png', category: 'Sembako' },
  { id: 2, name: 'Minyak Goreng Sun 2L', price: 35000, stock: 20, image: '../../public/images/minyak.png', category: 'Sembako' },
  { id: 3, name: 'Gula Pasir Kristal 1kg', price: 14000, stock: 25, image: '/images/gula.jpg', category: 'Sembako' },
  { id: 4, name: 'Air Mineral Botol 600ml', price: 3000, stock: 100, image: '/images/air.jpg', category: 'Minuman' },
  { id: 5, name: 'Soda Lemon Kaleng', price: 8000, stock: 50, image: '/images/soda.jpg', category: 'Minuman' },
  { id: 6, name: 'Sabun Cuci Piring', price: 12000, stock: 40, image: '/images/sabun.jpg', category: 'Kebersihan' },
  { id: 7, name: 'Keripik Kentang Original', price: 10000, stock: 60, image: '/images/kripik.jpg', category: 'Makanan Ringan' },
  { id: 8, name: 'Kopi Instan Sachet', price: 2500, stock: 200, image: '/images/kopi.jpg', category: 'Minuman' },
];

/* Catatan: Karena tidak ada folder 'public/images' yang disediakan,
   Anda perlu membuat folder 'public/images' dan menempatkan gambar
   dengan nama file yang sesuai (beras.jpg, minyak.jpg, dst.) agar path
   gambar berfungsi dengan benar di Vite.
*/
