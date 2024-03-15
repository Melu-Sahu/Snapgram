import { useParams } from 'react-router-dom';

const ChatBox = () => {
  const { id } = useParams()
  return (
    <div className='flex justify-center items-center w-full'>
      **Not yet implimented<br />Chat with User: id: {id} :
    </div>
  )
}

export default ChatBox;
