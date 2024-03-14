import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Models } from 'appwrite'

const UsersCard = ({ user }: { user: Models.Document, }) => {
    return (
        <div className="user-card">

            <Link to={`/profile/${user.$id}`} className="">
                <img
                    src={user.imageUrl}
                    width={100}
                    height={100}
                    className="rounded-full"
                />
                <h1 className="text-center mt-6">{user.name}</h1>
                <p className="text-center mt-2">@{user.username}</p>
            </Link>
            <Button
                variant='outline'
                className="shad-button_primary px-5"
                onClick={() => alert("Followiing.")}>Follow</Button>
        </div>
    )
}

export default UsersCard
