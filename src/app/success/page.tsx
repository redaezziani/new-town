'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useEffect } from 'react';
import { Button, Result } from 'antd';

const page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id')
  const handelAddPlan = async () => {
    try {
      const result = await fetch("/api/acount-plan", {
        method: "post",
        body: JSON.stringify({ session_id }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await result.json();
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handelAddPlan()
  }, [])
  return (
    <div
      className=' min-h-screen w-full justify-center items-center flex'
    >
      {session_id &&
       <Result
       style={
          {
            width: '30%'
          }
       }
       status="success"
       title="Successfully Purchased Cloud Server ECS!"
       subTitle={`Order number: ${session_id} Cloud server configuration takes 1-5 minutes, please wait.`}
       extra={[
         <Button type="primary" key="dashboard">
            Go Dashboard
         </Button>,
         <Button key="buy">Buy Again</Button>,
       ]}
     />
      }
    </div>
  )
}

export default page