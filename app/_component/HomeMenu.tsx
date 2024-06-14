"use client"

import React, { useEffect, useState } from 'react'
import BackgroundHome from './BackgroundHome'
import Wrapper from './Wrapper'
import { AllMovie, AllTvShows } from "@/data/api";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination, Navigation, Mousewheel, Lazy} from 'swiper/modules';
import { useData } from '@/context/dataContext'
import useCurrentUser from '@/hooks/useCurrentUser'
import { dataWatchList } from '@/action/dataWatchList'
import PopularCardMovies from './PopularCardMovies';
import PopularCardTvShows from './PopularCardTvShows';
import LoadingUi from './LoadingUi';
import CardMovies from './CardMovies';

const url = process.env.NEXT_PUBLIC_TMDB_URL
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY


const HomeMenu = () => {
    const [popular, setPopular] = useState([])
  const [fightAndCrimeMovies, setMoviesFightAndCrime] = useState([])
  const [romanceAndDramaMovies, setMoviesRomanceAndDrama] = useState([])
  const [horrorAndThrillerMovies, setMoviesHorrorAndThriller] = useState([])
  const [cartoonMovies, setMoviesCartoonMovies] = useState([])
  const {resultMovies, resultTvShows, valueSearch} = useData()
  const [array, setData] = useState<any>([]);
  const user = useCurrentUser()
  
  
  // fetch all movie
  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const data = await dataWatchList(user.id);
        setData(data);
      }
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(`${url}/movie/popular?page=1&api_key=${apiKey}`, {
          cache : "no-store"
        })
        const data = await response.json()
        setPopular(data.results)
      } catch (error) {
        console.log(error);
      }
    }

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
    fetchData()
    fetchMovies()
    fetchMoviesByGenres([28,80], setMoviesFightAndCrime)
    fetchMoviesByGenres([10749], setMoviesRomanceAndDrama)
    fetchMoviesByGenres([27,53,9648], setMoviesHorrorAndThriller)
    fetchMoviesByGenres([16], setMoviesCartoonMovies)
  }, [user])
  
  return (
    <>
    {valueSearch.length >= 3 ? 
    <Wrapper>
      <div className="space-y-20">
        <h1 className="text-2xl font-bold">All Search Result <span className="text-red-500">{valueSearch}</span></h1>
        {/* AllSearchResultMovies */}
        <div>
        <h1 className="text-2xl font-bold mb-6">Movies</h1>
        <div className={`${resultMovies.length === 0 ? 'w-full' : 'grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-10'}`}>
        {resultMovies.length === 0 ? <h1 className="text-3xl font-bold text-center">No Result</h1> : resultMovies.sort((a : any, b : any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                <div key={i}>
                  <PopularCardMovies data={array} id={data.id} title={data.title} overview={data.overview} poster={data.poster_path} year={data.release_date} ratings={data.vote_average}/>
                </div>
              ))}
        </div>
        {/* AllSearchResultTv */}
        <div>
          <h1 className="text-2xl font-bold mt-16 mb-6">Tv Shows</h1>
          <div className={`${resultTvShows.length === 0 ? 'w-full' : 'grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-10'}`}>
              {resultTvShows.length === 0 ? <h1 className="text-3xl font-bold text-center">No Result</h1> : resultTvShows.sort((a : any, b : any) => b.vote_count - a.vote_count).map((data : AllTvShows, i : any) => (
                <div key={i}>
                  <PopularCardTvShows data={array} id={data.id} title={data.name} overview={data.overview} poster={data.poster_path} year={data.first_air_date} ratings={data.vote_average}/>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
    </Wrapper>
     : 
    <>
      <BackgroundHome data={array} />
      <Wrapper>
        <div className="space-y-20">
          {/* Popular Card */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Popular In Netflix</h1>
            <div className={`${popular.length === 0 ? 'w-full' : 'grid grid-cols-2 md:grid-cols-4 gap-5 xl:grid-cols-6'}`}>
              {popular.length === 0 ? <LoadingUi /> : popular.sort((a : any, b : any) => b.vote_count - a.vote_count).slice(0,6).map((data : AllMovie, i : any) => (
                <div key={i}>
                  <PopularCardMovies data={array} id={data.id} title={data.title} overview={data.overview} poster={data.poster_path} year={data.release_date} ratings={data.vote_average}/>
                </div>
              ))}
              
            </div> 
          </div>
          
          {/* Action Movies */}
          <div>
            <h1 className="text-xl font-bold">Fighting And Crimes Scene</h1>
            {fightAndCrimeMovies.length === 0 ? <LoadingUi /> : ( 
                <Swiper 
                freeMode={true}
                mousewheel={true}
                pagination={{clickable: true, el : '.swiper-pagination' }} 
                modules={[Pagination, Navigation, Mousewheel, FreeMode]}
                breakpoints={{
                  // when window width is >= 0px
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 5
                  }, 
                  // when window width is >= 1280px
                  1280 : {
                    slidesPerView: 5,
                    spaceBetween: 10
                  }
                }}
                >
                  {fightAndCrimeMovies.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                    <SwiperSlide className="p-5 md:p-10" key={i}>
                      <CardMovies data={array} id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path} year={data.release_date}  />
                    </SwiperSlide>
                  ))}
                </Swiper>
            )}
          </div>

          {/* Romance & Drama */}
          <div>
            <h1 className="text-xl font-bold">Love Story About Relationship</h1>
            {romanceAndDramaMovies.length === 0 ? <LoadingUi /> : ( 
                <Swiper 
                freeMode={true}
                mousewheel={true}
                pagination={{clickable: true, el : '.swiper-pagination' }} 
                modules={[Pagination, Navigation, Mousewheel, FreeMode]}
                breakpoints={{
                  // when window width is >= 0px
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 5
                  }, 
                  // when window width is >= 1280px
                  1280 : {
                    slidesPerView: 5,
                    spaceBetween: 10
                  }
                }}
                >
                  {romanceAndDramaMovies.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                    <SwiperSlide className="p-5 md:p-10" key={i}>
                      <CardMovies data={array} id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path} year={data.release_date}  />
                    </SwiperSlide>
                  ))}
                </Swiper>
            )}
          </div>

          {/* Horror Movies */}
          <div>
            <h1 className="text-xl font-bold mb-6">Make You Night Scary</h1>
            {horrorAndThrillerMovies.length === 0 ? <LoadingUi /> : ( 
                <Swiper 
                freeMode={true}
                mousewheel={true}
                pagination={{clickable: true, el : '.swiper-pagination' }} 
                modules={[Pagination, Navigation, Mousewheel, FreeMode]}
                breakpoints={{
                   // when window width is >= 0px
                   0: {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 5
                  }, 
                  // when window width is >= 1280px
                  1280 : {
                    slidesPerView: 5,
                    spaceBetween: 10
                  }
                }}
                >
                  {horrorAndThrillerMovies.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                    <SwiperSlide className="p-5 md:p-10" key={i}>
                      <CardMovies data={array} id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path} year={data.release_date}  />
                    </SwiperSlide>
                  ))}
                </Swiper>
            )}
          </div>

          {/* Back To Childhood */}
          <div>
            <h1 className="text-xl font-bold mb-6">Back To Childhood</h1>
            {cartoonMovies.length === 0 ? <LoadingUi /> : ( 
                <Swiper  
                freeMode={true}
                mousewheel={true}
                pagination={{clickable: true, el : '.swiper-pagination' }} 
                modules={[Pagination, Navigation, Mousewheel, FreeMode]}
                breakpoints={{
                   // when window width is >= 0px
                   0: {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 5
                  }, 
                  // when window width is >= 1280px
                  1280 : {
                    slidesPerView: 5,
                    spaceBetween: 10
                  }
                }}
                >
                  {cartoonMovies.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                    <SwiperSlide className="p-5 md:p-10" key={i}>
                      <CardMovies data={array} id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path} year={data.release_date}  />
                    </SwiperSlide>
                  ))}
                </Swiper>
            )}
          </div>
        </div>
        
        {/* <h1>{JSON.stringify(user)}</h1>
        <button onClick={() => signOut()}>Logout</button> */}
      </Wrapper>
    </>
    }
    </>
  )
}

export default HomeMenu
