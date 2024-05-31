import React from 'react'
import { CircleLoader, PacmanLoader } from 'react-spinners'

const loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <CircleLoader size={80} color='white'/>
    </div>
  )
}

export default loading