import { TrendResult } from '../types/trending';

export const exportToCSV = (data: TrendResult[]) => {
  const headers = ['Rank', 'Platform', 'Title', 'Percentage', 'Change', 'Timestamp'];
  const rows = data.map((item, index) => [
    index + 1,
    item.platform,
    item.title,
    item.percentage,
    item.change,
    item.timestamp,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `trend-results-${new Date().toISOString()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};