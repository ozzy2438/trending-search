import { TrendResult } from '../types/trending';

export const exportToCSV = (data: TrendResult[], type: 'trending' | 'historical') => {
  const headers = ['Date', 'Term', 'Platform', 'Search Volume (%)', 'Change (%)'];
  const rows = data.map(item => [
    item.timestamp,
    item.title,
    item.platform,
    item.percentage,
    item.change
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  const filename = type === 'trending' 
    ? `trending-results-${new Date().toISOString()}.csv`
    : `search-history-${new Date().toISOString()}.csv`;
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
