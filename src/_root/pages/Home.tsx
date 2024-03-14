import Loader from '@/components/shared/Loader';
import { useGetPostMutation, useGetUsersMutation } from '@/lib/react-query/queryAndMutations';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { HomeFeedItems } from '../../components/shared/HomeFeedItems';
import UsersCard from '@/components/shared/UsersCard';

const Home = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isPending: isDataLoading, isError: isErrorPosts } = useGetPostMutation();
  const { data: creators, isPending: isCreatorsDataLoading, isError: isErrorCreator } = useGetUsersMutation(10);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }

  }, [inView]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  if (isErrorPosts || isErrorCreator) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened. Try again.</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened. Try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-1 '>

      <div className='home-container'>
        <div className='home-post'>
          <div className='max-w-5xl flex gap-3 justify-start w-full py-4 pb-10'>
            <img src="/assets/icons/home.svg" alt="add post" width={36} height={36} />
            <h2 className='h3-bold md:h3-bold text-left w-full'>Home Feed</h2>
          </div>
          {
            isDataLoading && !posts ? (
              <Loader />
            ) : (

              posts?.pages.map((page, index) => <HomeFeedItems posts={page.documents} key={`page-${index}`} />)

            )
          }
        </div>
        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>


      <div className="home-creators">
        <div className='max-w-5xl flex gap-3 justify-start w-full py-4 pb-10'>
          <img src="/assets/icons/people.svg" alt="add post" width={36} height={36} />
          <h2 className='h3-bold md:h3-bold text-left w-full'>Top Creators</h2>
        </div>
        {isCreatorsDataLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UsersCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>

    </div >
  )
}

export default Home;
