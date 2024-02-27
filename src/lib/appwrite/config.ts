import { Client, Account, Databases, Avatars, Storage } from "appwrite";



export const appwriteConfig = {
    projectId : import.meta.env.VITE_APP_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APP_APPWRITE_URL,
    databaseId: import.meta.VITE_APP_APPWRITE_DATABASE_ID,
    storageId: import.meta.VITE_APP_APPWRITE_BUCKET_ID,
    userCollectionId: import.meta.VITE_APP_APPWRITE_USERS_COLLECTION_ID,
    postCollectionId : import.meta.VITE_APP_APPWRITE_POSTS_COLLECTION_ID,
    savesCollectionId : import.meta.VITE_APP_APPWRITE_SAVES_COLLECTION_ID,
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)


export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);