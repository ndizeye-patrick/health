import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface MetricChartProps {
  data: any[];
  title: string;
  metric: string;
  unit?: string;
}

export function MetricChart({ data, title, unit }: MetricChartProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const colors = ['#2563eb', '#dc2626', '#16a34a'];

  const formatYAxis = (value: number | string) => {
    if (typeof value === 'string') {
      return value.replace(/per1000population/, 'per 1000');
    }
    return unit ? `${value}` : value;
  };

  const formatTitle = (inputTitle: string) => {
    if (inputTitle.length > 50) {
      return inputTitle.replace(/\(.*?\)/g, '').trim();
    }
    return inputTitle;
  };

  const cleanData = data.map((item) => {
    const filteredItem: any = {};
    Object.keys(item).forEach((key) => {
      if (key === 'year') {
        filteredItem[key] = item[key];
      } else if (!isNaN(parseFloat(item[key])) || typeof item[key] === 'string') {
        let value = item[key];
        if (typeof value === 'string') {
          value = value.replace(/per1000population/gi, 'per 1000');
        }
        filteredItem[key] = isNaN(parseFloat(value)) ? value : parseFloat(value);
      }
    });
    return filteredItem;
  });

  const isValidData = cleanData && cleanData.length > 0;
  const metricKeys = isValidData ? Object.keys(cleanData[0]).filter((key) => key !== 'year') : [];

  if (!isValidData || metricKeys.length === 0) {
    return (
      <div className="w-full h-[400px] bg-white flex flex-col items-center justify-center rounded-lg shadow-md">
        <p className="text-center text-gray-600">No data available.</p>
      </div>
    );
  }

  return (
    <div className="chart-container bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{formatTitle(title)}</h3>
        <div>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-md ${
              chartType === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`ml-2 px-3 py-1 rounded-md ${
              chartType === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={cleanData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip />
              <Legend />
              {metricKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={cleanData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip />
              <Legend />
              {metricKeys.map((key, index) => (
                <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}