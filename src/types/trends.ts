export interface TrendCategory {
  name: string;
  count: number;
}

export interface TrendLocation {
  name: string;
  code: string;
}

export interface TrendTimeRange {
  label: string;
  value: string;
}

export interface TrendStatus {
  isActive: boolean;
}

export interface TrendItem {
  title: string;
  searchVolume: string;
  startedTime: string;
  trendBreakdown: string[];
  graph: string; // Base64 or URL for the graph
  percentage: string;
}

export interface TrendFilter {
  category?: string;
  timeRange?: string;
  location?: string;
  status?: boolean;
}