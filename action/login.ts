"use server"

import { getUserByEmail } from "@/app/data/data"
import { LoginSchema } from "@/app/schema"
import { DEFAULT_REDIRECT_ROUTE } from "@/router"
import { signIn } from "@/auth"
import * as z from "zod"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export const login = async (values : z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values)
    if (!validateFields.success) { 
       return { error : "Invalid Fields!"}
    }

    const { email, password } = validateFields.data
    const existingUser = await getUserByEmail(email)


    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error : "Email Is Not Exist" }
    }
    
    try {
        await signIn("credentials" , {
           email,
           password,
           redirect : true,
           redirectTo : DEFAULT_REDIRECT_ROUTE,
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid email or password!"}
                default:
                    return {error: "Something went wrong!"}
            }
        }
        throw error
    }
}