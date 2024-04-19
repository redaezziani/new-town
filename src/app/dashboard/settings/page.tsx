'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import InfoCardUpdate from "@/components/user/card-info-settings/info-card-update";

import { useState, useEffect } from "react"

const SettingPage = async () => {
  const [user, setUser] = useState<any>(null)
  const handelUser = async () => {
    try {
      const res = await fetch('/api/user', { next: { revalidate: 10 }, })
      const data = await res.json()
      setUser(data)
    } catch (error) {
    }
  }
  
  useEffect(() => {
    handelUser()
  }, [])
  return (
    <main
      className='w-full flex z-10  h-fit min-h-screen overflow-hidden  relative justify-start items-start gap-3 flex-col'
    >
      <div className="w-full flex flex-col justify-end items-start  min-h-60 relative bg-gradient-to-b from-transparent to-slate-300/55 p-3 border-b border-slate-300/30">
        <div className="w-full  absolute -bottom-20 flex justify-start items-center gap-4">
          <Avatar

            className="  cursor-pointer size-32 bg-background flex overflow-hidden rounded-full"
          >
            <AvatarImage
              className=" aspect-square object-cover"
              src={user?.data?.profile ?? ''}
              alt="User Profile Image"
            />
            <AvatarFallback
              className=" text-lg "
            >
              {user?.data?.username.charAt(0).toUpperCase() ?? ''}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col mt-10 gap-1">
            <p className="text-lg font-bold ">{user?.data?.username ?? ''}</p>
            <p className="text-sm ">{user?.data?.email ?? ''}</p>
          </div>
        </div>
      </div>
      <InfoCardUpdate user={user} />
    </main>
  )
}

export default SettingPage