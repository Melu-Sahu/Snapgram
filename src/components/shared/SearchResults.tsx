import { Models } from 'appwrite';
import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultsProp = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
}
const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProp) => {


  if (isSearchFetching) {
    return <Loader />
  } else if (searchedPosts && searchedPosts.length > 0) {

    console.log("Seacched Post", searchedPosts);

    return <GridPostList posts={searchedPosts} showUser={true} showState={true} />
  }

  return (
    <p className='text-light-4 mt-10 text-center w-full'>
      No results found.
    </p>
  )
}

export default SearchResults;
