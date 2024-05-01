'use client'
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useSWR from 'swr';

interface Chart_Line_Prices {
  prevMonthPrices: number[];
  currMonthPrices: number[];
}

interface Chart_Line_Orders_Data {
  message: string;
  status: string;
  data: Chart_Line_Prices;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DashLineChart: React.FC = () => {
  const { data: lineOrders, error } = useSWR('/api/users/customer/chart-line-orders', fetcher, { refreshInterval: 10000 }) as { data: Chart_Line_Orders_Data, error: any };
  
  if (error) return <div>Error fetching data</div>;
  if (!lineOrders) return <div>Loading...</div>;

  // Merge the previous and current month prices into a single array with an added 'month' key
  const chartData = lineOrders.data.prevMonthPrices.map((price, index) => ({ month: index + 1, prevMonthPrice: price, currMonthPrice: lineOrders.data.currMonthPrices[index] }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
        vertical={false}
        strokeDasharray="3 3" />
        <Line type="monotone" dataKey="prevMonthPrice" name="Previous Month" stroke="#d7eb18" />
        <Line type="monotone" dataKey="currMonthPrice" name="Current Month" stroke="#adf802" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DashLineChart;

