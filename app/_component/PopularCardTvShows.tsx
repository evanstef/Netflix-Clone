import Image from 'next/image'
import React from 'react'
import bg from '../../public/login__bg.jpg'
import Wrapper from './Wrapper'
import love from '../../public/icons8-love-24.png'
import { Heart } from 'lucide-react'
import Link from 'next/link'

type PopularProps = {
  id : number;
  poster : string;
  title : string;
  year : string;
  overview : string;
  ratings : number
}

const PopularCardTvShows = ({poster, title, year, overview, ratings, id} : PopularProps) => {
  const years = year.split("-")[0]


  return (
    <Link href={`/tv/${id}`}>
      <div className='relative w-52 h-72 hover:scale-110 duration-300'>
            <Image className='w-full h-full rounded-lg' width={224} height={288} src={`https://image.tmdb.org/t/p/w500${poster}`} alt=''/>  
            <div className='absolute opacity-0 hover:opacity-100 top-0 w-full h-full bg-black/50 p-3 duration-300'>
              <button className='flex justify-end w-full'>
                <Heart className='w-8 h-8' />
              </button>
                <div className='mt-28'>
                  <h1 className='line-clamp-1'>{title}</h1>
                  <p className='text-sm'>{years}</p>
                  <p className='line-clamp-2'>{overview}</p>
                  <p>⭐{parseFloat(ratings.toFixed(1))}</p>
                </div>  
            </div>
          </div>
    </Link>     
  )
}

export default PopularCardTvShows