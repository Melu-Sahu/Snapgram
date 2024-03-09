import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useGetPostMutation } from '@/lib/react-query/queryAndMutations';
import { Models } from 'appwrite';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isPending: isDataLoading } = useGetPostMutation();


  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // console.log("Posts", posts?.pages[0].documents);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

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
                  posts?.pages[0].documents.map((post: Models.Document) => (
                    <PostCard post={post} key={post.$id} />
                  ))
                }
              </ul>
            )
          }
        </div>
        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;
