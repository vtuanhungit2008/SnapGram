import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, databases } from "./config";
import {  ID, Query } from "appwrite";
import { Navigate } from "react-router-dom";

export async function updatePassword() {
    try {
        const newPassword = account.updatePassword("00000000");
        return newPassword;
    } catch (error) {
        console.log(error);
    }
}
export async function deleteAllUser() {
    const promise = databases.deleteDocument('65e809ce25c1e3e37094', '65e80c67706e34d62e1e','65f33f3af3cb9f6700a5');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
    
}
export async function getUserById() {
    const promise = databases.getDocument('65e809ce25c1e3e37094','65e80c67706e34d62e1e','65f33f3af3cb9f6700a5');
    

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });
}
export async function getAllData() {
    const promise = databases.listDocuments('65e809ce25c1e3e37094','65e80c67706e34d62e1e');
    

    promise.then(function (response) {
        
        console.log(response.documents); // Success
    }, function (error) {
        console.log(error); // Failure
    });
}
export async function updateEmail(user:INewUser) {
    const promise = account.updateEmail(user.email, '00000000');

    promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
}
export async function getListUser() {

    
    try {
        const promise = account.listIdentities();
        return promise;
    } catch (error) {
        console.log(error);
    }

}
export async function createUserAccount(user:INewUser){

    try {
        console.log("password",user.password);//van lay dc tu form

        const newAccount = await account.create(
          ID.unique(),
          
          user.email,
        user.password,
          user.name,
        )
       
        console.log("password",newAccount.password);

        //phan nay chua lay dc password tu form

        console.log("hi",newAccount);

        if(!newAccount) throw Error;
        const avatarUrl = avatar.getInitials(user.name);
        const password = user.password; // fix password kh co tren auth
        const newUser = await saveUserToDB({
            accountId :newAccount.$id,
            password:password,
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
    password : string,


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
export async function signInUserAccount(user:{ email:string;password:string;}) {
    try {
        const session = await account.createEmailSession(user.email,user.password);
        
        return session;
    } catch (error) {
        console.log(error);
    }
}
export async function getCurrentUser() {

try {
    
    const currentAccount = await account.get();
    
    if(!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
        appwriteConfig.databasesId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId',currentAccount.$id)]
    )
    if (!currentUser) throw Error;
   
    return currentUser.documents[0];
} catch (error) {
  
    console.log(error);
    return null;
}
}
export async function signOutAccount() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      console.log(error);
    }
  }