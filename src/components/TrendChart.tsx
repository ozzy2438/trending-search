import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartData } from '../types/trending';

interface TrendChartProps {
  data: ChartData[];
}

const COLORS = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'];

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="w-full h-[400px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-4 rounded-lg shadow-lg border">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-gray-600">{data.platform}</p>
                    <p className="text-blue-600 font-bold">{data.value}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}