import React, { useState } from 'react';
import { LineChart, TrendingUp } from 'lucide-react';
import SearchBar from './components/SearchBar';
import TrendingResults from './components/TrendingResults';
import TrendChart from './components/TrendChart';
import { TrendResult, ChartData } from './types/trending';

// Simulated data - In a real app, this would come from an API
const simulateSearch = (query: string, limit: number): Promise<TrendResult[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const platforms = ['Google', 'Twitter', 'YouTube', 'LinkedIn', 'GitHub'];
      const results = Array.from({ length: limit }, (_, i) => ({
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        percentage: Math.round((100 - i * (100 / limit * 0.8)) * 10) / 10,
        change: Math.round((Math.random() * 200 - 100) * 10) / 10,
        title: `${query} ${Math.random() > 0.5 ? 'trends' : 'analytics'}`,
        timestamp: new Date().toISOString(),
      }));
      resolve(results);
    }, 1500);
  });
};

function App() {
  const [results, setResults] = useState<TrendResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string, limit: number) => {
    setIsLoading(true);
    const searchResults = await simulateSearch(query, limit);
    setResults(searchResults);
    setIsLoading(false);
  };

  const getChartData = (): ChartData[] => {
    return results
      .slice(0, 10)
      .map((result, index) => ({
        name: `#${index + 1}`,
        value: result.percentage,
        platform: result.platform,
      }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LineChart className="w-10 h-10 text-blue-600" />
            <TrendingUp className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Universal Trend Analyzer</h1>
          <p className="text-lg text-gray-600">
            Discover trending topics across multiple platforms in real-time
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <SearchBar onSearch={handleSearch} />
          {results.length > 0 && <TrendChart data={getChartData()} />}
          <TrendingResults results={results} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;