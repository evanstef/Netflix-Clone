import Image from 'next/image'
import React from 'react'
import bg from '../../../public/login__bg.jpg'

type AuthProps = {
    children: React.ReactNode
}

const AuthBackground = ({children} : AuthProps) => {
  return (
    <div className='relative'>
        <Image className='h-screen w-[2000px]' width={1920} height={1080} src={bg} alt=''/>
        {children}
    </div>
  )
}

export default AuthBackground