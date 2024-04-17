"use client"

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
 
} from "@/components/ui/card"

const data = [
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },  
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },  
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },  
];

export function ProductsShart() {
  return (
    <Card
    className="w-full h-[80px] border-none shadow-none p-0 col-span-3 overflow-hidden"
    >

      <CardContent className="">
        <div className="h-[80px] w-full">
          <ResponsiveContainer
          
          width="100%" height="100%">
            <AreaChart
            title=" "
            throttleDelay={100}
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0,
              }}
              className=" pt-2 "
            >
                <defs>
                <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity={0.4}/>
                  <stop offset="75%" stopColor="#dc2626" stopOpacity={0.05}/>
                </linearGradient>
                </defs>
                <Area
                dataKey="average"
                type={'bump'}
                stroke="#dc2626"
                fill="url(#color2)"
                className=" stroke-[1.8] fill-current"
              />
              <Tooltip
                cursor
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className=" relative flex justify-center items-center">
                            <span className="font-bold  text-slate-900 dark:text-slate-50">
                                {payload[0].value} €
                            </span>
                      </div>
                    )
                  }
                  return null
                }}
              />
            
            </AreaChart>  
          </ResponsiveContainer>
        </div>
      </CardContent>
     

    </Card>
  )
}