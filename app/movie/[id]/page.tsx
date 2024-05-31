import Wrapper from '@/app/_component/Wrapper'
import { getDetailList } from '@/data/api'
import Image from 'next/image'
import React from 'react'

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
        <h1 className='text-5xl font-bold mb-6'>{details.title}</h1>
        <Image className='w-[1000px] rounded-lg h-[500px]' width={1920} height={1080} src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${details.backdrop_path}`} alt=""/>
      </div>
      {/* Deskripsi */}
      <div className='flex justify-center items-center'>
        <div className='w-1/3'>
         <Image className='w-64 h-96 rounded-lg' width={244} height={288} src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}  alt=''/>   
        </div>
        <div className='w-10/12'>
          <p className='text-xl mb-6'>{details.overview}</p>
          <p className='text-xl'>Genres : {details.genres.map((item : any, i) => <span key={i}>{item.name}{i < details.genres.length - 1 && ", "}</span>)}</p>
          <p className='text-xl'>Budget : {details.budget === 0 ? "Unknown" : "$ " + details.budget.toLocaleString("en-US")}</p>
          <p className='text-xl'>Status : {details.status}</p>
          <p className='text-xl'>Release Date : {details.release_date}</p>
          <p className='text-xl'>Duration : {formattedTime}</p>
          <p className='text-xl'>Revenue : {details.revenue === null ? "Unknown" : "$ " + details.revenue.toLocaleString("en-US")}</p>
          <p className='text-xl'>Ratings : ⭐{parseFloat(details.vote_average.toFixed(1))}</p>
          <div className='flex flex-col items-center w-full'>
            <h1 className='text-2xl font-bold mb-5'>Production</h1>
            <div className='w-full flex flex-wrap justify-center gap-24'>
                {details.production_companies.map((item : any, i) => 
                <div className='flex flex-col items-center' key={i}>
                    <Image className='w-28 h-20 rounded-lg bg-white p-2' width={244} height={288} src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} alt='Not Found'/>
                    <p>{item.name}</p>
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