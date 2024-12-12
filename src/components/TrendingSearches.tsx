import React, { useEffect, useState } from 'react';
import { SearchLineChart } from './SearchLineChart';

interface TrendingItem {
  term: string;
  data: Array<{ timestamp: string; value: number }>;
  searchVolume: string;
}

interface TrendingSearchesProps {
  getTrendingData: () => Promise<TrendingItem[]>;
}

export const TrendingSearches: React.FC<TrendingSearchesProps> = ({ getTrendingData }) => {
  const [trendingData, setTrendingData] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingData();
        setTrendingData(data);
      } catch (error) {
        console.error('Error fetching trending data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
    const interval = setInterval(fetchTrending, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [getTrendingData]);

  if (loading) {
    return <div className="text-center py-4">Loading trending searches...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Trending Searches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trendingData.map((item, index) => (
          <SearchLineChart
            key={item.term}
            data={item.data}
            title={`${index + 1}. ${item.term} (${item.searchVolume})`}
            color={`hsl(${index * 30}, 70%, 50%)`}
          />
        ))}
      </div>
    </div>
  );
};