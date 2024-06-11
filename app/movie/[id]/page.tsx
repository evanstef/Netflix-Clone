import Wrapper from '@/app/_component/Wrapper'
import { getDetailList } from '@/data/api'
import Image from 'next/image'
import React from 'react'
import imageNotFound from '../../../public/390bed03e54f6440416f0568f61a82b563176996.jpg'
import posterNotFound from '../../../public/dskmqklmsmdq.jpg'
import imageNotFount from '../../../public/390bed03e54f6440416f0568f61a82b563176996.jpg'

type ParamsProps = {
    params: {
        id: number
    }
}

type DataProps = {
    id: number
    overview: string
    backdrop_path: string
    poster_path: string
    release_date: string
    title: string
    budget : number
    production_companies : Array<any>
    genres : Array<string | number>
    revenue : number
    vote_average: number
    vote_count: number
    runtime : number
    status: string
}

const page = async ({params} : ParamsProps) => {
  const details : DataProps = await getDetailList(params.id.toString())
    const minutes = details.runtime;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    

const formattedTime = `${hours} hours ${remainingMinutes} minutes`;

  return (
    <Wrapper>
      <div className='flex flex-col items-center w-full border-b-2 border-white pb-9 mb-9'>
        <h1 className='text-2xl md:text-5xl font-bold mb-6'>{details.title}</h1>
        <Image className='rounded-lg' width={1920} height={1080} src={details.backdrop_path === null ? imageNotFound : `https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${details.backdrop_path}`} alt=""/>
      </div>
      {/* Deskripsi */}
      <div className='flex flex-col md:flex-row justify-center items-center'>
        <div className='mb-4 md:mb-0 md:w-1/3'>
         <Image className='w-48 h-64 md:w-52 md:h-72 xl:w-64 xl:h-96 rounded-lg' width={500} height={800} src={details.poster_path === null ? posterNotFound : `https://image.tmdb.org/t/p/w500${details.poster_path}`}  alt=''/>   
        </div>
        <div className='text-base md:text-xl md:w-10/12'>
          <p className='mb-6'>{details.overview}</p>
          <p>Genres : {details.genres.map((item : any, i) => <span key={i}>{item.name}{i < details.genres.length - 1 && ", "}</span>)}</p>
          <p>Budget : {details.budget === 0 ? "Unknown" : "$ " + details.budget.toLocaleString("en-US")}</p>
          <p>Status : {details.status}</p>
          <p>Release Date : {details.release_date}</p>
          <p>Duration : {formattedTime}</p>
          <p>Revenue : {details.revenue === null ? "Unknown" : "$ " + details.revenue.toLocaleString("en-US")}</p>
          <p>Ratings : ⭐{parseFloat(details.vote_average.toFixed(1))}</p>
          <div className='flex flex-col items-center w-full mt-4 md:mt-0'>
            <h1 className='text-2xl font-bold mb-5'>Production</h1>
            <div className='w-full grid grid-cols-2 xl:grid-cols-3 gap-10'>
                {details.production_companies.map((item : any, i) => 
                <div className='flex flex-col items-center' key={i}>
                    <Image className='w-28 h-20 rounded-lg bg-white p-1' width={244} height={288} src={item.logo_path === null ? imageNotFount : `https://image.tmdb.org/t/p/w500${item.logo_path}`} alt='Not Found'/>
                    <p className='text-center'>{item.name}</p>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>

    </Wrapper>
  )
}

export default page