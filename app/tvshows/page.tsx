"use client"

import React, { useEffect, useState } from 'react'
import Wrapper from '../_component/Wrapper'
import {AllTvShows} from '@/data/api'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import LoadingUi from '../_component/LoadingUi'
import BackgroundTv from '../_component/BackgroundTv'
import PopularCardTvShows from '../_component/PopularCardTvShows'
import CardTvShows from '../_component/CardTvShows'

const url = process.env.NEXT_PUBLIC_TMDB_URL
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

const TvShow = () => {
  const [topRated, setMoviesTopRated] = useState([])
  const [romance, setMoviesRomance] = useState([])
  const [drama, setMoviesDrama] = useState([])
  const [family, setMoviesFamily] = useState([])
  console.log(topRated);
  

  useEffect(() => {
    const fetchTopRated = async () => { 
      try {
        const response = await fetch(`${url}/tv/top_rated?page=1&api_key=${apiKey}`, {
          cache : "no-store"
        })
        const data = await response.json()
        setMoviesTopRated(data.results)
      } catch (error) {
        console.log(error);
      }
    }

    const fetchTvShowByGenres = async (genre : any, setMovies : any) => {
      try {
        const response = await fetch(`${url}/discover/tv?page=1&api_key=${apiKey}&with_genres=${genre}`, {
          cache : "no-store"
        })
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.log(error);
      }
    }
    fetchTopRated()
    fetchTvShowByGenres("10749", setMoviesRomance)
    fetchTvShowByGenres("18", setMoviesDrama)
    fetchTvShowByGenres("10751", setMoviesFamily)
  }, [])
  
  
  return (
    <>
      <BackgroundTv />
      <Wrapper>
      <div className='space-y-20'>
        {/* Popular Tv Shows */}
        <div>
          <h1 className="text-2xl font-bold mb-6">Popular In Tv Shows In Netflix</h1>
          <div className={`${topRated.length === 0 ? 'w-full' : 'grid grid-cols-6'}`}>
          {topRated.length === 0 ? <LoadingUi /> : 
          (
            topRated.sort((a : any, b : any) => b.vote_count - a.vote_count).slice(0,6).map((data : AllTvShows, i : any) => (
              <div key={i}>
                <PopularCardTvShows id={data.id} title={data.name} overview={data.overview} poster={data.poster_path} year={data.first_air_date} ratings={data.vote_average}/>
              </div>
            ))
          )}
          
          </div>
        </div>

        {/* Sad, Romance Scene*/}
        <div>
          <h1 className="text-xl font-bold">Sad Romance Scene</h1>
          {romance.length === 0 ? <LoadingUi /> : (
              <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {romance.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllTvShows, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardTvShows id={data.id} title={data.name} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.first_air_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
        </div>

        {/* Search For Justice */}
        <div>
          <h1 className="text-xl font-bold">Search For Justice</h1>
          {drama.length === 0 ? <LoadingUi /> : (
              <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {drama.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllTvShows, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardTvShows id={data.id} title={data.name} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.first_air_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
        </div>

        {/* Family */}
        <div>
          <h1 className="text-xl font-bold">About Family</h1>
          {family.length === 0 ? <LoadingUi /> : (
              <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {family.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllTvShows, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardTvShows id={data.id} title={data.name} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.first_air_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
        </div>

      </div>  
    </Wrapper>
    </>
    
  )
}

export default TvShow