"use server"

import { getUserByEmail } from "@/app/data/data"
import { RegisterSchema } from "@/app/schema"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/app/utils/db"




export const registerr = async (values:z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values)
    if (!validateFields.success) { 
        return {error : "Invalid Fields!"}
    }

    const { username, email, password, confirmpassword } = validateFields.data
    const existingUser = await getUserByEmail(email)
    if(existingUser) {
        return {error : "Email Is Already In Use"}
    }

    if(password !== confirmpassword) {
        return {error : "Password Does Not Match"}
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        await db.user.create({
            data : {
                name : username,
                email,
                password : hashPassword
            }
        })
        return { success: "Created Account Successfully" };
      } catch (error) {
        throw error;
      }
}