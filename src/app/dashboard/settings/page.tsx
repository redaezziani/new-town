'use client';
import { SingleImageDropzoneUsage } from "@/components/for-all/singel-image-uploader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [image, setImage] = useState<string | null>(null);

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
      <div
        className="w-full flex mt-32 flex-col md:flex-row  justify-start items-start  min-h-60 relative"
      >
        <div className="flex flex-col gap-2">
          <h3
            className="text-lg text-slate-600 font-semibold"
          >
            Personel Information
          </h3>
          <p
            className="text-sm text-slate-500"
          >
            Update your personel information here
          </p>
        </div>
        <div className="w-full lg:ml-56 lg:w-[60%] gap-4 bg-background lg:p-2 justify-start flex flex-col items-start">
          <Label

          >
            Username
          </Label>

          <Input
            className="w-full"
            placeholder="Username"
            value={user?.data?.username ?? ''}
          />
          <Label
          >
            Email
          </Label>
          <Input
            className="w-full"
            placeholder="Email"
            value={user?.data?.email ?? ''}
          />
          <Label
          >
            Password
          </Label>
          <Input
            className="w-full"
            placeholder="Password"
            type="password"
          />
          <Label
            className='text-muted-foreground dark:text-muted-foreground '
            htmlFor='image'
          >
            Image
          </Label>
          <SingleImageDropzoneUsage
            onFileChange={(url) => setImage(url)}
          />
          <Button
            className="w-full"
            onClick={() => { }}
          >
            Update Profile
          </Button>
        </div>
      </div>
    </main>
  )
}

export default SettingPage