import React, { useState } from 'react';
import { SearchLineChart } from './SearchLineChart';
import { exportToCSV } from '../utils/csv';
import { TrendResult } from '../types/trending';
import TrendingResults from './TrendingResults';

interface CustomSearchProps {
  onSearch: (term: string, filters: SearchFilters) => Promise<TrendResult[]>;
}

interface SearchFilters {
  timeframe: string;
  location: string;
  category: string;
}

interface SearchDataPoint {
  timestamp: string;
  value: number;
}

const locations = [
  'Global',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'India',
  'Turkey',
];

const categories = [
  'All categories',
  'Business',
  'Entertainment',
  'Health',
  'Science',
  'Sports',
  'Technology',
];

const platforms = ['Google', 'Twitter', 'YouTube', 'LinkedIn', 'GitHub'];

export const CustomSearch: React.FC<CustomSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState<TrendResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    timeframe: 'LAST_7_DAYS',
    location: 'Global',
    category: 'All categories'
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const data = await onSearch(searchTerm, filters);
      setSearchData(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Transform data for each platform
  const getDataByPlatform = (data: TrendResult[], platform: string): SearchDataPoint[] => {
    return data
      .filter(item => item.platform === platform)
      .map(item => ({
        timestamp: item.timestamp,
        value: item.percentage
      }));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Arama terimi girin..."
            className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-gray-200 dark:border-dark-700 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
          >
            {loading ? 'Aranıyor...' : 'Ara'}
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Konum
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-gray-200 dark:border-dark-700"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Zaman Aralığı
            </label>
            <select
              value={filters.timeframe}
              onChange={(e) => handleFilterChange('timeframe', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-gray-200 dark:border-dark-700"
            >
              <option value="LAST_HOUR">Son 1 saat</option>
              <option value="LAST_24_HOURS">Son 24 saat</option>
              <option value="LAST_7_DAYS">Son 7 gün</option>
              <option value="LAST_30_DAYS">Son 30 gün</option>
              <option value="LAST_90_DAYS">Son 90 gün</option>
              <option value="LAST_12_MONTHS">Son 12 ay</option>
              <option value="LAST_5_YEARS">Son 5 yıl</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kategori
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-gray-200 dark:border-dark-700"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {searchData && (
        <div className="space-y-8">
          {/* Platform Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {platforms.map(platform => (
              <div key={platform} className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
                <SearchLineChart
                  data={getDataByPlatform(searchData, platform)}
                  title={`${platform} trends for "${searchTerm}"`}
                />
              </div>
            ))}
          </div>

          {/* Detailed Results Table */}
          <TrendingResults results={searchData} isLoading={loading} />

          {/* Export Button */}
          <div className="flex justify-end">
            <button
              onClick={() => exportToCSV(searchData, 'historical')}
              className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
            >
              CSV olarak dışa aktar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
