import { INewUser } from "@/types";
import { Account } from "appwrite";
import { ID } from "appwrite";
import { account } from "./config";

export async function createUserAccount(user:INewUser) {
    // console.log("User in api", user);
    
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
             );
        
        
             console.log("new Account", newAccount);

        return newAccount;
    } catch (error) {
        console.log("Appwrite createUser Error: ", error);
        
        
    }
    
}