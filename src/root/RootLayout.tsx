import { deleteAllUser, getAllData } from '@/lib/appwrite/api'
import React from 'react'

const RootLayout = () => {
  return (
    <div>
        <button onClick={deleteAllUser}>Click</button>
    </div>
  )
}

export default RootLayout
