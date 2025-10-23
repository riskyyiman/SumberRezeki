// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LayoutGrid, Clock, BarChart3, Moon, Sun } from 'lucide-react';
import { usePos } from '../context/PosContext';

const navItems = [
  { name: 'Barang', path: '/', icon: LayoutGrid },
  { name: 'Keranjang', path: '/cart', icon: ShoppingCart },
  { name: 'Riwayat', path: '/history', icon: Clock },
  { name: 'Laporan', path: '/report', icon: BarChart3 },
];

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, cart } = usePos();
  const location = useLocation();

  const CartIcon = navItems.find((item) => item.path === '/cart').icon;

  return (
    <>
      {/* Navbar Desktop/Tablet (Top Bar) */}
      <nav className="hidden sm:flex bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-10 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-tosca dark:text-teal-400">
            Aplikasi Warung Sumber Rezeki
          </Link>
          <div className="flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-tosca dark:hover:text-teal-400 transition-colors ${
                  location.pathname === item.path ? 'text-tosca dark:text-teal-400 font-semibold border-b-2 border-tosca dark:border-teal-400' : ''
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm">{item.name}</span>
                {item.path === '/cart' && cart.length > 0 && <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cart.length}</span>}
              </Link>
            ))}
            <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle Dark Mode">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.05)] z-20 transition-colors duration-300">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 transition-transform duration-200 ${
                location.pathname === item.path ? 'text-tosca dark:text-teal-400 font-semibold scale-110' : 'text-gray-500 dark:text-gray-400 hover:text-tosca dark:hover:text-teal-400'
              }`}
            >
              <div className="relative">
                <item.icon size={24} />
                {item.path === '/cart' && cart.length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full leading-none">{cart.length}</span>
                )}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
