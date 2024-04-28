import { INewPost, INewUser, INewUserSaveDB, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatar, databases, storage } from "./config";
import {  ID, Query } from "appwrite";




export async function deleteFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
  
      return { status: "ok" };
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
        //phan nay chua lay dc password tu form
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
export async function saveUserToDB(user:INewUserSaveDB){
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
  
        
    if(!currentAccount)  throw Error;
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
  export async function createNewPost(post : INewPost) {
    try {
        const upLoadFile =await upLoadImg(post.file[0]);
      
       if (!upLoadFile) throw Error;
        const imgUrl = getFilePreview(upLoadFile.$id);
        if (!imgUrl) {
          await deleteFile(upLoadFile.$id);
          throw Error;
        }
        const tags = post.tags?.replace(/ /g, "").split(",") || [];
        const newPost = await databases.createDocument(
            appwriteConfig.databasesId,
            appwriteConfig.postCollectionId,
           ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl :imgUrl,
                imageId: upLoadFile?.$id,
                location:post.location,
                tags: tags,
            }
        )
    
        if(!newPost) throw Error;

        return newPost;
       
    } catch (error) {
      console.log(error);
    }
  } 
  export async function upLoadImg( file:File) {
    try {
       const upLoadFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),    
        file
       )
       return upLoadFile;

      
    } catch (error) {
      console.log(error);
    }
  }
  export  function getFilePreview(fileId: string) {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      console.log(error);
    }
  }
  
export async function getRecentPosts(){
    try {
        const posts = await databases.listDocuments(
          appwriteConfig.databasesId,
          appwriteConfig.postCollectionId,
          [Query.orderDesc("$createdAt"), Query.limit(20)]
        );
    
        if (!posts) throw Error;
    
        return posts;
      } catch (error) {
        console.log(error);
      }
}

export async function LikedPost(postId:string,likeArr:string[]) {
    try {
        const upDatePost = await databases.updateDocument(
            appwriteConfig.databasesId,
            appwriteConfig.postCollectionId,
            postId,
            {
         likes: likeArr,
                
            }
        )
        return upDatePost;
    } catch (error) {
        console.log(error);
    }
}

export async function SavedPost(postId:string,userId:string) {
    try {
        const savePost = await databases.createDocument(
            appwriteConfig.databasesId,
           appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                post: postId,
                user: userId,
            }
            
        )
        return savePost;
    } catch (error) {
        console.log(error);
    }
}

export async function DeleteSaved(savedId:string) {
    try {
        const savePost = await databases.deleteDocument(
            appwriteConfig.databasesId,
            appwriteConfig.savesCollectionId,
           savedId,
        )
      
        
        return savePost;
    } catch (error) {
        console.log(error);
    }
}

export async function getSavedPost() {
    try {
        const saved = await databases.listDocuments(
            appwriteConfig.databasesId,
            appwriteConfig.savesCollectionId
            
        )
        console.log(saved.documents);
        
       return saved.documents;
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function handlePostById(postId:string) {
    if (!postId) throw Error;
    try {
        const data = await databases.getDocument(
            appwriteConfig.databasesId,
            appwriteConfig.postCollectionId,
            postId,
        )
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function updatePost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;
  
    try {
      let image = {
        imageUrl: post.imageUrl,
        imageId: post.imageId,
      };
  
      if (hasFileToUpdate) {
        // Upload new file to appwrite storage
        const uploadedFile = await upLoadImg(post.file[0]);
        if (!uploadedFile) throw Error;
  
        // Get new file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
          await deleteFile(uploadedFile.$id);
          throw Error;
        }
  
        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      //  Update post
      const updatedPost = await databases.updateDocument(
        appwriteConfig.databasesId,
        appwriteConfig.postCollectionId,
        post.postId,
        {
          caption: post.caption,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
          location: post.location,
          tags: tags,
        }
      );
  
      // Failed to update
      if (!updatedPost) {
        // Delete new file that has been recently uploaded
        if (hasFileToUpdate) {
          await deleteFile(image.imageId);
        }
  
        // If no new file uploaded, just throw error
        throw Error;
      }
  
      // Safely delete old file after successful update
      if (hasFileToUpdate) {
        await deleteFile(post.imageId);
      }
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }

  export async function deletePost(postId?: string, imageId?: string) {
    if (!postId || !imageId) return;
  
    try {
      const statusCode = await databases.deleteDocument(
        appwriteConfig.databasesId,
        appwriteConfig.postCollectionId,
        postId
      );
  
      if (!statusCode) throw Error;
  
      await deleteFile(imageId);
  
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
    }
  }


  export async function searchPosts(searchTerm: string) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databasesId,
        appwriteConfig.postCollectionId,
        [Query.search("caption", searchTerm)]
      );
      
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
    const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];
  
    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }
  
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databasesId,
        appwriteConfig.postCollectionId,
        queries
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getUsers() {
    try {
      const users = await databases.listDocuments(
        appwriteConfig.databasesId,
        appwriteConfig.userCollectionId,
      
      );
      console.log(users);
      
  
      if (!users) throw Error;
  
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  export async function getUserById(userId: string) {
    try {
      const user = await databases.getDocument(
        appwriteConfig.databasesId,
        appwriteConfig.userCollectionId,
        userId
      );
  
      if (!user) throw Error;
  
      return user;
    } catch (error) {
      console.log(error);
    }
  }