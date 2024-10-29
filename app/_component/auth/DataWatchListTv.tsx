import { dataWatchList } from '@/action/dataWatchList';
import { MovieWatchList } from '@/app/data/data';
import useCurrentUser from '@/hooks/useCurrentUser';
import React, { useEffect, useState } from 'react'
import PopularCardTvShows from '../PopularCardTvShows';
import { useData } from '@/context/dataContext';
import { AllMovie, AllTvShows } from '@/data/api';
import { array } from 'zod';

interface Props {
  data : []
}



const DataWatchListTv = ({data} : Props) => {

    const user = useCurrentUser()
  


    const tv  = data?.filter((item : MovieWatchList) => item.type === "tv")

  return (
    <div>
        <h1 className='text-3xl font-bold mb-6'>Tv Shows</h1>
        {tv?.length === 0 ? (
            <h1 className='text-2xl font-bold'>Belum Ada Data Tv Shows</h1>
        ) : (
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-10'>
            {tv?.sort((a : any, b : any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((item : AllMovie, i : any) => (
                    <div key={i}>
                      <PopularCardTvShows data={data} poster={item.poster_path} title={item.title} year={item.release_date} overview={item.overview} ratings={item.vote_average} id={item.id} />
                    </div> 
                    ))}
            </div> 
        )}   
    </div>
  )
}

export default DataWatchListTv
