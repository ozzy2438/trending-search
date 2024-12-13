import { TrendResult } from '../types/trending';

interface SearchFilters {
  timeframe: string;
  location: string;
  category: string;
}

const PROXY_API = '/api/trends/api/dailytrends';

const fetchGoogleTrends = async (geo: string = 'TR') => {
  try {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    
    const response = await fetch(
      `${PROXY_API}?hl=tr-TR&tz=-180&geo=${geo}&ns=15&ed=${formattedDate}`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    // Google Trends API returns ")]}',\n" before the actual JSON
    const jsonStr = text.substring(text.indexOf('{'));
    const data = JSON.parse(jsonStr);
    
    if (!data.default?.trendingSearchesDays?.[0]?.trendingSearches) {
      throw new Error('Invalid data format from Google Trends');
    }

    return data.default.trendingSearchesDays[0].trendingSearches;
  } catch (error) {
    console.error('Error fetching Google Trends:', error);
    // Fallback data
    return generateFallbackTrends();
  }
};

const generateFallbackTrends = () => {
  const categories = [
    'Teknoloji', 'Spor', 'Eğlence', 'Politika', 'Bilim',
    'Sağlık', 'Ekonomi', 'Eğitim', 'Sanat', 'İş Dünyası'
  ];

  return categories.map(category => ({
    title: { query: `${category} Haberleri` },
    formattedTraffic: `${Math.floor(Math.random() * 500 + 500)}K+`,
    articles: [
      {
        title: `${category} ile ilgili önemli gelişmeler`,
        timeAgo: '4 saat önce',
        source: 'Haber Kaynağı'
      }
    ]
  }));
};

const mapGoogleTrendsToResults = (trends: any[], platform: string = 'Google'): TrendResult[] => {
  return trends.map(trend => {
    const trafficStr = trend.formattedTraffic || '100K+';
    const trafficNum = parseInt(trafficStr.replace(/[K+]/g, '000')) || 100000;
    const percentage = Math.min(100, Math.round((trafficNum / 1000000) * 100));

    return {
      platform,
      percentage,
      change: Math.round((Math.random() * 200 - 100) * 10) / 10,
      title: trend.title.query,
      timestamp: new Date().toISOString(),
    };
  });
};

const generatePlatformData = (term: string, baseValue: number) => {
  const randomVariation = () => Math.random() * 20 - 10;
  
  return {
    'Google': Math.round((baseValue + randomVariation()) * 10) / 10,
    'Twitter': Math.round((baseValue * 0.8 + randomVariation()) * 10) / 10,
    'YouTube': Math.round((baseValue * 0.7 + randomVariation()) * 10) / 10,
    'LinkedIn': Math.round((baseValue * 0.5 + randomVariation()) * 10) / 10,
    'GitHub': Math.round((baseValue * 0.3 + randomVariation()) * 10) / 10
  };
};

export const getSearchTrends = async (term: string, filters: SearchFilters): Promise<TrendResult[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const dates = Array.from({ length: 50 }, (_, i) => {
    const date = new Date();
    const timeframeMap: { [key: string]: number } = {
      'LAST_HOUR': 60 * 60 * 1000,
      'LAST_24_HOURS': 24 * 60 * 60 * 1000,
      'LAST_7_DAYS': 7 * 24 * 60 * 60 * 1000,
      'LAST_30_DAYS': 30 * 24 * 60 * 60 * 1000,
      'LAST_90_DAYS': 90 * 24 * 60 * 60 * 1000,
      'LAST_12_MONTHS': 365 * 24 * 60 * 60 * 1000,
      'LAST_5_YEARS': 5 * 365 * 24 * 60 * 60 * 1000
    };

    const timeframe = timeframeMap[filters.timeframe] || timeframeMap.LAST_7_DAYS;
    const step = timeframe / 50;
    date.setTime(date.getTime() - (50 - i) * step);
    return date;
  });

  const baseValue = Math.random() * 50 + 50;
  const results: TrendResult[] = [];

  for (const platform of ['Google', 'Twitter', 'YouTube', 'LinkedIn', 'GitHub']) {
    const platformData = dates.map((date, index) => {
      const timeProgress = index / dates.length;
      const trendFactor = Math.sin(timeProgress * Math.PI) * 20;
      const variation = trendFactor + (Math.random() * 10 - 5);
      const percentage = Math.max(0, Math.min(100, baseValue + variation));
      
      return {
        platform,
        percentage,
        change: index > 0 ? percentage - baseValue : 0,
        title: term,
        timestamp: date.toISOString(),
      };
    });
    results.push(...platformData);
  }

  return results;
};

const countryMapping: { [key: string]: string } = {
  'WORLDWIDE': 'GLOBAL',
  'TR': 'TR',
  'US': 'US',
  'GB': 'GB',
  'DE': 'DE',
  'FR': 'FR'
};

export const getTrendingSearches = async (
  timeRange: string = '24h',
  location: string = 'WORLDWIDE',
  category: string = 'ALL'
): Promise<TrendResult[]> => {
  try {
    const geo = countryMapping[location] || 'GLOBAL';
    const trends = await fetchGoogleTrends(geo);
    const googleResults = mapGoogleTrendsToResults(trends);
    
    // Diğer platformlar için benzer sonuçlar üret
    const allResults = googleResults.flatMap(result => {
      const baseValue = result.percentage;
      const platforms = generatePlatformData(result.title, baseValue);
      
      return Object.entries(platforms).map(([platform, percentage]) => ({
        platform,
        percentage,
        change: Math.round((Math.random() * 200 - 100) * 10) / 10,
        title: result.title,
        timestamp: new Date().toISOString(),
      }));
    });

    return allResults;
  } catch (error) {
    console.error('Error in getTrendingSearches:', error);
    // Fallback data
    const fallbackTrends = generateFallbackTrends();
    const googleResults = mapGoogleTrendsToResults(fallbackTrends);
    
    const allResults = googleResults.flatMap(result => {
      const baseValue = result.percentage;
      const platforms = generatePlatformData(result.title, baseValue);
      
      return Object.entries(platforms).map(([platform, percentage]) => ({
        platform,
        percentage,
        change: Math.round((Math.random() * 200 - 100) * 10) / 10,
        title: result.title,
        timestamp: new Date().toISOString(),
      }));
    });

    return allResults;
  }
};
