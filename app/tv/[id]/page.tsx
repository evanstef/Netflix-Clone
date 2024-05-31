import Wrapper from '@/app/_component/Wrapper'
import { getDetailList, getDetailTv } from '@/data/api'
import Image from 'next/image'
import React from 'react'

type ParamsProps = {
    params: {
        id: number
    }
}

type DataProps = {
    id: number
    name : string
    overview: string
    backdrop_path: string
    poster_path: string
    first_air_date: string
    title: string
    budget : number
    production_companies : Array<any>
    genres : Array<string | number>
    number_of_episodes : number
    number_of_seasons : number
    vote_average: number
    vote_count: number
    status: string
    created_by : Array<any>
}

const page = async ({params} : ParamsProps) => {
  const details : DataProps = await getDetailTv(params.id.toString())
  

  return (
    <Wrapper>
      <div className='flex flex-col items-center w-full border-b-2 border-white pb-9 mb-9'>
        <h1 className='text-5xl font-bold mb-6'>{details.name}</h1>
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
          <p className='text-xl'>Seasons : {details.number_of_seasons}</p>
          <p className='text-xl'>Episodes : {details.number_of_episodes}</p>
          <p className='text-xl'>Status : {details.status}</p>
          <p className='text-xl'>Release Date : {details.first_air_date}</p>
          <p className='text-xl'>Ratings : ⭐{parseFloat(details.vote_average.toFixed(1))}</p>

          <div className='flex flex-col items-center w-full'>
            <h1 className='text-2xl font-bold mb-5'>Created By</h1>
            <div className='w-full flex flex-wrap justify-center gap-24'>
                {details.created_by.length === 0 ? <p className='text-xl font-bold'>Not Found</p>: 
                details.created_by.map((item : any, i) => 
                    <div className='flex flex-col items-center' key={i}>
                        <Image className='w-32 h-32 rounded-full' width={244} height={288} src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt='Not Found'/>
                        <p>{item.name}</p>
                    </div>
                    )
                } 
            </div>
          </div>
          
          <div className='flex flex-col items-center w-full mt-5'>
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