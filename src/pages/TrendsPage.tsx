import React, { useState, useEffect } from 'react';
import { getTrendingSearches } from '../lib/api';
import { TrendResult } from '../types/trending';
import TrendingResults from '../components/TrendingResults';

export const TrendsPage: React.FC = () => {
  const [trendingData, setTrendingData] = useState<TrendResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    timeRange: '24h',
    location: 'WORLDWIDE',
    category: 'ALL'
  });

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const data = await getTrendingSearches(
          filters.timeRange,
          filters.location,
          filters.category
        );
        setTrendingData(data);
      } catch (error) {
        console.error('Error fetching trending searches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [filters]);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Trend Konular</h1>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Time Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zaman Aralığı
            </label>
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1h">Son 1 saat</option>
              <option value="24h">Son 24 saat</option>
              <option value="7d">Son 7 gün</option>
              <option value="30d">Son 30 gün</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konum
            </label>
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="WORLDWIDE">Dünya Geneli</option>
              <option value="TR">Türkiye</option>
              <option value="US">Amerika Birleşik Devletleri</option>
              <option value="GB">Birleşik Krallık</option>
              <option value="DE">Almanya</option>
              <option value="FR">Fransa</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ALL">Tüm Kategoriler</option>
              <option value="BUSINESS">İş</option>
              <option value="ENTERTAINMENT">Eğlence</option>
              <option value="HEALTH">Sağlık</option>
              <option value="SCIENCE">Bilim</option>
              <option value="SPORTS">Spor</option>
              <option value="TECHNOLOGY">Teknoloji</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <TrendingResults results={trendingData} isLoading={loading} />
      </div>
    </div>
  );
};
