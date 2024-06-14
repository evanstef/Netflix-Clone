"use client"

import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import DataWatchListMovie from './auth/DataWatchListMovie'
import DataWatchListTv from './auth/DataWatchListTv'
import { dataWatchList } from '@/action/dataWatchList'
import useCurrentUser from '@/hooks/useCurrentUser'


const MyListMenu = () => {
    const [data, setData] = useState<any>([]);
  const user = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const data = await dataWatchList(user.id);
        setData(data);
      }
    }
    fetchData()
  }, [user])
  return (
    <Wrapper>
    {data === undefined || data?.length === 0 ? (
      <div className='flex justify-center items-center mt-72'>
        <h1 className='text-3xl font-bold text-center'>Belum Ada Data WatchList</h1>
      </div>
    ) : (
      <>
        <DataWatchListMovie data={data}/>
        <DataWatchListTv data={data} />
        <div className='h-24'></div>
      </>
    ) }
    
  </Wrapper>
  )
}

export default MyListMenu
