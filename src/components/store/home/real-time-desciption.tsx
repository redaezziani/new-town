'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { toast } from 'sonner';
type desciption = {
    description:string
}
const RealTimeDesciption = ({description}:desciption) => {
   const supabase= createClientComponentClient()
   
   
   const router = useRouter()
   useEffect(()=>{
        toast.info(description)
        const channel = supabase.channel('store_pub').on('postgres_changes',{
            event: '*',
            schema: 'public',
            table: 'store_pub'
        },()=>{
            router.refresh()
        }).subscribe()

        return ()=>{
            supabase.removeChannel(channel)
        }
    },[supabase,router])
  return (
    <h3
        className=" text-primary-foreground text-center font-semibold"
        >
          {description}
    </h3>
  )
}

export default RealTimeDesciption