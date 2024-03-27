'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const RestPasswordPage = () => {
  return (
    <div className=" h-screen overflow-hidden w-full relative flex justify-center items-center gap-9">
     
        <div className="flex flex-col gap-3 justify-start items-start w-96">
          <h1 className="text-4xl font-bold">Reset Password</h1>
          <p className="text-sm">Please enter your email address to reset your password</p>
          <Input placeholder="Email Address" />
          <Button>Reset Password</Button>
        </div>
    </div>
  )
}

export default RestPasswordPage;