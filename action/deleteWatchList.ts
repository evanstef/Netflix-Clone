"use server"

import { getUserById, MovieWatchList } from "@/app/data/data"
import { db } from "@/app/utils/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const deleteWatchList = async (id : number, userId : any) => {

    const existingUser = await getUserById(userId)  

    if (!existingUser) {
        console.log("Pengguna tidak ditemukan");
        return;
    }

    const newData : any = existingUser.watchList.filter((item: any) => item.id !== id)

    try {
        // Menghapus film dari watchlist
        await db.user.update({
            where : {   
                id : userId
            },
            data : {
                watchList : newData
            }
        }) 
        console.log("Film di hapus dari watchlist");
        revalidatePath("/my-list")
        console.log("Film di revalidasi");
        
    } catch (error) {
        console.log(error); 
    }
}