import React from 'react'
import { ProductsShart } from "@/components/prodcuts-ui/product-card-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
const TabsProducts = () => {
  return (
    <div className="w-full mt-10 flex-col gap-2 justify-start items-start">

    <div className="w-full">
      <Tabs defaultValue="account" className="w-full">
        <TabsList
          className=" bg-transparent w-full flex-col gap-2 justify-start items-start"
        >
          <div className="flex text-slate-50 text-lg font-semibold  w-full justify-between items-center">
            <h3>
              Total Products
            </h3>
            <div className="flex">
              <TabsTrigger
                className="text-muted-foreground dark:text-muted-foreground shadow-none border-none ring-transparent"
                value="week">
                last week
              </TabsTrigger>
              <TabsTrigger
                className="text-muted-foreground dark:text-muted-foreground shadow-none border-none ring-transparent"
                value="month">
                last month
              </TabsTrigger>
            </div>
          </div>
    
        </TabsList>
        <TabsContent value="week">
    
        </TabsContent>
        <TabsContent
          className=" w-full min-w-full "
          value="month">
          <ProductsShart />
        </TabsContent>
      </Tabs>
    
    </div>
    </div>
  )
}

export default TabsProducts