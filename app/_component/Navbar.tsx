"use client"

import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Background from './BackgroundAuthPage'
import useCurrentUser from '@/hooks/useCurrentUser'
import Image from 'next/image'
import bg from '../../public/background_banner.jpg'
import logout from '@/action/logout'
import { signOut } from 'next-auth/react'
import UserInfo from './UserInfo'
import { useData } from '@/context/dataContext'
import {AnimatePresence, motion} from "framer-motion"
import posterNotFound from '../../public/dskmqklmsmdq.jpg'


const Navbar = () => {
  const pathname = usePathname()

  const {searchMovies, searchTvShows, handleValueSearch, resultMovies, resultTvShows, valueSearch, resetValueSearch} = useData()
  const [openSearch, setOpenSearch] = useState(false)
  const [open, setOpen] = useState(false)
  const authRouter = ["/login", "/signup", "/error"]



  const isAuth = authRouter.includes(pathname)

  function handleOpen() {
    setOpen(!open)
  }


  function handleClick() {
    setOpenSearch(!openSearch)
  }

  function handleSearch(e : any) {
    searchMovies(e.target.value)
    searchTvShows(e.target.value)
    handleValueSearch(e)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  // mengurutkan hasil pencarian film berdasarkan vote_countnya 
  const sortedMovies : Array<any> = resultMovies.sort((a: any, b: any) => b.vote_count - a.vote_count).slice(0,4);
  const sortedTvShows : Array<any> = resultTvShows.sort((a: any, b: any) => b.vote_count - a.vote_count).slice(0,4);

  return ( 
    <>
      {!isAuth && 
        <div className={`${( pathname === "/" ) || pathname === "/tvshows"  ? "absolute z-10" : ""} w-full`}>
          <div className='container mx-auto px-7 flex justify-between items-center'>
          <div className='flex items-center justify-between gap-3 w-[30%] md:w-1/2 xl:w-[40%]'>
            
            {/* Sidebar menu */}
            <div onClick={() => handleOpen()} className={`${open ? "relative z-40" : ""} flex flex-col gap-1 md:hidden`}>
              <span className={`w-7 h-1 duration-300 ease-in-out bg-white rounded-lg ${open ? "rotate-90 scale-150" : ""}`}></span>
              <span className={`w-7 h-1 bg-white duration-300 ease-in-out rounded-lg ${open ? "opacity-0 rotate-90" : ""}`}></span>
            </div>
            {/* Menu Mobile */}
            <AnimatePresence>
              {open && 
              <motion.div initial={{x:-200, opacity : 0}} animate={{x : 0, opacity : 1}} exit={{x:-200, opacity : 0}} className={`flex flex-col bg-gray-950 md:hidden justify-center items-center text-2xl gap-10 absolute z-10 top-0 left-0 w-1/2 h-screen`}>
              <Link onClick={() => setOpen(false)} className={`${pathname === "/" ? "underline font-bold" : ""} hover:underline`} href={"/"}>Home</Link>
              <Link onClick={() => setOpen(false)} className={`${pathname === "/tvshows" ? "underline font-bold" : ""} hover:underline`} href={"/tvshows"}>Tv Shows</Link>
              <Link onClick={() => setOpen(false)} className={`${pathname === "/movies" ? "underline font-bold" : ""} hover:underline`} href={"/movies"}>Movies</Link>
              <Link onClick={() => setOpen(false)} className={`${pathname === "/my-list" ? "underline font-bold" : ""} hover:underline`} href={"/my-list"}>My List</Link>
            </motion.div>
            }
            </AnimatePresence>

            {/* Logo Netflix */}
            <svg className='fill-red-600 w-16 h-16 z-10 md:z-0 md:w-36 md:h-36' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
              <path d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"></path>
            </svg>
            {/* Menu */}
            <div className='hidden md:flex md:text-sm lg:text-base gap-6'>
              <Link onClick={() => resetValueSearch()} className={`${pathname === "/" ? "underline font-bold" : ""} hover:underline`} href={"/"}>Home</Link>
              <Link onClick={() => resetValueSearch()} className={`${pathname === "/tvshows" ? "underline font-bold" : ""} hover:underline`} href={"/tvshows"}>Tv Shows</Link>
              <Link onClick={() => resetValueSearch()} className={`${pathname === "/movies" ? "underline font-bold" : ""} hover:underline`} href={"/movies"}>Movies</Link>
              <Link onClick={() => resetValueSearch()} className={`${pathname === "/my-list" ? "underline font-bold" : ""} hover:underline`} href={"/my-list"}>My List</Link>
            </div>
          </div> 

          {/* User Interface  */}
          <div className='flex items-center gap-3 md:gap-7 lg:gap-10'>

            {/* Search button */}
            <div className='flex items-center'>
                <svg onClick={() => handleClick()} className={`invert duration-300 ${openSearch ? "opacity-0" : ""}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                </svg>
                {/* Bagian Search Movie Atau Tv Shows */}
                <div className='relative'>
                  <input onChange={(e) => handleSearch(e)} value={valueSearch} className={`text-white bg-transparent rounded-xl text-[8.5px] md:text-sm lg:text-base border-white  outline-none duration-300 ${openSearch ? "w-[153px] md:w-72 lg:w-96 pr-5 pl-2 md:pl-5 md:pr-10 py-2 border" : "w-0"}`} type="text" placeholder='Search Movie Or Tv Shows' />
                  <svg onClick={() => handleClick()} className={`w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 invert absolute top-0 right-0 cursor-pointer ${openSearch ? "" : "opacity-0"}`} width="0" height="0" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.014 8.46835C14.7204 8.17619 14.2455 8.17737 13.9533 8.47099C13.6612 8.76462 13.6624 9.23949 13.956 9.53165L15.014 8.46835ZM16.971 12.5317C17.2646 12.8238 17.7395 12.8226 18.0317 12.529C18.3238 12.2354 18.3226 11.7605 18.029 11.4683L16.971 12.5317ZM18.029 12.5317C18.3226 12.2395 18.3238 11.7646 18.0317 11.471C17.7395 11.1774 17.2646 11.1762 16.971 11.4683L18.029 12.5317ZM13.956 14.4683C13.6624 14.7605 13.6612 15.2354 13.9533 15.529C14.2455 15.8226 14.7204 15.8238 15.014 15.5317L13.956 14.4683ZM17.5 12.75C17.9142 12.75 18.25 12.4142 18.25 12C18.25 11.5858 17.9142 11.25 17.5 11.25V12.75ZM3.5 11.25C3.08579 11.25 2.75 11.5858 2.75 12C2.75 12.4142 3.08579 12.75 3.5 12.75V11.25ZM13.956 9.53165L16.971 12.5317L18.029 11.4683L15.014 8.46835L13.956 9.53165ZM16.971 11.4683L13.956 14.4683L15.014 15.5317L18.029 12.5317L16.971 11.4683ZM17.5 11.25H3.5V12.75H17.5V11.25Z" fill="#000000"/>
                  <path d="M9.5 15C9.5 17.2091 11.2909 19 13.5 19H17.5C19.7091 19 21.5 17.2091 21.5 15V9C21.5 6.79086 19.7091 5 17.5 5H13.5C11.2909 5 9.5 6.79086 9.5 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.014 8.46835C14.7204 8.17619 14.2455 8.17737 13.9533 8.47099C13.6612 8.76462 13.6624 9.23949 13.956 9.53165L15.014 8.46835ZM16.971 12.5317C17.2646 12.8238 17.7395 12.8226 18.0317 12.529C18.3238 12.2354 18.3226 11.7605 18.029 11.4683L16.971 12.5317ZM18.029 12.5317C18.3226 12.2395 18.3238 11.7646 18.0317 11.471C17.7395 11.1774 17.2646 11.1762 16.971 11.4683L18.029 12.5317ZM13.956 14.4683C13.6624 14.7605 13.6612 15.2354 13.9533 15.529C14.2455 15.8226 14.7204 15.8238 15.014 15.5317L13.956 14.4683ZM17.5 12.75C17.9142 12.75 18.25 12.4142 18.25 12C18.25 11.5858 17.9142 11.25 17.5 11.25V12.75ZM3.5 11.25C3.08579 11.25 2.75 11.5858 2.75 12C2.75 12.4142 3.08579 12.75 3.5 12.75V11.25ZM13.956 9.53165L16.971 12.5317L18.029 11.4683L15.014 8.46835L13.956 9.53165ZM16.971 11.4683L13.956 14.4683L15.014 15.5317L18.029 12.5317L16.971 11.4683ZM17.5 11.25H3.5V12.75H17.5V11.25Z" fill="#000000"/>
                  <path d="M9.5 15C9.5 17.2091 11.2909 19 13.5 19H17.5C19.7091 19 21.5 17.2091 21.5 15V9C21.5 6.79086 19.7091 5 17.5 5H13.5C11.2909 5 9.5 6.79086 9.5 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
            </div>

            {/* Hasil Pencarian Film dari user */}
            {valueSearch.length > 2  &&
              <div className={`bg-black justify-between gap-2 lg:gap-6 items-start p-2 md:p-3 absolute w-auto h-auto top-14 right-4 md:top-28 lg:top-24 lg:right-20 border-[0.5px] border-[#4b4b4b] rounded-lg z-50 ${openSearch === false ? "hidden" : "flex"}`}>

                {/* ini bagian movie */}
                <div className='space-y-2'>
                  <h1 className='font-bold text-lg'>Movies</h1>
                  {/* Pengecekan bila data tidak ditemukan */}
                  {sortedMovies.length === 0 ? 
                    <p className='text-[10px] lg:text-xs font-bold text-center'>No Result For {valueSearch}</p> 
                    :
                    sortedMovies.map((item : any, i) => (
                        <Link onClick={() => resetValueSearch()} href={`/movie/${item.id}`} key={i} className='flex items-center gap-1 md:gap-2 lg:gap-3 duration-300 hover:bg-gray-600 p-1 lg:p-2 hover:cursor-pointer rounded'>
                          <Image className='w-7 h-11 md:w-12 md:h-[70px] lg:w-16 lg:h-24 sm:rounded' src={ item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : posterNotFound } width={200} height={300} alt='' />
                          <div className='text-[6px] md:text-[8px] lg:text-[10px]'>
                            <p className='line-clamp-1'>{item.title}</p>
                            <p>{item.release_date.split("-")[0]}</p>
                            <p>⭐{parseFloat(item.vote_average.toFixed(1))}</p>
                          </div>
                        </Link>
                    ))
                    }
                </div>

                {/* ini bagian tv show */}
                <div className='space-y-2'>
                  <h1 className='font-bold text-lg'>Tv Shows</h1>
                  {/* Pengecekan bila data tidak ditemukan */}
                  {sortedTvShows.length === 0 ?
                    <p className='text-[10px] lg:text-xs font-bold text-center'>No Result For {valueSearch}</p> 
                    :
                    sortedTvShows.map((item : any, i) => (
                    <Link onClick={() => resetValueSearch()} href={`/tv/${item.id}`} key={i} className='flex items-center gap-1 md:gap-2 lg:gap-3 duration-300 hover:bg-gray-600 p-1 lg:p-2 hover:cursor-pointer rounded'>
                      <Image className='w-7 h-11 md:w-12 md:h-[70px] lg:w-16 lg:h-24 sm:rounded' src={ item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : posterNotFound } width={200} height={300} alt='' />
                      <div className='text-[6px] md:text-[8px] lg:text-[10px]'>
                        <p className='line-clamp-1'>{item.name}</p>
                        <p>{item.first_air_date.split("-")[0]}</p>
                        <p>⭐{parseFloat(item.vote_average.toFixed(1))}</p>
                      </div>
                    </Link>
                    ))
                  }
                </div>
                    
              </div>
            }
            
            {/* User Profile */}
            <div className=''>
              <UserInfo />
            </div>
          </div>
          </div> 
        </div>
      }
    </>
  )
}

export default Navbar