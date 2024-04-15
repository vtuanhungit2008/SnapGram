import{Client,Account,Databases ,Storage ,Avatars} from "appwrite"

export const appwriteConfig = {
    url : import.meta.env.VITE_APPWRITE_PROJECT_URL,
    projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databasesId:import.meta.env.VITE_APPWRITE_PROJECT_DATABASES,
    storageId:import.meta.env.VITE_APPWRITE_PROJECT_STORAGE,
    userCollectionId:import.meta.env.VITE_APPWRITE_PROJECT_USERS,
    postCollectionId:import.meta.env.VITE_APPWRITE_PROJECT_POSTS,
    savesCollectionId:import.meta.env.VITE_APPWRITE_PROJECT_SAVES,
}
export const client = new Client();
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);

export const databases = new Databases(client);

export const storage = new Storage(client);
export const avatar = new Avatars(client);