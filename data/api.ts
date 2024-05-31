import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
const url = process.env.NEXT_PUBLIC_TMDB_URL

export interface AllMovie {
    id : number
    backdrop_path : string;
    title : string;
    original_title : string;
    overview : string;
    release_date : string;
    vote_average : number;
    poster_path : string;
    vote_count : number;
}

export interface AllTvShows {
    id : number;
    backdrop_path : string;
    name : string;
    original_title : string;
    overview : string;
    first_air_date : string;
    vote_average : number;
    poster_path : string;
    vote_count : number;
}

export const getMovie = async (type : string) => {
    const movie = await axios.get(`${url}/movie/${type}?page=1&api_key=${apiKey}`)
    return movie.data.results
}

export const getMoviesByGenres = async (genre : any) => {
    const genresString = genre.join(",")
    const movie = await axios.get(`${url}/discover/movie?page=1&api_key=${apiKey}&with_genres=${genresString}`)
    return movie.data.results
}

export const getTvShows = async (type :string) => {
    const tv = await axios.get(`${url}/tv/${type}?page=1&api_key=${apiKey}`)
    return tv.data.results
}

export const getTvShowsByGenres = async (genre : string) => {
    const tv = await axios.get(`${url}/discover/tv?page=1&api_key=${apiKey}&with_genres=${genre}`)
    return tv.data.results
}

export const getDetailList = async (q : string) => {
    const detail = await axios.get(`${url}/movie/${q}?page=1&api_key=${apiKey}`)
    return detail.data 
}

export const getDetailTv = async (q : string) => {
    const detail = await axios.get(`${url}/tv/${q}?page=1&api_key=${apiKey}`)
    return detail.data 
}
