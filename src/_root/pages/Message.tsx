import { useUserContext } from "@/context/AuthContext"
import { Link } from "react-router-dom";



const Message = () => {
    const {user } =useUserContext();
    return (
        <div>
            chat with

            <Link className="bg-violet-500 rounded p-3 items-center m-5" to={`${user.id}`} >{user.username}</Link>


            {/* Todo
            User's the will be here and we can start chat with them,
            One more database collection we need to create where we can add our chatListed users. */}
        </div>
    )
}

export default Message
