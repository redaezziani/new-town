"use client"

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Counter from "../admin/ui/animation/counter";
import {  TrendingUp } from "lucide-react";

const data = [
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },


  
];

export function ProductsShart() {
  return (
    <Card
    className="w-full h-[420px] border-none col-span-3 overflow-hidden"
    >
        <CardHeader>
         <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
            <CardTitle
            className=" text-slate-950 dark:text-slate-50"
            >
                $ <Counter value={1000000} direction={'up'} />
            </CardTitle>
            <CardDescription
            className=" text-green-400"
            >
                Total Sales
            </CardDescription>
            </div>
            <div className="flex gap-5">
            <p
            className=" text-muted-foreground dark:text-muted-foreground text-xs font-semibold"
            >
                1M
            </p>
            <TrendingUp
            size={20}
            className=" text-slate-950 dark:text-slate-50"
            />
            </div>
         </div>
        </CardHeader>
      <CardContent className="">
        <div className="h-[420px] w-full">
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
                  <stop offset="0%" stopColor="#9234ea" stopOpacity={0.4}/>
                  <stop offset="75%" stopColor="#9234ea" stopOpacity={0.05}/>
                </linearGradient>
                </defs>
                <Area
                dataKey="average"
                type={'bump'}
                stroke="#9234ea"
                fill="url(#color)"
                className=" stroke-[1.8] fill-current"
              />
              <Tooltip
                cursor
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg cursor-pointer flex justify-start items-start  border border-[#9234eaaa] bg-background   shadow-[#9234ea29] p-2 shadow-sm">
                          <div className="flex w-24  justify-start items-start flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Average
                            </span>
                            <span className="font-bold text-slate-900 dark:text-slate-50">
                              <Counter
                                value={parseInt(payload[0].value?.toString() || '0')}
                                direction={'up'}
                              />
                            </span>
                          </div>
                          <span
                          className=" bg-[#9234ea21] px-2 rounded-full text-xs text-[#9234ea] border-[#9234ea9a]"
                          > 
                          60%
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