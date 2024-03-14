import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostState';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
// import { getUsersPostsMutation, useDeletePostMutation, useGetPostByIdMutation } from '@/lib/react-query/queryAndMutations';
import { useGetUsersPostsMutation, useGetPostByIdMutation } from '@/lib/react-query/queryAndMutations';
import { multiFormatDateString } from '@/lib/utils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import GridPostList from '@/components/shared/GridPostList';

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending: isGettingPost } = useGetPostByIdMutation(id || '');
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: userPosts, isLoading: isUserPostLoading } = useGetUsersPostsMutation(post?.creator.$id);
  // const { mutate: deletePost } = useDeletePostMutation();


  const handleDeletePost = () => {

    console.log("Delete button pressed.");

    /* Delete post functionality is not working now. We will fix it later. */
    // const isDeleted = deletePost({ postId: post?.$id, imageId: post?.imageId });
    // console.log("Is Deleted", isDeleted);

    // if (isDeleted) {}

    toast({
      title: "Post Deleted."
    });

    navigate("/");

  }

  if (isGettingPost) {
    return <div className="flex-center w-full h-full">
      <Loader />
    </div>
  }

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button onClick={() => navigate(-1)} variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isUserPostLoading || !post ? (<Loader />) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                <img src={post?.creator.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1"> {post?.creator.name} </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">{multiFormatDateString(post?.$createdAt)}</p>
                    •
                    <p className="subtle-semibold lg:small-regular"> {post?.location} </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <img src={"/assets/icons/edit.svg"} alt="edit" width={24} height={24} />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${user.id !== post?.creator.$id && "hidden"
                    }`}>
                  <img src={"/assets/icons/delete.svg"} alt="delete" width={24} height={24} />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts of <span className='text-light-3'>@{post?.creator.username}</span>
        </h3>
        {isUserPostLoading || !userPosts ? (<Loader />) : (<GridPostList posts={userPosts.documents} showUser={true} showState={true} />)}
      </div>
    </div>
  );
}
export default PostDetails;
