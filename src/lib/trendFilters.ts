export const timeRanges = [
  { label: 'Past 4 hours', value: '4h' },
  { label: 'Past 24 hours', value: '24h' },
  { label: 'Past 48 hours', value: '48h' },
  { label: 'Past 7 days', value: '7d' }
];

export const trendCategories = [
  { name: 'All categories', count: 114 },
  { name: 'Autos and Vehicles', count: 1 },
  { name: 'Beauty and Fashion', count: 0 },
  { name: 'Business and Finance', count: 14 },
  { name: 'Climate', count: 4 },
  { name: 'Entertainment', count: 23 },
  { name: 'Food and Drink', count: 1 },
  { name: 'Games', count: 6 },
  { name: 'Health', count: 1 },
  { name: 'Hobbies and Leisure', count: 1 },
  { name: 'Jobs and Education', count: 5 },
  { name: 'Law and Government', count: 11 },
  { name: 'Other', count: 14 },
  { name: 'Pets and Animals', count: 0 },
  { name: 'Politics', count: 4 }
];

export function filterTrendsByCategory(trends: any[], category: string) {
  if (category === 'All categories') return trends;
  return trends.filter(trend => trend.category === category);
}

export function filterTrendsByTimeRange(trends: any[], timeRange: string) {
  const now = new Date();
  const hours = {
    '4h': 4,
    '24h': 24,
    '48h': 48,
    '7d': 168
  };
  
  const hourLimit = hours[timeRange] || 24;
  return trends.filter(trend => {
    const trendTime = new Date(trend.startedTime);
    const diffHours = (now.getTime() - trendTime.getTime()) / (1000 * 60 * 60);
    return diffHours <= hourLimit;
  });
}

export function filterTrendsByStatus(trends: any[], showActiveOnly: boolean) {
  if (!showActiveOnly) return trends;
  return trends.filter(trend => trend.isActive);
}