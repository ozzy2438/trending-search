import React from 'react';
import { CustomSearch } from '../components/CustomSearch';
import { getSearchTrends } from '../lib/api';

export const SearchPage = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Trend Arama</h1>
        <CustomSearch onSearch={getSearchTrends} />
      </div>
    </div>
  );
};
