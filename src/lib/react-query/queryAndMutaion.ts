import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    QueryClient,
    queryOptions,
} from "@tanstack/react-query"
import { DeleteSaved, LikedPost, SavedPost, createNewPost, createUserAccount, getCurrentUser, getRecentPosts,  signInUserAccount, signOutAccount } from "../appwrite/api"
import { INewUser } from "@/types"
import { QUERY_KEYS } from "./queryKey"

export const useCreateUserAccountMutation = ()=>{
    return useMutation({
        mutationFn:(user:INewUser)=> createUserAccount(user)
    })
}

export const useSignInUserAccountMutation = ()=>{
    return useMutation({
        mutationFn:(user:{
            email: string;
            password: string;
        })=> signInUserAccount(user)
    })
}
export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount,
    });
  };
export const useCreateNewPost = () => {
    return useMutation({
      mutationFn: createNewPost,
    });
  };

export const useGetRecentPosts = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    });
  };

  export const useLikePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn:({postId,likeArray}:{postId:string;likeArray:string[]}) => LikedPost(postId,likeArray),
      onSuccess:(data)=>{
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_RECENT_POSTS,]
        })
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_POST_BY_ID,data?.$id]
        })
      
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_POSTS,]
        })
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_CURRENT_USER,data?.$id]
        })
      }
    });
  };
  export const useSavedPost = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn:({postId,userId}:{postId:string;userId:string}) => SavedPost(postId,userId),
      onSuccess:(data)=>{
       
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_RECENT_POSTS,]
        })
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_POSTS,]
        })
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_CURRENT_USER,data?.$id]
        })
      }
    });
  };
  export const useDeleteSaved = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn:({savedId}:{savedId:string}) => DeleteSaved(savedId),
      onSuccess:(data)=>{
       
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_RECENT_POSTS,]
        })
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_POSTS,]
        })
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_CURRENT_USER,data?.$id]
        })
      }
    });
  }; 
  export const useGetCurrentUser = () => {
    return useQuery({
      queryKey:[QUERY_KEYS.GET_CURRENT_USER],
      queryFn:getCurrentUser,
    })
 
  }; 