import { useUserContext } from "@/context/AuthContext";
import { LikedPost } from "@/lib/appwrite/api";
import { Models } from "appwrite"
import { useContext, useState } from "react";

import { checkIsLiked } from '@/lib/utils';

type PostStatsProps = {
  post: Models.Document;
  userId: string;
}

const PostStats = ({post,userId}:PostStatsProps) => {
  
  const {user:currentUser} = useUserContext();
   console.log("User",currentUser)
 const likeList = post.likes.map((users:Models.Document) => users.$id);
 const [likes,setLike] = useState<string[]>(likeList);
 const checkIsLiked1 = checkIsLiked(likeList,userId)
 const handleLikePost = (e:React.MouseEvent)=>{
  e.stopPropagation();
  let newArrLike = [...likes];
  const hasLiked = newArrLike.includes(userId)
  if(hasLiked){
    newArrLike = newArrLike.filter((id)=>id!=userId);
  }
  else{
    newArrLike.push(userId);
  }

  setLike(newArrLike);
  LikedPost(post.$id,newArrLike);
  console.log("Liked")
 }
 console.log(likeList)
 

  console.log("check",checkIsLiked);
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
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer" />
          
          <p>{post.likes.length}</p>
         
      
       </div>
       <div className="flex gap-2 ">
          <img src="/assets/icons/save.svg" alt="" />
       </div>
      
   </div>
  )
}

export default PostStats
