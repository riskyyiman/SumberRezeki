// src/components/ReportCard.jsx
import React from 'react';
import { formatRupiah } from '../utils/format';
import { DollarSign, FileText, Package } from 'lucide-react';

const ReportCard = ({ title, value, type }) => {
  let Icon;
  let bgColor;
  let valueDisplay;

  switch (type) {
    case 'total_sales':
      Icon = DollarSign;
      bgColor = 'bg-green-500';
      valueDisplay = formatRupiah(value);
      break;
    case 'transactions':
      Icon = FileText;
      bgColor = 'bg-blue-500';
      valueDisplay = value;
      break;
    case 'items_sold':
      Icon = Package;
      bgColor = 'bg-yellow-500';
      valueDisplay = value;
      break;
    default:
      Icon = DollarSign;
      bgColor = 'bg-gray-500';
      valueDisplay = value;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 transition-colors duration-300">
      <div className={`p-3 rounded-full ${bgColor} text-white`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{valueDisplay}</p>
      </div>
    </div>
  );
};

export default ReportCard;
