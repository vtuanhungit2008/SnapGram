import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query"
import { createNewPost, createUserAccount, getRecentPosts, signInUserAccount, signOutAccount } from "../appwrite/api"
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