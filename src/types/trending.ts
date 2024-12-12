export interface TrendResult {
  platform: string;
  percentage: number;
  change: number;
  title: string;
  timestamp: string;
}

export interface ChartData {
  name: string;
  value: number;
  platform: string;
}