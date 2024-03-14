import { getAllData } from '@/lib/appwrite/api'
import React from 'react'

const Home = () => {
  return (
    <div>
      <button onClick={()=>getAllData}>Click</button>

    </div>
  )
}

export default Home
