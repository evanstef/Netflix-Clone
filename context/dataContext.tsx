"use client"

import { cache, createContext, useContext, useEffect, useState } from "react"
import { searchMovies, searchTvShows, AllMovie, AllTvShows } from "@/data/api"
import { dataWatchList } from "@/action/dataWatchList";
import useCurrentUser from "@/hooks/useCurrentUser";

interface IDataContext {
    searchMovies : (q : string) => void;
    searchTvShows : (q : string) => void;
    handleValueSearch : (e : any) => void;
    fetchData : () => void;
    valueSearch : string;
    resultMovies : any
    resultTvShows : any
    data : any
}

const DataContext = createContext<IDataContext>({} as IDataContext)

interface Props {
    children : React.ReactNode
}

const DataProvider = ({children} : Props) => {
    const [valueSearch, setValueSearch] = useState("")
    const [resultMovies, setResultMovies] = useState<AllMovie[]>([])
    const [resultTvShows, setResultTvShows] = useState<AllTvShows[]>([])
    const [data, setData] = useState<any>()
    const user = useCurrentUser()

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.id) {
             const data : any = await dataWatchList(user.id);
             setData(data);
            }
          }
        fetchData()
    }, [user])

    const fetchData = async () => {
        if (user && user.id) {
         const data : any = await dataWatchList(user.id);
         setData(data);
        }
      }

    

    const searchAllMovies = async (q : string) => { 
        const movie = await searchMovies(q)
        setResultMovies(movie)
    }

    const searchAllTvShows = async (q : string) => {
        const tv = await searchTvShows(q)
        setResultTvShows(tv)
    }

    function handleValueSearch(e : React.ChangeEvent<HTMLInputElement>) {
        setValueSearch(e.target.value)
    }

    
    

    return (
        <DataContext.Provider value={{fetchData, searchMovies : searchAllMovies, searchTvShows : searchAllTvShows, handleValueSearch, resultMovies, resultTvShows, valueSearch, data}}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);

export default DataProvider;

