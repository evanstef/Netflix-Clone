import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./app/schema";
import { getUserByEmail } from "./app/data/data";
import bcrypt from 'bcryptjs'
import { redirect } from "next/navigation";




export default {
    pages : {
        signIn : "/login",
        error : "/error"
    },
    providers: [
        GitHub({
            clientId : process.env.GITHUB_CLIENT_ID,
            clientSecret : process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);
                if (validateFields.success) {
                    const { email, password } = validateFields.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) return user
                    }
                return null
            },
        }),
    ],
} satisfies NextAuthConfig