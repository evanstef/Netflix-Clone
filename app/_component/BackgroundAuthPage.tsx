import Image from 'next/image'
import React from 'react'
import bg from '../../public/background_banner.jpg'

type AuthProps = {
    children: React.ReactNode
}

const Background = ({children} : AuthProps) => {
  return (
    <div className='relative mb-16'>
        <Image className='h-[600px]' src={bg} alt=''/>
        {children}
    </div>
  )
}

export default Background