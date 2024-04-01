"use client"

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const data = [
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
  { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },

  // Add more objects as needed
];

export function EreaChart() {
  return (
    <Card
    className="w-full h-[340px] col-span-3 overflow-hidden"
    >
      <CardHeader>
        <CardTitle
        className=" text-slate-950 dark:text-slate-50"
        >
            Manga Management
        </CardTitle>
        <CardDescription>
            this is the manga management page where you can manage all the manga
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer
          
          width="100%" height="100%">
            <AreaChart
            title="Manga Management"
            throttleDelay={300}
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
              
             
            >
                <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4}/>
                  <stop offset="75%" stopColor="#2563eb" stopOpacity={0.05}/>
                </linearGradient>
                </defs>
                <Area
                dataKey="average"
                stroke="#2563eb"
                fill="url(#color)"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background   shadow-primary/25 p-2 shadow-sm">
                          <div className="flex w-24  justify-center items-center flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Average
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          
                      </div>
                    )
                  }
                  return null
                }}
              />
              <CartesianGrid
              opacity={0.4}
                vertical={false}
              />

              
              
            </AreaChart>  
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}