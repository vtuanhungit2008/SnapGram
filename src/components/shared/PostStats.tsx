
import { LikedPost, getRecentPosts } from "@/lib/appwrite/api";
import { Models } from "appwrite"
import React, { useContext, useEffect, useState } from "react";

import { checkIsLiked } from '@/lib/utils';
import { useDeleteSaved,  useGetCurrentUser,  useLikePost, useSavedPost } from "@/lib/react-query/queryAndMutaion";





type PostStatsProps = {
  post: Models.Document;
  userId: string;
}


const PostStats = ({post,userId}:PostStatsProps) => {
  
  
  const likeList = post.likes.map((user:Models.Document)=> user.$id);
   const {data:currentUser} = useGetCurrentUser();
 const [likes,setLike] = useState(likeList);
 const { mutate: likePost} = useLikePost();
 const { mutate: savePost} = useSavedPost();
 const { mutate: deletePost} = useDeleteSaved();
 const [saved,setSaved] = useState(false);
 const [cout,setCount] = useState(post.likes.length);
 const savedPostRecord = currentUser?.save.find((record:Models.Document)=> record.post.$id === post.$id);
useEffect(()=>{
setSaved(savedPostRecord);
},[currentUser])




 const handleLikePost =(e:React.MouseEvent)=>{
  e.stopPropagation();
  
   
  let newLikes = [...likes];
  const hasLikes = newLikes.includes(userId);
  if(hasLikes){
setCount(cout-1)
    newLikes = newLikes.filter((id)=>id!== userId)
  }
  else{
    newLikes.push(userId);
    setCount(cout+1);
  }
  setLike(newLikes);
  likePost({postId:post.$id,likeArray:newLikes})

  
 }
const handleSavedPost = (e:React.MouseEvent)=>{
  e.stopPropagation();
  if(savedPostRecord){
    setSaved(false);
    deletePost({savedId:savedPostRecord.$id});
  return;
  }
  else{
    savePost({postId:post.$id,userId});
    setSaved(true);
  }
  
 
   
}
  return (
   <div className="flex justify-between">
       <div className="flex gap-2 ">
           <img  src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer" /> 
          
          <p>{}
            {cout}</p>
          
      
       </div>
       <div className="flex gap-2 ">
       <img className="cursor-pointer" onClick={handleSavedPost} src={`${
        saved
              ? "/assets/icons/saved.svg"
              : "/assets/icons/save.svg"
          }`}
          ></img>
       </div>
       
      
   </div> 
  )
}

export default PostStats
