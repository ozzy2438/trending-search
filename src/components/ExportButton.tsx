import React from 'react';
import { Download } from 'lucide-react';
import { TrendResult } from '../types/trending';
import { exportToCSV } from '../utils/csv';

interface ExportButtonProps {
  data: TrendResult[];
  disabled: boolean;
}

export default function ExportButton({ data, disabled }: ExportButtonProps) {
  return (
    <button
      onClick={() => exportToCSV(data)}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${disabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-green-50 text-green-700 hover:bg-green-100'
        }`}
    >
      <Download className="w-4 h-4" />
      Export CSV
    </button>
  );
}