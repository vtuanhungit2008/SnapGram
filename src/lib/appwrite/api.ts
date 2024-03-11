import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, databases } from "./config";
import {  ID } from "appwrite";

export async function createUserAccount(user:INewUser){

    try {
        const newAccount = await account.create(
          ID.unique(),
          user.email,
          user.password,
          user.name
        )

        if(!newAccount) throw Error;
        const avatarUrl = avatar.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountId :newAccount.$id,
            email:newAccount.email,
            name:newAccount.name,
            username:newAccount.name,
            imageUrl:avatarUrl,
        });
        return newUser;
        
    } catch (error) {
        return error;
    }

}
export async function saveUserToDB(user:{
    accountId: string,
    email:string,
    name:string,
    imageUrl:URL,
    username:string,

}){
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databasesId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,

        );
        return newUser;
    } catch (error) {
        console.log(error);
    }

}