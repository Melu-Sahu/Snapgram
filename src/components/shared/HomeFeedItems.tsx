import PostCard from "@/components/shared/PostCard";
import { Models } from "appwrite"


export const HomeFeedItems = ({ posts }: { posts: Models.Document[], key?: string }) => {


    return (
        <ul className="flex flex-col flex-1 gap-9 w-full ">
            {posts?.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                    <PostCard post={post} />
                </li>
            ))}
        </ul>
    )

}