import { useUserContext } from "@/context/AuthContext"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditProfile from "./EditProfile";

const UpdateProfile = () => {


  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext()

  useEffect(() => {

    if (user.id !== id) {
      alert("You are not authorized to edit this profile.");
      navigate(`/profile/${id}`);
    }

  }, [])

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex gap-3 justify-start w-full'>
          <img src="/assets/icons/edit.svg" alt="add post" width={36} height={36} />
          <h2 className='h3-bold md:h3-bold text-left w-full'>Edit Profile</h2>
        </div>
        <EditProfile />
      </div>
    </div>
  )
}

export default UpdateProfile
