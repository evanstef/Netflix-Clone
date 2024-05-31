import React from 'react'

type WrapperProps = {
    children : React.ReactNode
    title? : string
}

const Wrapper = ({children, title} : WrapperProps) => {
  return (
    <div className='container mx-auto px-7 md:px-0'>
        <h1 className='text-xl md:text-4xl font-bold my-8'>{title}</h1>
        {children}
    </div>
  )
}

export default Wrapper