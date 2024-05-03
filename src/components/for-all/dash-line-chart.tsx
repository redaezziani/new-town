'use client'
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useSWR from 'swr';
import Counter from '../admin/ui/animation/counter';

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
      >
        <CartesianGrid
        vertical={false}
        strokeDasharray="3 3" />
        <Line type="monotone" dataKey="prevMonthPrice"
        strokeDasharray={'3 3'}
        name="Previous Month" stroke="#d7eb18" />
        <Line type="monotone"
        strokeDasharray={'3 3'}
        dataKey="currMonthPrice" name="Current Month" stroke="#adf802" />
        <XAxis
        tickLine={false}
        axisLine={false}
        tickCount={8}
        tickFormatter={(value) => `شهر ${value}`}
        fontSize={10}
        tickMargin={10}
        dataKey="month" />
        <YAxis
        tickCount={8}
        tickLine={false}
        tickFormatter={(value) => `${value} $`}
        axisLine={false}
        fontSize={10}
        offset={10}
        />
       <Tooltip
                cursor
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="">
                      <div
                        className="relative shadow-lg block bg-[#333] text-white font-semibold px-3 py-2 text-[13px] left-full ml-3 top-0 bottom-0 my-auto h-max w-max rounded before:w-4 before:h-4 before:rotate-45 before:bg-[#333] before:absolute before:z-[-1] before:bottom-0 before:top-0 before:my-auto before:-left-1 before:mx-auto">
                        <p className="text-[13px] text-primary">
                        أسعار الشهر
                        </p>
                        {payload.map((item, index) => {
                        return (
                          <p key={index} className=" text-xs text-slate-50">
                          <span className="text-[#fff] flex gap-2  font-semibold">
                            {item.dataKey === 'prevMonthPrice' ? 'السابقة: ' : 'الحالية: '}
                            <p>
                            {item.value as number}
                            </p>
                          </span>
                          </p>
                        )
                        }
                        )}
                        

                      </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
      </LineChart>
    </ResponsiveContainer>
  );
}




export default DashLineChart;

