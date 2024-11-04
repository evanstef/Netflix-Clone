"use client"
import React, { useEffect, useState } from 'react'
import bg from '../../public/login__bg.jpg'
import Image from 'next/image'
import love from '../../public/icons8-love-24.png'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { addToWatchList } from '@/action/addToWatchList'
import useCurrentUser from '@/hooks/useCurrentUser'
import { addToWatchListTv } from '@/action/addToWatchListTv'
import { useData } from '@/context/dataContext'
import { dataWatchList } from '@/action/dataWatchList'

type CardProps = {
  title: string;
  overview: string;
  poster: string;
  rating: number;
  year: string;
  id : number;
  type?: string;
  data : any
}

const CardTvShows = ({title,overview,poster,rating,year,id,type, data} : CardProps) => {
  const years = year.split("-")[0]
  const {resetValueSearch} = useData()
  const user = useCurrentUser()
  
  let check = data?.some((item : any) => item.id === id)
  return (
      <div className='relative w-40 h-24 md:w-52 md:h-28 xl:w-60 xl:h-36 hover:scale-110 md:hover:scale-[1.2] hover:z-10 duration-300'>
        <Image loading='lazy' className='w-full h-full rounded-lg' width={240} height={144} src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${poster}`} alt='' />
        <div className='absolute opacity-0 hover:opacity-100 top-0 w-full h-full bg-black/50 p-2 xl:p-3 duration-300'>
              <button onClick={() => addToWatchListTv(id, user?.id)} className='flex justify-end'>
                <Heart className={`w-5 h-5 ${check ? "fill-white" : ""}`} />
              </button>
                <div className='text-[6.5px] mt-2  md:text-[8px] xl:text-xs xl:mt-3'>
                  <h1 className='line-clamp-1'>{title}</h1>
                  <p className='text-[6px] md:text-[7.5px] xl:text-[10px]'>{years}</p>
                  <p className='line-clamp-2'>{overview}</p>
                  <p>⭐{parseFloat(rating.toFixed(1))}</p>
                  <Link onClick={() => resetValueSearch()} className='bg-red-500 px-2 rounded mt-2 hover:bg-red-800 duration-300 ease-in-out text-[6px] md:text-[8px] xl:text-xs' href={`/tv/${id}`}>Details</Link>
                </div>  
            </div>
      </div>
  )
}

export default CardTvShows