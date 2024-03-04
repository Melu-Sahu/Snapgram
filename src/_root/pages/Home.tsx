import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useGetRecentPostsMutation } from '@/lib/react-query/queryAndMutations';
import { Models } from 'appwrite';

const Home = () => {
  const { data: posts, isPending: isDataLoading, isError: isErrorPosts } = useGetRecentPostsMutation()
  return (
    <div className='flex flex-1 '>
      <div className='home-container'>
        <div className='home-post'>
          <h2 className='h3-bold md:h2-bold text-left w-full'> Home Feed</h2>
          {
            isDataLoading && !posts ? (
              <Loader />
            ) : (
              <ul className='flex flex-col flex-1 gap-9 w-full'>
                {
                  posts?.documents.map((post: Models.Document) => (
                    <PostCard post={post} key={post.$id} />
                  ))
                }
              </ul>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home
