import React from 'react';
import { CustomSearch } from '../components/CustomSearch';
import { TrendingSearches } from '../components/TrendingSearches';
import { getSearchTrends, getTrendingSearches } from '../lib/api';

export const TrendsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Google Trends Explorer</h1>
        <CustomSearch onSearch={getSearchTrends} />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <TrendingSearches getTrendingData={getTrendingSearches} />
      </div>
    </div>
  );
};