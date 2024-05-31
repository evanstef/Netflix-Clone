
import React from 'react'
import { CircleLoader, RingLoader } from 'react-spinners'

const LoadingUiBesar = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <CircleLoader color="white" size={80} />
    </div>
  )
}

export default LoadingUiBesar