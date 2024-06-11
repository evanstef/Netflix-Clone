import { NextApiRequest, NextApiResponse } from "next";
import { dataWatchList } from "@/action/dataWatchList";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === "GET") { 
            const session = await getSession({})

            if(!session) {
                res.status(401).json({message : "Unauthorized"})
                return
            }

            const data = await dataWatchList(session.user?.id)
            return data
        }
    } catch (error) {
        return null
    }
}