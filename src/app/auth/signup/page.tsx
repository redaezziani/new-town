'use client';
import SubmitButton from '@/components/admin/submit'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignUpSchema } from '@/app/types/from';
import { SignUp } from '@/(db)/(auth)/user-actions'
import {  useState } from 'react'
import { z } from 'zod'
import Link from 'next/link';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { ForgetPassword } from '@/components/admin/forget-password';
import AlertMessage from '@/components/for-all/alert-message';
import { ResErrType } from '@/app/types/help';
import { GiSuckeredTentacle } from "react-icons/gi";
const SignUpPage = () => {
  const [err, setErr] = useState({
    email: '',
    password: '',
    name : ''
  });
  const [resErr, setResErr] = useState<ResErrType>({
    status: '',
    message: ''
  })
  const [isloading, setIsloading] = useState(false);
  const [isHide, setIsHide] = useState(true)
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
        setResErr({
          status: res.status,
          message: res.message
        });
      }
      else {
        setResErr({
          status: res.status,
          message: res.message
        });
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
    <div className=" h-screen overflow-hidden px-3 lg:p-0 w-full relative flex justify-center lg:justify-start items-center">
    
    <div className="flex relative h-full w-full lg:w-1/2  justify-center items-center flex-col">
    <div className="  z-50 w-full fixed lg:absolute  top-0 left-0 px-4 py-3 text-white">
        <Link
          href='/'
        className=" w-full flex justify-start px-10 gap-2 items-center">
             <svg 
              className="text-slate-900 ml-3 dark:text-slate-50"
            width="30" height="30" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.32961 43.2093C0 56.0745 0 72.3843 0 105.004C0 137.623 0 153.933 5.32961 166.798C12.4341 183.948 26.0596 197.574 43.2093 204.678C56.0745 210.008 72.3843 210.008 105.004 210.008C137.623 210.008 153.933 210.008 166.798 204.678C183.948 197.574 197.574 183.948 204.678 166.798C209.454 155.269 209.95 140.974 210.002 114.653H131.113L89.679 172.547L97.6252 114.653H59.0292L114.653 37.4608L107.274 94.2197H209.999C209.935 68.6209 209.385 54.5717 204.678 43.2093C197.574 26.0596 183.948 12.4341 166.798 5.32961C153.933 0 137.623 0 105.004 0C72.3843 0 56.0745 0 43.2093 5.32961C26.0596 12.4341 12.4341 26.0596 5.32961 43.2093Z"
                fill="currentColor"
              />
            </svg>
            <h2
              className=" text-slate-900 ml-3 dark:text-slate-50 font-bold"
            >
              zunder io
            </h2>
          </Link>
        </div>

      <form
        onSubmit={(event) => handelSubmit(event, new FormData(event.currentTarget))}
        className="w-full lg:max-w-[33rem] flex justify-start items-start flex-col gap-5"
      >
       <div className="flex justify-start items-start  flex-col">
            <span
              className='text-3xl  font-bold flex justify-start items-center  '
            >
             Create an account
            </span>
            <p
              className='text-sm font-normal text-slate-400'
            >
              Become a member - you ll enjoy new products, exclusive deals and offers.
              please fill in the form to create an account
            </p>
            {resErr?.status === 'error' && <AlertMessage
              title='Error occured'
              className=' bg-red-500/10 text-red-500'
              icon={<ShieldAlert className=' text-red-500' size={20} />}
              description={resErr.message??''}
            /> 
            }
            {
              resErr?.status === 'success' && <AlertMessage
              title='Success'
              className=' bg-green-500/10 text-green-500'
              icon={<GiSuckeredTentacle className=' text-green-500' size={20} />}
              description={resErr.message??''}/>
            }
          </div>
        <div className="flex mt-7 w-full justify-start items-start flex-col gap-3">
          <Label
            className=' font-semibold'
            htmlFor="name">Name</Label>
          <Input
            className=' w-full'
            type="text"
            placeholder="Enter your name"
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
    <div className="w-1/2 h-full py-2 hidden lg:block">

      <img
        className=' w-full rounded-l-lg object-cover  aspect-auto'
        src="/login.jpg" alt="login" />
      </div>
    </div>
  )
}

export default SignUpPage