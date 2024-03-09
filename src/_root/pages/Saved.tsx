import Loader from '@/components/shared/Loader';
import { useUserContext } from '@/context/AuthContext'
import { getUsersSavedPostMutatation } from '@/lib/react-query/queryAndMutations';
import { Link } from 'react-router-dom';

const Saved = () => {

  let { user } = useUserContext();
  const { data: savedData, isPending: isSavedDataLoading } = getUsersSavedPostMutatation(user.id);


  if (isSavedDataLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className='explore-container'>
      <h2 className="h3-bold md:h2-bold w-full mb-10">Your Saved Posts</h2>
      <ul className='grid-container'>
        {
          savedData?.documents.map((doc) =>
          (
            <li key={doc.post.$id} className='relative min-w-80 h-80'>
              <Link to={`/posts/${doc.post.$id}`} className='grid-post_link'>
                <img src={doc.post.imageUrl} className='h-full w-full object-cover' />
              </Link>

              <div className="grid-post_user">
                {
                  (
                    <div className='flex items-center justify-start gap-3 flex-1'>
                      <img src={doc.post.creator.imageUrl} alt='creator' className='h-8 w-8 rounded-full' />
                      <p className='line-clamp-1'>{doc.post.creator.name}</p>
                    </div>
                  )
                }
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Saved
