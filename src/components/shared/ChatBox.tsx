import { useParams } from 'react-router-dom'

const ChatBox = () => {
    const {id} = useParams()
  return (
    <div>
      Chat with id: {id}
    </div>
  )
}

export default ChatBox
