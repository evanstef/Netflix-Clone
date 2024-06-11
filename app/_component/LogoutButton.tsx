"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

interface LoginButtonProps {
    children : React.ReactNode,
}

export const LogoutButton = ({children} : LoginButtonProps) => {


    return (
        <span onClick={() => signOut()} className="cursor-pointer">
            {children}
        </span>
    )
}