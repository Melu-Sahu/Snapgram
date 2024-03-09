import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { checkIsLiked } from "@/lib/utils";
import {
    useLikedPostMutation,
    useSavePostMutation,
    useDeleteSavedPostMutation,
    useGetCurrentUserMutation,
} from "@/lib/react-query/queryAndMutations";
import Loader from "./Loader";
import { useToast } from "../ui/use-toast";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
    const location = useLocation();
    const likesList = post?.likes.map((user: Models.Document) => user.$id);

    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(false);
    const { toast } = useToast();

    const { mutate: likePost } = useLikedPostMutation();
    const { mutate: savePost, isPending: isSavingPost } = useSavePostMutation();
    const { mutate: deleteSavePost, isPending: isDeletingSavedPost } = useDeleteSavedPostMutation();

    const { data: currentUser } = useGetCurrentUserMutation();

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post?.$id
    );
    useEffect(() => {

        setIsSaved(savedPostRecord ? true : false);
    }, [currentUser]);

    // console.log(`savedPostRecord for post id ${post.$id}`, savedPostRecord);


    const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        let likesArray = [...likes];

        if (likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
            likesArray.push(userId);
        }

        setLikes(likesArray);
        likePost({ postId: post?.$id || "", likesArray });
    };

    const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        // console.log("clidked save post for post Id: ", post.$id);

        if (savedPostRecord) {
            setIsSaved(false);
            toast({
                title: "Removed from saved.",
            })
            return deleteSavePost(savedPostRecord.$id);
        }

        const saved = savePost({ userId: userId, postId: post?.$id || "" });
        toast({
            title: "Post saved successfully.",
        });
        setIsSaved(true);
    };

    const containerStyles = location.pathname.startsWith("/profile") ? "w-full" : "";

    return (
        <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex gap-2 mr-5">
                <img
                    src={`${checkIsLiked(likes, userId)
                        ? "/assets/icons/liked.svg"
                        : "/assets/icons/like.svg"
                        }`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />

                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                {isSavingPost || isDeletingSavedPost ? <Loader /> :
                    <img
                        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                        alt="share"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={(e) => handleSavePost(e)}
                    />
                }
            </div>
        </div>
    );
};

export default PostStats;