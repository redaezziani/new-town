'use client';
import SubmitButton from '@/components/admin/submit'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignUpSchema } from '@/app/types/from';
import { SignUp } from '@/(db)/(auth)/user-actions'
import {  useState } from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff } from 'lucide-react';
import { ForgetPassword } from '@/components/admin/forget-password';
import { MessageAlert } from '@/components/admin/ui/message';
const SignUpPage = () => {
  const [err, setErr] = useState({
    email: '',
    password: '',
    name : ''
  });
  const [isloading, setIsloading] = useState(false);
  const [isHide, setIsHide] = useState(true)
  const router = useRouter();
  const { toast } = useToast()
  const [open, setOpen] = useState(false);
  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData) => {
    try {
      event.preventDefault();
      setIsloading(true);
      const form = Object.fromEntries(formData.entries());
      const result = await SignUpSchema.parseAsync(form);
      setErr({
        email: '',
        password: '',
        name : ''
      });
      if (result.password !== formData.get('passwordConfirm') as string) {
        setErr((prev) => ({
          ...prev,
          password: 'Password does not match'
        }));
        return;
      }
      const res = await SignUp(result) as any;
      if (res.status === 'error') {
        toast({
          variant: 'destructive',
          title: "Uh oh! Something went wrong.",
          description: res.message
        })
      }

      if (res.status === 'success') {
        setOpen(true);
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
          if (err.path[0] === 'name') {
            setErr((prev) => ({
              ...prev,
              name: err.message
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
    <div className=" h-screen  overflow-hidden w-full relative flex justify-start items-center gap-9">
      <MessageAlert title='Account Created' description='Your account has been created successfully , please check your email to verify your account' isOpen={open} />
     <img
        className=' w-1/2 aspect-auto'
        src="/login.jpg" alt="login" />
      <form
        onSubmit={(event) => handelSubmit(event, new FormData(event.currentTarget))}
        className="w-full lg:max-w-[30rem] flex justify-start items-start flex-col gap-5"
      >
        <div className="flex justify-start items-start gap-4 flex-col">
          <h2
            className='text-3xl  font-bold'
          >
            Create Account !
          </h2>
          <p
            className='text-sm font-normal text-slate-400'
          >
            Become a member - you ll enjoy new products, exclusive deals and offers.
          </p>
        </div>
        <div className="flex mt-7 w-full justify-start items-start flex-col gap-3">
          <Label
            className=' font-semibold'
            htmlFor="name">Name</Label>
          <Input
            className=' w-full'
            type="text"
            placeholder="
        Enter your name"
            autoComplete="name"
            name='name'
          />
          <p
            className=' text-red-600 text-sm font-normal'
          >
            {err.name}
          </p>
        </div>

        <div className="flex  w-full justify-start items-start flex-col gap-3">
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
            className=' text-red-600 text-sm font-normal'
          >
            {err.email}
          </p>
        </div>
        <div className="flex w-full justify-start items-start flex-col gap-3">
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
            className=' text-red-600 text-sm font-normal'
          >
            {err.password}
          </p>
        </div>
        <div className="flex w-full justify-start items-start flex-col gap-3">
          <Label
            className=' font-semibold'
            htmlFor="passwordConfirm">Confirm Password</Label>
          <Input
            className=' w-full'
            type="password"
            placeholder="Confirm your password"
            autoComplete="current-password"
            name='passwordConfirm'
          />
          <p
            className=' text-red-600 text-sm font-normal'
          >
            {err.password}
          </p>
        </div>

        <div className="flex gap-3 mt-3 justify-between items-center w-full ">
          <div className="flex group justify-start gap-3 items-center">
            <Checkbox
              className=''
              color=''
              name='rememberMe'
            />
            <Label
              className=' font-semibold text-slate-300 group-data-[state=checked]:bg-primary'
            >
              Keep me signed in
            </Label>
          </div>
          <ForgetPassword />
        </div>
        <SubmitButton
        
        ispending={isloading} >
          Sign up
        </SubmitButton>
        <div className="w-full flex justify-center items-center">
          <p
            className=' text-slate-400'
          >
            Dont have an account? <Link
            href={'/auth/signin'}
            className=' ml-1 text-primary'>Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage