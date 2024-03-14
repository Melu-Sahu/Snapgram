import PostForm from '@/components/forms/PostForm';
import Loader from '@/components/shared/Loader';
import { useUserContext } from '@/context/AuthContext';
import { useGetUsersPostsMutation } from '@/lib/react-query/queryAndMutations';
import { Link } from 'react-router-dom';


const CreatePost = () => {

  const { user } = useUserContext();
  const { data: usersPost, isPending: isUserPostLoading } = useGetUsersPostsMutation(user.id)


  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex gap-3 justify-start w-full'>
          <img src="/assets/icons/add-post.svg" alt="add post" width={36} height={36} />
          <h2 className='h3-bold md:h3-bold text-left w-full'>Create Post</h2>
        </div>
        <PostForm action='Create' />
      </div>


      <div className="home-creators">
        <div className='max-w-5xl flex gap-3 justify-start w-full py-4 pb-10'>
          <Link to={`/profile/${user.id}`} className='flex justify-center items-center'>
            <img src={user.imageUrl} alt="add post" width={40} height={40} className='rounded-full' />
          </Link>
          <h2 className='h3-bold md:h3-bold text-left w-full'>Your top posts</h2>
        </div>
        {
          isUserPostLoading || !usersPost ?
            (<Loader />)
            : (
              <ul className='flex flex-col gap-4'>
                {
                  usersPost.documents.map((post) => (
                    <li>
                      <Link to={`/post/${post.$id}`} className='rounded-3xl'>
                        <img src={post.imageUrl} alt='postImage' className='w-full h-full rounded-2xl' />
                      </Link>
                    </li>
                  ))
                }
              </ul>
            )
        }
      </div>
    </div>
  )
}

export default CreatePost
