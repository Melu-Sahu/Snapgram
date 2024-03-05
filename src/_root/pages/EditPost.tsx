import PostForm from '@/components/forms/PostForm';
import Loader from '@/components/shared/Loader';
import { useGetPostByIdMutation } from '@/lib/react-query/queryAndMutations';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostByIdMutation(id || '');

  if (isPending) return <Loader />

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex gap-3 justify-start w-full'>
          <img src="/assets/icons/add-post.svg" alt="add post" width={36} height={36} />
          <h2 className='h3-bold md:h3-bold text-left w-full'>Edit Post</h2>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  )
}

export default EditPost;
