import { getAllData } from '@/lib/appwrite/api'
import { useGetRecentPosts } from '@/lib/react-query/queryAndMutaion';

import React, { useEffect } from 'react'
import { Models } from 'appwrite';
import PostCard from '@/components/shared/PostCard';
import Loader from '@/components/shared/Loader';



const Home = () => {


  const {data: posts,isPending:isLoadding,isError: isErrorPost} = useGetRecentPosts();



  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'></div>
        <h2  className="h3-bold md:h2-bold text-left w-full">Home feed</h2>
        {isLoadding && !posts?(
            <Loader/>
        ):(
          <ul className=' flex flex-col flex-1 gap-9 w-full'>
            {posts?.documents.map((post:Models.Document)=>(
              <li key={post.$id}  className="flex justify-center w-full">
                
                  <PostCard post = {post}/>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  )
    
};

export default Home
