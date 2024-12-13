import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SearchDataPoint {
  timestamp: string;
  value: number;
}

interface SearchLineChartProps {
  data: SearchDataPoint[];
  title: string;
  color?: string;
}

type PlatformColors = {
  [key in 'Google' | 'Twitter' | 'YouTube' | 'LinkedIn' | 'GitHub']: string;
};

const platformColors: PlatformColors = {
  'Google': '#4285F4',
  'Twitter': '#1DA1F2',
  'YouTube': '#FF0000',
  'LinkedIn': '#0A66C2',
  'GitHub': '#171515'
};

export const SearchLineChart: React.FC<SearchLineChartProps> = ({ data, title, color }) => {
  // Platform adını başlıktan çıkar
  const platform = Object.keys(platformColors).find(p => title.includes(p)) as keyof PlatformColors;
  const chartColor = color || (platform ? platformColors[platform] : '#8884d8');

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-dark-800 p-3 border dark:border-dark-700 rounded shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(label)}</p>
          <p className="text-sm font-semibold" style={{ color: chartColor }}>
            Arama Hacmi: {payload[0].value.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 p-4 bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#f0f0f0" 
            className="dark:opacity-20"
          />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatDate}
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fontSize: 12, fill: 'currentColor' }}
            stroke="currentColor"
            className="text-gray-600 dark:text-gray-400"
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: 'currentColor' }}
            stroke="currentColor"
            className="text-gray-600 dark:text-gray-400"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              color: 'currentColor',
            }}
          />
          <Line
            name="Arama Hacmi"
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
