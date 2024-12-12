interface SearchData {
  timestamp: string;
  value: number;
}

interface TrendingItem {
  term: string;
  data: SearchData[];
  searchVolume: string;
}

export async function getSearchTrends(term: string): Promise<SearchData[]> {
  try {
    const response = await fetch(`/api/trends?term=${encodeURIComponent(term)}`);
    if (!response.ok) throw new Error('Failed to fetch search trends');
    return await response.json();
  } catch (error) {
    console.error('Error fetching search trends:', error);
    throw error;
  }
}

export async function getTrendingSearches(): Promise<TrendingItem[]> {
  try {
    const response = await fetch('/api/trending');
    if (!response.ok) throw new Error('Failed to fetch trending searches');
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending searches:', error);
    throw error;
  }
}