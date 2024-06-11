"use server";

import { db } from "@/app/utils/db";
import { getDetailList, getDetailTv } from "@/data/api";
import { getUserById, MovieWatchList } from "@/app/data/data";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Replace } from "lucide-react";
import { dataWatchList } from "./dataWatchList";
import { NextApiRequest } from "next";

export const addToWatchList = async (id : number, userId : any) => {
    
    // Mengambil detail film dari API TMDb
    const movie = await getDetailList(id.toString());
    
    // Membuat entri watchlist di database
    const { title, overview, poster_path, release_date, vote_average } = movie;


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
        title : title,
        overview : overview,
        poster_path : poster_path,
        release_date : release_date,
        vote_average : vote_average,
        type : "movie",
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