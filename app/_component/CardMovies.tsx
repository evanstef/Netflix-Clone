import React from 'react'
import bg from '../../public/login__bg.jpg'
import Image from 'next/image'
import love from '../../public/icons8-love-24.png'
import { Heart } from 'lucide-react'
import Link from 'next/link'

type CardProps = {
  title: string;
  overview: string;
  poster: string;
  rating: number;
  year: string;
  id?: number;
  type?: string;
}

const CardMovies = ({title,overview,poster,rating,year,id,type} : CardProps) => {
  const years = year.split("-")[0]
  return (

    <Link href={`/movie/${id}`}>
      <div className='relative w-60 h-36 hover:scale-[1.2] hover:z-10 duration-300'>
        <Image loading='lazy' className='w-60 h-36 rounded-lg' width={240} height={144} src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${poster}`} alt='' />
        <div className='absolute opacity-0 hover:opacity-100 top-0 w-full h-full bg-black/50 p-3 duration-300'>
              <button className='flex justify-end'>
                <Heart className='w-5 h-5' />
              </button>
                <div className='text-xs mt-6'>
                  <h1 className='line-clamp-1'>{title}</h1>
                  <p className='text-[10px]'>{years}</p>
                  <p className='line-clamp-2'>{overview}</p>
                  <p>⭐{parseFloat(rating.toFixed(1))}</p>
                </div>  
            </div>
      </div>
    </Link>
  )
}

export default CardMovies