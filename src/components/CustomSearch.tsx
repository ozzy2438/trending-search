import React, { useState } from 'react';
import { SearchLineChart } from './SearchLineChart';

interface CustomSearchProps {
  onSearch: (term: string) => Promise<any>;
}

export const CustomSearch: React.FC<CustomSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const data = await onSearch(searchTerm);
      setSearchData(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searchData && (
        <SearchLineChart
          data={searchData}
          title={`Search trends for "${searchTerm}"`}
        />
      )}
    </div>
  );
};