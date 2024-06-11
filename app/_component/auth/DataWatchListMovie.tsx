"use client"
import { dataWatchList } from "@/action/dataWatchList";
import { MovieWatchList } from "@/app/data/data";
import useCurrentUser from "@/hooks/useCurrentUser"
import { useEffect, useState } from "react";
import { any } from "zod";
import PopularCardMovies from "../PopularCardMovies";
import { useData } from "@/context/dataContext";
import { AllMovie } from "@/data/api";

interface Props {
  data : []
}

const DataWatchListMovie = ({ data } : Props ) => { 
  const user = useCurrentUser()
  
  const movie = data?.filter((item : MovieWatchList) => item.type === "movie")
  
  
  
  return (
    <div className="mb-32">
      <h1 className="text-2xl font-bold mb-6">Movies</h1>
      {movie?.length === 0 ? (
        <h1 className="text-3xl font-bold">Belum Ada Data Movie</h1>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-10">
        {movie?.sort((a : any, b : any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((item : AllMovie, i : any) => (
          <div  key={i}>
            <PopularCardMovies data={data} poster={item.poster_path} title={item.title} year={item.release_date} overview={item.overview} ratings={item.vote_average} id={item.id} />
          </div> 
        ))}
        </div>
      )}
        
    </div>
  )
}

export default DataWatchListMovie
