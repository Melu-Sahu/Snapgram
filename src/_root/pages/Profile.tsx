import { useUserContext } from "@/context/AuthContext"

const Profile = () => {
  const {user} = useUserContext();

  console.log("user", user);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile
