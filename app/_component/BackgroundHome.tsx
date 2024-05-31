"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AllMovie } from "@/data/api";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Navigation,Autoplay} from 'swiper/modules';
import { usePathname } from 'next/navigation';
import Background from './Background';
import Image from 'next/image';
import LoadingUi from './LoadingUi';
import LoadingUiBesar from './LoadingUiBesar';

const url = process.env.NEXT_PUBLIC_TMDB_URL
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

const BackgroundHome = () => {
  const [movies, setMovies] = useState([])
  const pathname = usePathname()
  const swiper = useRef(null)
  const authRouter = ["/login", "/signup", "/error","/my-list", "/movies", "/tvshows", "/^\/detail\/\d+$/"]

  const isDisplay = authRouter.includes(pathname)

  useEffect(() => {
    const fetchMoviesUpcoming = async () => {
      try {
        const response = await fetch(`${url}/movie/upcoming?page=1&api_key=${apiKey}`)
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMoviesUpcoming()
  }, [])

  return (
    <>
    {movies.length === 0 ? (
        <LoadingUiBesar />
      ) : (
      <>
        <Swiper
        spaceBetween={10}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {movies.sort((a : any , b : any) => b.vote_count - a.vote_count).map((movie : AllMovie, i : any) => (
          <SwiperSlide key={i}>
            <Background title={movie.title} overview={movie.overview} background={movie.backdrop_path} id={movie.id} ratings={movie.vote_average} year={movie.release_date} />
          </SwiperSlide>
        ))}
      </Swiper>
      </>
    )}
    </>  
  )
}

export default BackgroundHome