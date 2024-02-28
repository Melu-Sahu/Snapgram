import { INewUser } from "@/types";
import { Account, Query } from "appwrite";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user:INewUser) {
    
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
             );

        
        if(!newAccount){
           throw new Error;
        }
        
        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarUrl,
            username: user.username,
        })

        

        return newUser;
    } catch (error) {
        console.log("Appwrite Exception :: createUserAccount Error: ", error);
        
        
    }
    
}


export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
  }) {
    
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
      );
 
      
      return newUser;
    } catch (error) {
      console.log("Appwrite Exception :: saveUserToDB", error);
    }
}


export async function signInAccount(user:{ email: string, password: string}) {
    
    try {
        const session = await account.createEmailSession(user.email, user.password);
        
        return session;
    } catch (error) {
        console.log("Appwrite Exception :: signInAccount ::", error);
        
    }
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
      
  
      return currentAccount;
    } catch (error) {
        console.log("Appwrite Exception :: getAccount :: ", error);
    }
  }
  
  
  // ============================== GET USER
  export async function getCurrentUser() {
    
    try {
      const currentAccount = await getAccount();
      
  
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
        console.log("Appwrite Exception :: getCurrentUser :: ", error);
      return null;
    }
}

export async function  signOutAccount() {
  try {
    const session = await account.deleteSession("current")
    return session;
  } catch (error) {
    console.log("Appwrite Exception :: signOutAccount", error);
    
  }
}