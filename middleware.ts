import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {prefixRoutes, authRouter, DEFAULT_REDIRECT_ROUTE}  from '@/router'
import { redirect } from "next/navigation";


const { auth } = NextAuth(authConfig)


export default auth ((req) => {
    const { nextUrl } = req
    const isLogin = !!req.auth

    const isApiRouter = nextUrl.pathname.startsWith(prefixRoutes)
    const isAuthRouter = authRouter.includes(nextUrl.pathname)

    if(isApiRouter) {
        return
    }

    if(isAuthRouter) {
        if(isLogin) {
            return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl))
        }
        return
    }

    if(!isLogin) {
        return Response.redirect(new URL("/login", nextUrl))
    }
    
})

export const config = {
    matcher: [ "/((?!.+\\.[\\w]+$|_next).*)","/(api|trpc)(.*)"],
}