"use client"

import React from 'react'
import Wrapper from './Wrapper'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Background from './BackgroundAuthPage'

const Navbar = () => {
  const pathname = usePathname()
  const authRouter = ["/login", "/signup", "/error"]

  const isAuth = authRouter.includes(pathname)

  return ( 
    <>
      {!isAuth && 
        <div className={`${pathname === "/" || pathname === "/tvshows"  ? "absolute z-10" : ""} w-full`}>
          <div className='container mx-auto px-7 md:px-0 flex justify-between items-center'>
          <div className='flex items-center justify-between w-[40%]'>
            {/* Logo Netflix */}
              <svg className='fill-red-600 w-36 h-36' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                <path d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"></path>
              </svg>
            {/* Menu */}
            <div className='flex gap-6'>
              <Link className={`${pathname === "/" ? "underline" : ""} hover:underline`} href={"/"}>Home</Link>
              <Link className={`${pathname === "/tvshows" ? "underline" : ""} hover:underline`} href={"/tvshows"}>Tv Shows</Link>
              <Link className={`${pathname === "/movies" ? "underline" : ""} hover:underline`} href={"/movies"}>Movies</Link>
              <Link className={`${pathname === "/my-list" ? "underline" : ""} hover:underline`} href={"/my-list"}>My List</Link>
            </div>
          </div> 

          {/* User Interface  */}
          <div className='flex items-center gap-10'>
            {/* Search button */}
            <svg className='invert' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>

            {/* User Profile */}
            <div className='w-10 h-10 bg-slate-50'></div>
          </div>
          </div> 
        </div>
      }
    </>
  )
}

export default Navbar