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

type Props = {
  title : string
  overview : string
  background : string
  id? : number
  type? : string
  ratings : number
  year : string
}

const Background = ({title, overview, background, id, type, ratings, year} : Props) => {
  const years = year.split("-")[0]
  return (
    <div className='relative mb-16'>
        <Image loading='lazy' className='h-[800px]' width={1920} height={1080} src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${background}`} alt=''/>
        <div className='absolute w-full h-full flex items-center top-0 bg-black/50'>
          <Wrapper>
              <div className='w-1/2'>
                <h1 className='text-6xl mb-3'>{title}</h1>
                <div className='flex gap-10 mb-4'>
                  <p>{years}</p>
                  <p>⭐{parseFloat(ratings.toFixed(1))}</p>
                </div>
                <p className='mb-4'>{overview}</p>
                  <div className='flex gap-3'>
                    <Link className='flex items-center gap-5 bg-slate-50 border py-1 px-6 rounded-lg text-black hover:invert duration-300' href={'/'}>
                      <Image className='w-8 h-8' src={play} alt=''/>
                      <p>Play</p>
                    </Link>
                    <button className='flex gap-5 items-center bg-slate-50 border text-black py-1 px-6 rounded-lg hover:invert duration-300'>
                      <Heart className='w-8 h-8'/>
                      <p>Add To List</p> 
                    </button>
                  </div>
              </div>
          </Wrapper>
        </div>
    </div>
    
  )
}

export default Background