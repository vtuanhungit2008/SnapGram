import {
    useQuery,
    useMutation,
    useQueryClient,
  
    QueryClient,
    queryOptions,
} from "@tanstack/react-query"
import { DeleteSaved, LikedPost, SavedPost, createNewPost, createUserAccount, deletePost, getCurrentUser, getRecentPosts,  handlePostById,  signInUserAccount, signOutAccount, updatePost } from "../appwrite/api"
import { INewUser, IUpdatePost } from "@/types"
import { QUERY_KEYS } from "./queryKey"
import { string } from "zod"

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

  export const useGetPostById = (postId?: string) => {
        return useQuery({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
          queryFn: () => handlePostById(postId),
          enabled: !!postId,
        });
      };

     export const useUpdatePost = () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
          });
        },
      });
    };
    export const useDeletePost = () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ postId, imageId }: { postId?: string; imageId: string }) =>
          deletePost(postId, imageId),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
          });
        },
      });
    };