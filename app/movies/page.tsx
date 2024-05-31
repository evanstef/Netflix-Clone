"use client"

import React, { useEffect, useState } from 'react'
import Wrapper from '../_component/Wrapper'
import CardMovies from '../_component/CardMovies'
import {AllMovie, AllTvShows} from '@/data/api'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import LoadingUi from '../_component/LoadingUi'

const url = process.env.NEXT_PUBLIC_TMDB_URL
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

const Movies = () => {
  const [action, setAction] = useState([])
  const [adventure, setAdventure] = useState([])
  const [comedy, setComedy] = useState([])
  const [drama, setDrama] = useState([])
  const [horrorThriller, setThriller] = useState([])
  const [animation, setAnimation] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => { 
    const fetchMoviesByGenres = async(genre : any, setMovies : any) => {
      try {
        const genresString = genre.join(",")
        const response = await fetch(`${url}/discover/movie?page=1&api_key=${apiKey}&with_genres=${genresString}`, {
          cache : "no-store"
        })
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.log(error);
      }
    }

    fetchMoviesByGenres([28], setAction)
    fetchMoviesByGenres([12], setAdventure)
    fetchMoviesByGenres([35], setComedy)
    fetchMoviesByGenres([18], setDrama)
    fetchMoviesByGenres([27,53], setThriller)
    fetchMoviesByGenres([16], setAnimation)
    fetchMoviesByGenres([36,10752], setHistory)
  }, [])

  return (
    <Wrapper>
        <div className='space-y-20'>
        {/* Action Movies */}
        <div>
          <h1 className="text-xl font-bold">Action Movies</h1>
          {action.length === 0 ? <LoadingUi /> : (
            <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {action.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
        </div>

        {/* Adventure Movies */}
        <div>
          <h1 className="text-xl font-bold">Adventure Movies</h1>
          {adventure.length === 0 ? <LoadingUi /> : (
            <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {adventure.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
        </div>

        {/* Horror Movies */}
            <div>
                <h1 className="text-xl font-bold">Horror Movies</h1>
                {horrorThriller.length === 0 ? <LoadingUi /> : (
            <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {horrorThriller.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
            </div>

        {/* Animation Movies */}
            <div>
                <h1 className="text-xl font-bold mb-6">Animation Movies</h1>
                {animation.length === 0 ? <LoadingUi /> : (
            <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {animation.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
            </div>

        {/* History Movies */}
            <div>
                <h1 className="text-xl font-bold mb-6">History Movies</h1>
                {history.length === 0 ? <LoadingUi /> : (
            <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {history.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
            </div>

        {/* Comedy Movies */}
            <div>
                <h1 className="text-xl font-bold mb-6">Comedy Movies</h1>
                {comedy.length === 0 ? <LoadingUi /> : (
            <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {comedy.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id}  title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
            </div>
        </div>
    </Wrapper>
  )
}

export default Movies