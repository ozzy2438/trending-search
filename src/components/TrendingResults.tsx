import React from 'react';
import { TrendingUp, Twitter, Youtube, Globe, Linkedin, Github } from 'lucide-react';
import { TrendResult } from '../types/trending';
import ExportButton from './ExportButton';

interface TrendingResultsProps {
  results: TrendResult[];
  isLoading: boolean;
}

export default function TrendingResults({ results, isLoading }: TrendingResultsProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mt-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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

  return (
    <div className="w-full max-w-3xl mt-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Trending Results</h2>
            </div>
            <ExportButton data={results} disabled={results.length === 0} />
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {results.map((result, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium text-gray-400">#{index + 1}</span>
                  {getPlatformIcon(result.platform)}
                  <div>
                    <h3 className="font-medium">{result.title}</h3>
                    <p className="text-sm text-gray-500">{result.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{result.percentage}%</div>
                  <div className={`text-sm ${result.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.change >= 0 ? '+' : ''}{result.change}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}