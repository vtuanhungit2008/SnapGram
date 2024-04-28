import {
    useQuery,
    useMutation,
    useQueryClient,
  
   
    useInfiniteQuery,
} from "@tanstack/react-query"
import { DeleteSaved, LikedPost, SavedPost, createNewPost, createUserAccount, deletePost, getCurrentUser, getInfinitePosts, getRecentPosts,  getUserById,  getUsers,  handlePostById,  searchPosts,  signInUserAccount, signOutAccount, updatePost } from "../appwrite/api"
import { INewUser, IUpdatePost } from "@/types"
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
          queryKey: [QUERY_KEYS.GET_CURRENT_USER, data && data.$id ? data.$id : '']

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


    export const useGetPosts = () => {
      return useInfiniteQuery({
        queryKey:[QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn:getInfinitePosts,
        getNextPageParam:(lastPage )=>{
          if (lastPage && lastPage.documents.length === 0) {
            return null;
          }
          const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;
          return lastId;
        }
      });
    };

    export const useSearchPosts = (searchTerm: string) => {
      return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn: () => searchPosts(searchTerm),
        enabled: !!searchTerm,
      });
    };
    export const useGetUsers = () => {
          return useQuery({
            queryKey: [QUERY_KEYS.GET_USERS],
            queryFn: () => getUsers(),
          });
        };
        export const useGetUserById = (userId: string) => {
              return useQuery({
                queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
                queryFn: () => getUserById(userId),
                enabled: !!userId,
              });
            };
            