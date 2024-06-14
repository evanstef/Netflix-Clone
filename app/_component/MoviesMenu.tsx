"use client"

import { dataWatchList } from '@/action/dataWatchList'
import useCurrentUser from '@/hooks/useCurrentUser'
import {AllMovie, AllTvShows} from '@/data/api'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper';
import LoadingUi from './LoadingUi';
import CardMovies from './CardMovies';

const url = process.env.NEXT_PUBLIC_TMDB_URL
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

const MoviesMenu = () => {
    const [action, setAction] = useState([])
  const [adventure, setAdventure] = useState([])
  const [comedy, setComedy] = useState([])
  const [drama, setDrama] = useState([])
  const [horrorThriller, setThriller] = useState([])
  const [animation, setAnimation] = useState([])
  const [history, setHistory] = useState([])
  const [array, setData] = useState<any>([]);
  const user = useCurrentUser()

  useEffect(() => { 
    const fetchData = async () => {
      const data = await dataWatchList(user?.id);
      setData(data)
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
    fetchMoviesByGenres([28], setAction)
    fetchMoviesByGenres([12], setAdventure)
    fetchMoviesByGenres([35], setComedy)
    fetchMoviesByGenres([18], setDrama)
    fetchMoviesByGenres([27,53], setThriller)
    fetchMoviesByGenres([16], setAnimation)
    fetchMoviesByGenres([36,10752], setHistory)
  }, [user])

  return (
    <Wrapper>
        <div className='space-y-12 md:space-y-20'>
        {/* Action Movies */}
        <div>
          <h1 className="text-xl font-bold">Action Movies</h1>
          {action.length === 0 ? <LoadingUi /> : (
            <Swiper 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              breakpoints={{
                0 : {
                  slidesPerView: 2,
                  spaceBetween: 10
                }, 
                768 : {
                  slidesPerView: 4,
                  spaceBetween: 10
              },
              1280 : {
                slidesPerView: 5,
                spaceBetween: 10
              }
              }}
              >
                {action.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-5 md:p-10" key={i}>
                    <CardMovies data={array} id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
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
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              breakpoints={{
                0 : {
                  slidesPerView: 2,
                  spaceBetween: 10
                }, 
                768 : {
                  slidesPerView: 4,
                  spaceBetween: 10
              },
              1280 : {
                slidesPerView: 5,
                spaceBetween: 10
              }
              }}
              >
                {adventure.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-5 md:p-10" key={i}>
                    <CardMovies data={array} id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
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
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              breakpoints={{
                0 : {
                  slidesPerView: 2,
                  spaceBetween: 10
                }, 
                768 : {
                  slidesPerView: 4,
                  spaceBetween: 10
              },
              1280 : {
                slidesPerView: 5,
                spaceBetween: 10
              }
              }}
              >
                {horrorThriller.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-5 md:p-10" key={i}>
                    <CardMovies data={array} id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
            </div>

        {/* Animation Movies */}
            <div>
                <h1 className="text-xl font-bold">Animation Movies</h1>
                {animation.length === 0 ? <LoadingUi /> : (
            <Swiper 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              breakpoints={{
                0 : {
                  slidesPerView: 2,
                  spaceBetween: 10
                }, 
                768 : {
                  slidesPerView: 4,
                  spaceBetween: 10
              },
              1280 : {
                slidesPerView: 5,
                spaceBetween: 10
              }
              }}
              >
                {animation.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-5 md:p-10" key={i}>
                    <CardMovies data={array} id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
            </div>

        {/* History Movies */}
            <div>
                <h1 className="text-xl font-bold">History Movies</h1>
                {history.length === 0 ? <LoadingUi /> : (
            <Swiper 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              breakpoints={{
                0 : {
                  slidesPerView: 2,
                  spaceBetween: 10
                }, 
                768 : {
                  slidesPerView: 4,
                  spaceBetween: 10
              },
              1280 : {
                slidesPerView: 5,
                spaceBetween: 10
              }
              }}
              >
                {history.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-5 md:p-10" key={i}>
                    <CardMovies data={array} id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
            </div>

        {/* Comedy Movies */}
            <div>
                <h1 className="text-xl font-bold">Comedy Movies</h1>
                {comedy.length === 0 ? <LoadingUi /> : (
            <Swiper 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              breakpoints={{
                0 : {
                  slidesPerView: 2,
                  spaceBetween: 10
                }, 
                768 : {
                    slidesPerView: 4,
                    spaceBetween: 10
                },
                1280 : {
                  slidesPerView: 5,
                  spaceBetween: 10
                }
              }}
              >
                {comedy.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-5 md:p-10" key={i}>
                    <CardMovies data={array} id={data.id}  title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path || data.poster_path} year={data.release_date}  />
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
            </div>
        </div>
    </Wrapper>
  )
}

export default MoviesMenu
