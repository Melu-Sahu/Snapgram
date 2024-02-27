import { INewUser } from "@/types";
import { Account } from "appwrite";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user:INewUser) {
    // console.log("User in api", user);
    
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
             );
        
        if(!newAccount){
           throw new Error
        }
        
        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarUrl,
            username: user.username,
        })

        
            //  console.log("new Account", newAccount);

        return newUser;
    } catch (error) {
        console.log("Appwrite Exception :: createUserAccount Error: ", error);
        
        
    }
    
}


export async function saveUserToDB(user:{
    accountId : string,
    email: string,
    name: string,
    imageUrl: string,
    username?: string
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )
        return newUser;
    } catch (error) {
        console.log("Appwrite Exception :: saveuserToDB :: Error", error);
    }
}