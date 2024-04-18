'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useEffect } from 'react';

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
      {session_id && <h1 className=' text-green-500'>Success</h1>}
    </div>
  )
}

export default page