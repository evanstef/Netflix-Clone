"use client"

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import useCurrentUser from '@/hooks/useCurrentUser'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ExitIcon } from '@radix-ui/react-icons'
import { signOut } from 'next-auth/react'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { LogoutButton } from './LogoutButton'
import defaultUser from '../../public/avatar.png'
import Image from 'next/image'

const UserInfo = () => {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar className='w-8 h-8 md:w-12 md:h-12 rounded-sm'>
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>
                    <Image className='rounded-sm w-full h-full' src={defaultUser} alt='' />
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
                <DropdownMenuItem className='bg-white text-black p-2 md:p-4 rounded-lg mt-4 mr-2 md:mr-4 outline-none'>
                        <div className='text-xs md:text-base'>
                            <p>{user?.name}</p>
                            <p className='border-b pb-2 border-black'>{user?.email}</p>
                            <div onClick={() => signOut()} className='flex items-center gap-2 pt-2 cursor-pointer hover:text-red-600 duration-300'>
                              <ExitIcon />
                              <p>LogOut</p>   
                            </div>
                        </div>
            </DropdownMenuItem>      
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserInfo
