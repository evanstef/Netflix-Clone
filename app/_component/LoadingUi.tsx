
import React from 'react'
import { CircleLoader, PropagateLoader, RingLoader } from 'react-spinners'

const LoadingUi = () => {
  return (
    <div className='w-full flex justify-center items-center'>
        <CircleLoader color="white" size={40} />
    </div>
  )
}

export default LoadingUi