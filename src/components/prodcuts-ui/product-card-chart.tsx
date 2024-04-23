"use client"

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
 
} from "@/components/ui/card"

const data = [
  { average: 0, today: 20 },
  { average: 5, today: 20 },
  { average: 4, today: 30 },
  { average: 7, today: 20 },  
  { average: 10, today: 50 },  
  { average: 9, today: 60 },
  { average: 11, today: 60 },
  { average: 10, today: 60 },
  { average: 12, today: 60 },
  { average: 15, today: 60 },
  { average: 14, today: 60 },
  { average: 16, today: 60 },
  { average: 18, today: 60 },
  { average: 20, today: 60 },
  { average: 22, today: 60 },
  { average: 24, today: 60 },
  { average: 26, today: 60 },
  { average: 28, today: 60 },
  { average: 30, today: 60 },
  { average: 32, today: 60 },
  { average: 34, today: 60 },
  { average: 36, today: 60 },
  { average: 38, today: 60 },
  { average: 40, today: 60 },
  { average: 42, today: 60 },
  { average: 40, today: 60 },
  { average: 46, today: 60 },
  { average: 40, today: 60 },
  { average: 50, today: 60 },
  { average: 51, today: 60 },
  { average: 35, today: 60 },
  { average: 56, today: 60 },
  { average: 58, today: 60 },
  { average: 60, today: 60 },
  { average: 62, today: 60 },
  { average: 64, today: 60 },
  { average: 52, today: 60 },
  { average: 68, today: 60 },
  { average: 66, today: 60 },
  { average: 72, today: 60 },
  { average: 74, today: 60 },
  { average: 76, today: 60 },
  { average: 78, today: 60 },
  { average: 80, today: 60 },
  { average: 82, today: 60 },
  { average: 84, today: 60 },
  { average: 86, today: 60 },
  { average: 88, today: 60 },
  { average: 90, today: 60 },


   
  
];

export function ProductsShart() {
  return (
    <Card
    className="w-full h-[280px] bg-transparent border-none shadow-none p-0 col-span-3 overflow-hidden"
    >

      <CardContent className="">
        <div className="h-[280px] w-full">
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
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity={0.4}/>
                  <stop offset="75%" stopColor="#0d9488" stopOpacity={0.05}/>
                </linearGradient>
                </defs>
                <Area
                dataKey="average"
                type={'linear'}
                stroke="#0d9488"
                fill="url(#color)"
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