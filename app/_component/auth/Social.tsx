"use client"

import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa';
import { signIn } from "next-auth/react";
import { DEFAULT_REDIRECT_ROUTE } from "@/router";

const Social = () => {
    const onClick = (providers : "github" | "google") => {
        signIn(providers, {
            callbackUrl : DEFAULT_REDIRECT_ROUTE
        })
    }

  return (
    <div className='flex gap-10'>
        <span onClick={() => onClick("google")} className='flex gap-3 items-center hover:bg-red-600 duration-300 justify-center border rounded-lg p-3 w-1/2'><FaGoogle size={30} />Google</span>
        <span onClick={() => onClick("github")} className='flex gap-3 items-center hover:bg-red-600 duration-300 border rounded-lg p-3 w-1/2 justify-center'><FaGithub size={30} />Github</span>
    </div>
  )
}

export default Social