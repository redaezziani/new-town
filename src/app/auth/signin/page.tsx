'use client';
import SubmitButton from '@/components/admin/submit'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignInSchema } from '@/app/types/from';
import { SignIn } from '@/(db)/(auth)/user-actions'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, MessageCircleCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
const SignInPage = () => {
  const [err, setErr] = useState({
    email: '',
    password: ''
  });
  const [isloading, setIsloading] = useState(false);
  const [isHide, setIsHide] = useState(true)
  const router = useRouter();
  const { toast } = useToast()
  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData) => {
    try {
      event.preventDefault();
      setIsloading(true);
      const form = Object.fromEntries(formData.entries());
      const result = await SignInSchema.parseAsync(form);
      setErr({
        email: '',
        password: ''
      });
      const res = await SignIn(result) as any;
      if (res.status === 'error') {
        console.log(res.message);
      }

      if (res.status === 'success') {
        router.refresh();
      }
      else {
        toast({
          variant: 'destructive',
          title: "Uh oh! Something went wrong.",
          description: res.message
        })
      }
    } catch (error: any) {
      if (error.errors) {
        error.errors.map((err: z.ZodIssue) => {
          if (err.path[0] === 'email') {
            setErr((prev) => ({
              ...prev,
              email: err.message
            }));
          }
          if (err.path[0] === 'password') {
            setErr((prev) => ({
              ...prev,
              password: err.message
            }));
          }
        });
      }
    }
    finally {
      setIsloading(false);
    }
  }
  const handelHide = () => {
    setIsHide(!isHide)
  }
  return (
    <div className=" h-screen overflow-hidden w-full relative flex justify-start items-center gap-9">
      <img
        className=' w-1/2  aspect-auto'
        src="/login.jpg" alt="login" />
      <div className="flex justify-start items-center flex-col">
      <form
        onSubmit={(event) => handelSubmit(event, new FormData(event.currentTarget))}
        className="w-full lg:max-w-[30rem] flex justify-start items-start flex-col gap-5"
      >
        <div className="flex justify-start items-start gap-4 flex-col">
          <h2
            className='text-3xl  font-bold'
          >
            Welcome back !
          </h2>
          <p
            className='text-sm font-normal text-slate-400'
          >
            Become a member - you ll enjoy new products, exclusive deals and offers.
          </p>
        </div>
        <div className="flex mt-7 w-full justify-start items-start flex-col gap-2">
          <Label
            className=' font-semibold'
            htmlFor="email">Email</Label>
          <Input
            className=' w-full'
            type="email"
            placeholder="
        Enter your email"
            autoComplete="email"
            name='email'
          />
          <p
            className=' text-destructive text-sm font-normal'
          >
            {err.email}
          </p>
        </div>
        <div className="flex w-full justify-start items-start flex-col gap-2">
          <Label
            className=' font-semibold'
            htmlFor="password">Password</Label>
          <div className="flex relative w-full justify-start items-center">
            <Input
              className=' w-full z-10'
              type={isHide ? 'password' : 'text'}
              placeholder="Enter your password"
              autoComplete="current-password"
              name='password'
            />
            <div
              onClick={handelHide}
              className="flex cursor-pointer z-30 right-3 absolute h-[90%] aspect-square bg-background justify-center items-center">
              {isHide ? <Eye className='  text-slate-300 ' size={18} /> : <EyeOff className=' text-pretty ' size={18} />}
            </div>
          </div>
          <p
            className=' text-destructive text-sm font-normal'
          >
            {err.password}
          </p>
        </div>
        <div className="flex gap-2 justify-between items-center w-full ">
          <div className="flex group-checked:text-pretty text-slate-400  justify-start gap-2 items-center">
            <Checkbox
              className=''
              color=''
              name='rememberMe'
            />
            <Label
              className=' text-xs'
            >
              keep me signed in
            </Label>
          </div>
          <Link
            href="#"
            className='text-sm text-primary'
          >
            Forgot password?
          </Link>
        </div>
        <SubmitButton ispending={isloading} >
          Sign In
        </SubmitButton>
        <div className="w-full flex justify-center items-center">
          <p
            className=' text-slate-400'
          >
            Dont have an account?
            <Link
            href={'/auth/signup'}
            className=' ml-1 text-primary'>Sign Up</Link>
          </p>
        </div>
        
      </form>
      <div className="flex w-full mt-5 justify-center items-center flex-col gap-3">
          <Button
          variant={'outline'}
          className=' flex justify-center w-full items-center gap-2'
          >
            <img src="/logo/google.svg" alt="google" className=' w-7 h-7' />
            Sign in with google
          </Button>
          <Button
          variant={'outline'}
          className=' flex justify-center w-full items-center gap-2'
          >
            <img src="/logo/github.svg" alt="github" className=' w-6 h-6' />
            Sign in with github
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignInPage