

import { useGetPostById } from "@/lib/react-query/queryAndMutaion";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";



const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);
  
  

///isLoading nhằm để đợi hàm call api nếu kh có hàm này thì sẽ lỗi undefine
  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

     
      </div>
    </div>
  );
};

export default EditPost;