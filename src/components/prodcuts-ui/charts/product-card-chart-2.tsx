"use client"

import { Area, AreaChart, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
 
} from "@/components/ui/card"

interface OrderCardProps {
  data: {
    thisMonthOrders : {
      id: string, price: number, total: number, createdAt: string ,
    }[],
  }[]
}

export function ProductsShart({ data }: {data: OrderCardProps}) {
  return (
    <Card
    className="w-full h-[80px] border-none shadow-none p-0  overflow-hidden"
    >

      <CardContent className="p-0">
        <div className="h-[80px] w-full">
          <ResponsiveContainer
          style={{
            padding: "0px",
          }}
          width="100%" height="100%">
            <AreaChart
            title=" "
            throttleDelay={0}
              //@ts-ignore
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
                <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"
                   stopColor={"#adf802"}
                    stopOpacity={0.4}/>
                  <stop offset="75%" 
                  stopColor={"#adf802"}
                   stopOpacity={0.05}/>
                </linearGradient>
                </defs>
                <Area
                dataKey="price"
                type={'bump'}
                stroke={"#adf802"}
                fill="url(#color3)"
                className=" stroke-[1.8] fill-current"
              />
            </AreaChart>  
          </ResponsiveContainer>
        </div>
      </CardContent>
     

    </Card>
  )
}