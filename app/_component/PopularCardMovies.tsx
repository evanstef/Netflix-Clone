"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import bg from '../../public/login__bg.jpg'
import Wrapper from './Wrapper'
import love from '../../public/icons8-love-24.png'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import notFound from '../../public/dskmqklmsmdq.jpg'
import { addToWatchList } from '@/action/addToWatchList'
import useCurrentUser from '@/hooks/useCurrentUser'
import { usePathname } from 'next/navigation'
import { deleteWatchList } from '@/action/deleteWatchList'
import { useRouter } from 'next/navigation'
import { useData } from '@/context/dataContext'

type PopularProps = {
  id : number;
  poster : string;
  title : string;
  year : string;
  overview : string;
  ratings : number;
  data : any
}

const PopularCardMovies = ({poster, title, year, overview, ratings, id, data} : PopularProps) => {
  const user = useCurrentUser()
  const {resetValueSearch} = useData()
  const years = year.split("-")[0]
  const pathname = usePathname()
  const router = useRouter()

  function handleClickDelete () {
    deleteWatchList(id, user?.id)
  }
  
  let check = data?.some((item : any) => item.id === id)
  
  return (
    
      <div className='relative w-40 h-52 md:w-52 md:h-72 hover:scale-110 duration-300'>  
              <Image className='w-full h-full rounded-lg' width={224} height={288} src={poster === null ? notFound : `https://image.tmdb.org/t/p/w500${poster}`} alt='' /> 
            <div className='absolute opacity-0 hover:opacity-100 top-0 w-full h-full bg-black/50 md:p-3 p-2 duration-300'>
              
               {pathname === "/my-list" ? 
               <button onClick={() => deleteWatchList(id, user?.id)} className='w-full flex justify-end'>
                  <svg className='w-5 h-5 md:w-8 md:h-8 invert' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="0" height="0" viewBox="0 0 50 50">
                  <path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z"></path>
                  </svg> 
               </button>
                  : 
                <button onClick={() => addToWatchList(id, user?.id)} className='w-full flex justify-end'>
                   <Heart className={`w-6 h-6 md:w-8 md:h-8 ${check ? "fill-white" : ""}`}/>
                </button>   
                } 
                <div className='text-xs mt-16 md:mt-24'>
                  <h1 className='line-clamp-1'>{title}</h1>
                  <p className='text-sm'>{years}</p>
                  <p className='line-clamp-2 text-xs md:text-base'>{overview}</p>
                  <p>⭐{parseFloat(ratings.toFixed(1))}</p>
                  <Link onClick={() => resetValueSearch()} className='bg-red-500 px-2 rounded mt-2 hover:bg-red-800 text-sm md:text-base duration-300 ease-in-out' href={`/movie/${id}`}>Details</Link>
                </div>
            </div>  
      </div>   
  )
}

export default PopularCardMovies