import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import PostStats from './PostState';

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showState?: boolean;
}

const GridPostList = ({ posts, showUser = true, showState = true }: GridPostListProps) => {

  const { user } = useUserContext();

  // console.log("Posts in grid postlist", posts)
  
  return (
    <ul className='grid-container w-full'>
      {
        posts.map((post: Models.Document) => (
          <li key={post.$id} className='relative min-w-60 h-60'>
            <Link to={`/posts/${post.$id}`} className='grid-post_link '>
              <img src={post.imageUrl} className='h-full w-full object-cover' />
            </Link>

            <div className="grid-post_user">
              {
                showUser && (
                  <div className='flex items-center justify-start gap-3 flex-1'>
                    <img src={post.creator.imageUrl} alt='creator' className='h-8 w-8 rounded-full' />
                    <p className='line-clamp-1'>{post.creator.name}</p>
                  </div>
                )
              }
              {
                showState &&
                (
                  <PostStats post={post} userId={user.id} />
                )
              }
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default GridPostList
