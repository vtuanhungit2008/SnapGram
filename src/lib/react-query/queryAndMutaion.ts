import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query"
import { createUserAccount, signInUserAccount, signOutAccount } from "../appwrite/api"
import { INewUser } from "@/types"

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