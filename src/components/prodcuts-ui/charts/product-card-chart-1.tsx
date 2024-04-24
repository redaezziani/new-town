"use client"

import { Area, AreaChart,  ResponsiveContainer, Tooltip} from "recharts"

import {
  Card,
  CardContent,
 
} from "@/components/ui/card"

interface ProductCardProps {
  data: {
    todayProducts : { id: string, price: number, currency: string, createdAt: string ,
      product: {
        currency: string;
    };
    }[],
  }[]
}

export function ProductsShart({ data }: ProductCardProps) {
  
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
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity={0.4}/>
                  <stop offset="75%" stopColor="#4ade80" stopOpacity={0.05}/>
                </linearGradient>
                </defs>
                <Area
                dataKey="price"
                type={'bump'}
                stroke="#4ade80"
                fill="url(#color)"
                className=" stroke-[1.8] fill-current"
              />
            </AreaChart>  
          </ResponsiveContainer>
        </div>
      </CardContent>
     

    </Card>
  )
}