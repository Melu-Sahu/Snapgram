import { INewPost, INewUser } from "@/types";
import { Query } from "appwrite";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export async function createUserAccount(user: INewUser) {

  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );


    if (!newAccount) {
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


export async function signInAccount(user: { email: string, password: string }) {

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

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current")
    return session;
  } catch (error) {
    console.log("Appwrite Exception :: signOutAccount", error);

  }
}



// Create Post

export async function createNewPost(post: INewPost) {

  try {
    const uploadedfile = await uploadFile(post.file[0]);


    if (!uploadedfile) {
      throw new Error;
    }

    const fileUrl = await getFilePreview(uploadedfile.$id);

    if (!fileUrl) {
      throw new Error;
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedfile.$id,
        location: post.location,
        tags: tags,
      }
    )

    if (!newPost) {
      await deleteFile(uploadedfile.$id);
      throw new Error;
    }

    return newPost;

  } catch (error) {
    console.log("Appwrite Exception :: createNewPost :: ", error);
  }
}

export async function uploadFile(file: File) {

  try {
    const uploadedfile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )

    return uploadedfile;
  } catch (error) {
    console.log("Appwrite Exception :: uploadFile :: ", error);
  }
}

export async function getFilePreview(fileId: string) {

  try {
    const fileUrl = await storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    return fileUrl;
  } catch (error) {
    console.log("Appwrite Exception :: getFilePreviw :: ", error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(
      appwriteConfig.storageId,
      fileId
    )
  } catch (error) {
    console.log("Appwrite Exception :: deleteFile :: ", error);
  }
}


// ********** Get Posts *************

export async function getRecentPosts() {

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    );
    return posts;
  } catch (error) {
    console.log("Appwrite Exception :: getRecentPosts :: ", error);
  }
}


export async function likePost(postId: string, likesArray: string[]) {

  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray
      }
    )
    if(!updatedPost){
      throw new Error;
    }
    return updatedPost;
  } catch (error) {
    console.log("Appwrite Exception :: likePost :: ", error);
  }

}

export async function savePost(postId: string, userId: string) {  

  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )
    if(!updatedPost){
      throw new Error;
    }
    return updatedPost;
  } catch (error) {
    console.log("Appwrite Exception :: likePost :: ", error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {  

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )
    if(!statusCode){
      throw new Error;
    }
    return {status: "ok", statusCode};
  } catch (error) {
    console.log("Appwrite Exception :: likePost :: ", error);
  }
}