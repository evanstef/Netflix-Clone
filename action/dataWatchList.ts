"use server"

import { db } from "@/app/utils/db";
import { getDetailList } from "@/data/api";
import { getUserById, MovieWatchList } from "@/app/data/data";
import { cache } from "react";


export const dataWatchList = async (userId : any) => {
    const existingUser = await getUserById(userId)

    if (!existingUser) {
        return {error : "Pengguna tidak ditemukan"};
    }

    return existingUser.watchList
}