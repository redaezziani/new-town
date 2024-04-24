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
import Counter from "./animation/counter";
import { TrendingUp, X } from "lucide-react";

const data = [
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },
  { average: Math.floor(Math.random() * 10) + 10, today: Math.floor(Math.random() * 10) },


];

export function EreaChart() {
  return (
    <Card
      className="w-full h-[450px] border-none bg-transparent col-span-3 overflow-hidden"
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <CardTitle
              className=" text-slate-950 dark:text-slate-50"
            >
              Sales Overview
            </CardTitle>
            <CardDescription>
              the list of recent sales and revenue
            </CardDescription>
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
                top: 25,
                right: 0,
                left: 0,
                bottom: 20,
              }}
              className=" pt-2 "
            >
              <defs>
                <linearGradient id="coloriuue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="75%" stopColor="#2563eb" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                dataKey="average"
                type='bump'
                stroke="#2563eb"
                fill="url(#coloriuue)"
                className=" stroke-[1.8] fill-current"
              />
              <Tooltip
                cursor
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="">
                        <div
                          className="relative shadow-lg block bg-[#333] text-white font-semibold px-3 py-2 text-[13px] left-full ml-3 top-0 bottom-0 my-auto h-max w-max rounded before:w-4 before:h-4 before:rotate-45 before:bg-[#333] before:absolute before:z-[-1] before:bottom-0 before:top-0 before:my-auto before:-left-1 before:mx-auto">
                          <p className="text-[13px] text-slate-50">Today</p>
                          {payload.map((item, index) => {
                            return (
                              <p key={index} className="text-[13px] text-slate-50">
                                <span className="text-[#fff] font-semibold">
                                  <Counter value={item.value  as number} />
                                </span>
                                <span className="text-slate-50"> USD</span>
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
              <CartesianGrid
                opacity={0.2}
                vertical={false}
              />
              <XAxis
              dataKey={"today"}
              tickCount={5}
              color="#e2e8f0"
              className="text-xs text-slate-400"

              />
              <YAxis
                dataKey="average"
                tickCount={5}
                color="#e2e8f0"
                className="text-xs text-slate-400"
                
                tickFormatter={(value) => {
                  return `$${value}`
                }}
              />
            </AreaChart>

          </ResponsiveContainer>
        </div>
      </CardContent>


    </Card>
  )
}