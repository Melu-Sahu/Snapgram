import Loader from '@/components/shared/Loader';
import { useGetPostMutation } from '@/lib/react-query/queryAndMutations';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {HomeFeedItems} from './HomeFeedItems';

const Home = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isPending: isDataLoading } = useGetPostMutation();


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

  return (
    <div className='flex flex-1 '>
      <div className='home-container'>
        <div className='home-post'>
          <h2 className='h3-bold md:h2-bold text-left w-full'> Home Feed</h2>
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
    </div>
  )
}

export default Home;
