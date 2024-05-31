"use client"

import Wrapper from "./_component/Wrapper";
import CardMovies from "./_component/CardMovies";
import { AllMovie } from "@/data/api";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination, Navigation, Mousewheel, Lazy} from 'swiper/modules';
import { useEffect, useState } from "react";
import LoadingUi from "./_component/LoadingUi";
import BackgroundHome from "./_component/BackgroundHome";
import PopularCardMovies from "./_component/PopularCardMovies";

const url = process.env.NEXT_PUBLIC_TMDB_URL
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

export default function Home () {
  const [popular, setPopular] = useState([])
  const [fightAndCrimeMovies, setMoviesFightAndCrime] = useState([])
  const [romanceAndDramaMovies, setMoviesRomanceAndDrama] = useState([])
  const [horrorAndThrillerMovies, setMoviesHorrorAndThriller] = useState([])
  const [cartoonMovies, setMoviesCartoonMovies] = useState([])

  
  // fetch all movie
  useEffect(() => {
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
    fetchMovies()
    fetchMoviesByGenres([28,80], setMoviesFightAndCrime)
    fetchMoviesByGenres([10749], setMoviesRomanceAndDrama)
    fetchMoviesByGenres([27,53,9648], setMoviesHorrorAndThriller)
    fetchMoviesByGenres([16], setMoviesCartoonMovies)

  }, [])
  // end fetching
  
  
  return (
    <>
    <BackgroundHome />
    <Wrapper>
      <div className="space-y-20">
        {/* Popular Card */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Popular In Netflix</h1>
          <div className={`${popular.length === 0 ? 'w-full' : 'grid grid-cols-6'}`}>
            {popular.length === 0 ? <LoadingUi /> : popular.sort((a : any, b : any) => b.vote_count - a.vote_count).slice(0,6).map((data : AllMovie, i : any) => (
              <div key={i}>
                <PopularCardMovies id={data.id} title={data.title} overview={data.overview} poster={data.poster_path} year={data.release_date} ratings={data.vote_average}/>
              </div>
            ))}
            
          </div> 
        </div>
        
        {/* Action Movies */}
        <div>
          <h1 className="text-xl font-bold">Fighting And Crimes Scene</h1>
          {fightAndCrimeMovies.length === 0 ? <LoadingUi /> : ( 
              <Swiper 
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {fightAndCrimeMovies.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path} year={data.release_date}  />
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
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {romanceAndDramaMovies.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path} year={data.release_date}  />
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
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {horrorAndThrillerMovies.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path} year={data.release_date}  />
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
              slidesPerView={6} 
              spaceBetween={10} 
              freeMode={true}
              mousewheel={true}
              pagination={{clickable: true, el : '.swiper-pagination' }} 
              modules={[Pagination, Navigation, Mousewheel, FreeMode]}
              >
                {cartoonMovies.sort((a : any, b:any) => b.vote_count - a.vote_count).map((data : AllMovie, i : any) => (
                  <SwiperSlide className="p-10" key={i}>
                    <CardMovies id={data.id} title={data.title} overview={data.overview} rating={data.vote_average} poster={data.backdrop_path} year={data.release_date}  />
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
    
   
  );
}
