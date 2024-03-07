import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce';
import { useGetPostMutation, useSerarhPostMutation } from '@/lib/react-query/queryAndMutations';
import { useState } from 'react';

const Explore = () => {


  const [searhValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(setSearchValue, 500);
  const { data: posts, fetchNextPage, hasNextPage } = useGetPostMutation();
  const { data: searchPosts, isFetching: isSearchFetching } = useSerarhPostMutation(searhValue);


  if (!posts) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = searhValue !== "";
  const shouldShowPosts = !shouldShowSearchResults && posts?.pages.every((item) => item?.documents.length === 0);


  console.log("Posts", posts);



  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img
            src='/assets/icons/search.svg'
            width={24}
            height={24}
            alt='search' />
          <Input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searhValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className='body-bold md:h3-bold'>Popular Today</h2>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className=' small-medium md:base-medium text-light-2'>All</p>
          <img src='/assets/icons/filter.svg' alt='filter' height={20} width={20} />
        </div>
      </div>

      {/* <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {
          shouldShowSearchResults ? (
            <SearchResults />
          ) : (
            shouldShowPosts ? (
              <p className='text-light-4 mt-4 text-center w-full'>End of Posts</p>
            ) : (posts?.pages.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item.documents} />
            )))
          )
        }
      </div> */}

    </div>
  )
}

export default Explore
