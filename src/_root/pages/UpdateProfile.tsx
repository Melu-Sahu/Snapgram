import { useUserContext } from "@/context/AuthContext"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProfile = () => {


  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext()
  console.log("userId", user);

  useEffect(() => {

    if (user.id !== id) {
      console.log("Different User");
      navigate(`/profile/${id}`);
    }

  }, [])

  return (
    <div>
      Update Profile
    </div>
  )
}

export default UpdateProfile
