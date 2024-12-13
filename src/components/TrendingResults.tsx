import React from 'react';
import { TrendingUp, Twitter, Youtube, Globe, Linkedin, Github } from 'lucide-react';
import { TrendResult } from '../types/trending';
import ExportButton from './ExportButton';

interface TrendingResultsProps {
  results: TrendResult[];
  isLoading: boolean;
}

interface GroupedResult {
  title: string;
  platforms: {
    [key: string]: {
      percentage: number;
      change: number;
    };
  };
}

export default function TrendingResults({ results, isLoading }: TrendingResultsProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mt-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (!results.length) {
    return null;
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  // Sonuçları başlığa göre grupla
  const groupedResults: GroupedResult[] = results.reduce((acc: GroupedResult[], curr) => {
    const existingResult = acc.find(r => r.title === curr.title);
    if (existingResult) {
      existingResult.platforms[curr.platform] = {
        percentage: curr.percentage,
        change: curr.change
      };
    } else {
      acc.push({
        title: curr.title,
        platforms: {
          [curr.platform]: {
            percentage: curr.percentage,
            change: curr.change
          }
        }
      });
    }
    return acc;
  }, []);

  // Yüzdelerin ortalamasına göre sırala
  const sortedResults = groupedResults.sort((a, b) => {
    const aAvg = Object.values(a.platforms).reduce((sum, p) => sum + p.percentage, 0) / Object.keys(a.platforms).length;
    const bAvg = Object.values(b.platforms).reduce((sum, p) => sum + p.percentage, 0) / Object.keys(b.platforms).length;
    return bAvg - aAvg;
  });

  const platforms = ['Google', 'Twitter', 'YouTube', 'LinkedIn', 'GitHub'];

  return (
    <div className="w-full mt-8">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Trend Sonuçları</h2>
            </div>
            <ExportButton data={results} disabled={results.length === 0} />
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[auto,repeat(5,1fr)] gap-4 p-4 bg-gray-50 dark:bg-dark-900/50 border-b border-gray-200 dark:border-dark-700">
          <div className="font-medium text-gray-500 dark:text-gray-400">Arama Terimi</div>
          {platforms.map(platform => (
            <div key={platform} className="flex items-center justify-center gap-2 font-medium text-gray-500 dark:text-gray-400">
              {getPlatformIcon(platform)}
              <span>{platform}</span>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="divide-y divide-gray-200 dark:divide-dark-700">
          {sortedResults.map((result, index) => (
            <div key={index} className="grid grid-cols-[auto,repeat(5,1fr)] gap-4 p-4 hover:bg-gray-50 dark:hover:bg-dark-900/50 transition-colors items-center">
              <div className="font-medium text-gray-900 dark:text-white">
                <span className="text-gray-400 dark:text-gray-500 mr-2">#{index + 1}</span>
                {result.title}
              </div>
              {platforms.map(platform => {
                const data = result.platforms[platform];
                return (
                  <div key={platform} className="flex flex-col items-center justify-center">
                    {data ? (
                      <>
                        <div className="font-semibold text-gray-900 dark:text-white">{data.percentage}%</div>
                        <div className={`text-sm ${data.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {data.change >= 0 ? '+' : ''}{data.change}%
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-400 dark:text-gray-500">-</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
