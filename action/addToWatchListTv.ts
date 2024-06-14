"use server";

import { db } from "@/app/utils/db";
import { AllMovie, AllTvShows, getDetailList, getDetailTv } from "@/data/api";
import { getUserById, MovieWatchList } from "@/app/data/data";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const addToWatchListTv = async (id : number, userId : any) => {

    // Mengambil detail film dari API TMDb
    const tv : AllTvShows = await getDetailTv(id.toString());
    
    // Membuat entri watchlist di database
    const { name, overview, poster_path, first_air_date, vote_average} = tv;


    const existingUser = await getUserById(userId)

    if (!existingUser) {
        console.log("Pengguna tidak ditemukan");
        return;
    }

    // Pengecekaran apakah film sudah ada di watchlist dengan user yang saat ini sedang login
    const isMovieInWatchList = existingUser.watchList.some((item: any) => item.id === id);
    if (isMovieInWatchList) {
        console.log("Film sudah ada di watchlist");
        return;
    }
        

    const data : any = 
        {
        id : id,
        title : name,
        overview : overview,
        poster_path : poster_path,
        release_date : first_air_date,
        vote_average : vote_average,
        type : "tv",
        created_at : new Date()
        }


    await db.user.update({
        where : {
            id : userId
        },
        data : {
            watchList : {
                push : data
            }
        }
    })
    redirect("/my-list")
}