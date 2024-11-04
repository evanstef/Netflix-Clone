"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import bg from '../../public/login__bg.jpg'
import { usePathname } from 'next/navigation'
import Wrapper from './Wrapper'
import play from '../../public/icons8-video-playlist-30.png'
import love from '../../public/icons8-love-50.png'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { addToWatchListTv } from '@/action/addToWatchListTv'
import useCurrentUser from '@/hooks/useCurrentUser'
import { addToWatchList } from '@/action/addToWatchList'
import { useData } from '@/context/dataContext'

type Props = {
  title : string
  overview : string
  background : string
  id : number
  type? : string
  ratings : number
  year : string
  data : any
}

const Background = ({title, overview, background, id, type, ratings, year, data} : Props) => {
  const {resetValueSearch} = useData()
  let pathname = usePathname()
  const years = year.split("-")[0]
  const user = useCurrentUser()

  let check = data.some((item : any) => item.id === id)

  return (
    <div className='relative mb-16'>
        <Image loading='lazy' width={1920} height={1080} src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${background}`} alt=''/>
        <div className='absolute w-full h-full flex items-end pb-3 md:pb-10 xl:pb-0 xl:items-center top-0 bg-gradient-to-b from-black/50 to-black'>
          <Wrapper>
              <div  className='w-full md:w-3/4 xl:w-1/2'>
                <h1 className='text-xs md:text-3xl lg:text-4xl xl:text-6xl md:mb-3'>{title}</h1>
                <div className='flex gap-2 md:gap-10 md:mb-4'>
                  <p className='text-[10px] md:text-base'>{years}</p>
                  <p className='text-[10px] md:text-base'>{ratings === 0 ? "Not Rated Yet" : "⭐" + parseFloat(ratings.toFixed(1))}</p>
                </div>
                <p className='text-[7px] md:text-xs lg:text-sm xl:text-base mb-2 md:mb-4'>{overview}</p>
                  <div className='flex gap-3'>
                    <Link onClick={() => resetValueSearch()} className='flex items-center gap-2 md:gap-5 px-2 bg-red-700 py-1 md:px-6 rounded-lg text-white hover:bg-red-600 duration-300' href={pathname === "/tvshows" ? `/tv/${id}` : `/movie/${id}`}>
                      <InfoCircledIcon color='white' className='w-4 h-4 md:w-8 md:h-8'/>
                      <p className='text-[10px] md:text-base'>Detail</p>
                    </Link>
                    <button onClick={() => pathname === "/tvshows" ? addToWatchListTv(id, user?.id) : addToWatchList(id, user?.id)} className='flex gap-2 md:gap-5 items-center bg-red-700 hover:bg-red-500 text-white px-2 py-1 md:px-6 rounded-lg duration-300'>
                      <Heart color='white' className={`w-4 h-4 md:w-8 md:h-8 ${check ? "fill-white" : ""}`}/>
                      <p className='text-[10px] md:text-base'>Add To List</p> 
                    </button>
                  </div>
              </div>
          </Wrapper>
        </div>
    </div>
    
  )
}

export default Background