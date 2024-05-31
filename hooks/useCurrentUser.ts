"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

const useCurrentUser = () => {
  const session = useSession()
  return session.data?.user
}

export default useCurrentUser