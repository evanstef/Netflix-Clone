import { db } from "../utils/db"

export interface MovieWatchList { 
    id : number
    title : string
    overview : string
    poster_path : string
    release_date : string
    vote_average : number
    type : string
    created_at : Date
}

export const getUserByEmail = async (email : string) => {
    try {
        const existingUser = await db.user.findUnique({
            where : {email}
        })
        return existingUser
    } catch (error) {
        return null
    }
}

export const getUserById = async (id : string) => {
    try {
        const existingUser = await db.user.findUnique({
            where : {id}
        })
        return existingUser
    } catch (error) {
        console.log(error);
    }
}


