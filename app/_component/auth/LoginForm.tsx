"use client"

import * as z from "zod"
import React, { useState, useTransition } from 'react'
import AuthBackground from './AuthBackground';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginSchema } from "@/app/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/action/login";
import Social from "./Social";


type Input = {
  email : string,
  password : string
}

const LoginForm = () => {
  const [error,setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof LoginSchema>>({
    resolver : zodResolver(LoginSchema),
    defaultValues : {
      email : "",
      password : ""
    },
  })
  
  const handleLogin : SubmitHandler<z.infer<typeof LoginSchema>> = (values : z.infer<typeof LoginSchema>) => {
    startTransition(() => {
       login(values)
        .then((data) => {
          if(data?.error){
            reset()
            setError(data.error)
          }
        })
    })
  }


  return (
    <AuthBackground>
      <div className='absolute w-full h-full top-0 bg-black/50'>
        {/* Logo Netflix */}
        <div className='container mx-auto px-7 mb-10 md:mb-0'>
          <svg className='fill-red-600 w-32 h-32 md:w-40 md:h-40' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
            <path d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"></path>
          </svg>
        </div>
        <div className='flex justify-center items-center h-[60%]'>
          <form className='bg-black/80 rounded-xl p-6 w-[370px] space-y-3 md:w-[500px] md:space-y-5' onSubmit={handleSubmit(handleLogin)}>
            <h1 className='text-center font-bold text-xl md:text-4xl'>Log In</h1>

            <div>
              <label htmlFor="email" className='block mb-2'>Email</label>
              <input {...register('email')} className='w-full bg-transparent border text-sm md:text-base rounded-lg py-2 px-4' type="email" name="email" placeholder='Your Email' id='email' />
              {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className='block mb-2'>Password</label>
              <input {...register('password')} className='w-full bg-transparent border rounded-lg text-sm md:text-base py-2 px-4' type="password" name="password" placeholder='Your Password' id='password' />
              {errors.password && <p className="text-red-600 mt-1">{errors.password.message}</p>}
            </div>

            <h1 className='text-center text-base md:text-xl font-bold'>OR</h1>

            <Social />

            {error && <h1 className="text-red-600 bg-slate-300 p-2 font-bold rounded-lg">{error}</h1>}

            <button disabled={isPending} className='bg-red-600 w-full py-1 rounded-lg'>{isPending ? 'Logging in...' : 'Log In'}</button>
            <p className='text-center text-sm'>Dont Have Account ? <Link className='underline hover:text-red-600' href={'/signup'}>Sign Up</Link></p>
          </form>
        </div>
      </div>
    </AuthBackground>
  )
}

export default LoginForm;