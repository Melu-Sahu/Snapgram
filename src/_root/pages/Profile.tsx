import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext"
import { useGetUserByIdMutation, useGetUsersPostsMutation } from "@/lib/react-query/queryAndMutations";
import { Link, useParams } from "react-router-dom";
// import { profileTabs } from "@/constance";
import GridPostList from "@/components/shared/GridPostList";

const Profile = () => {

  const { id } = useParams();

  const { user } = useUserContext();

  const { data: creatorProfile, isPending: isLoadingCreatorsProfile } = useGetUserByIdMutation(id || "");
  const { data: usersPosts, isPending: isUsersPostLoading } = useGetUsersPostsMutation(id || "");

  if (isLoadingCreatorsProfile) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  // console.log("Users Post", usersPosts);

  function onFollowClick() {
    alert("Following")
  }

  return (
    <div className="profile-container w-full">
      <div className="profile-inner_container">
        <img src={creatorProfile?.imageUrl} alt="Creator's Photo" className="rounded-full" width={150} height={150} />
        <div className="flex flex-col w-full">
          <div className="w-full">
            <div className="flex items-center justify-start gap-6">
              <h1 className="lg:h1-bold sm:h2-bold">{creatorProfile?.name}</h1>
              {
                (user.id === id) ? (
                  <Link to={`/update-profile/${id}`} className="flex gap-3 bg-dark-3 hover:bg-dark-4 p-2 rounded-md items-center justify-center">
                    <img src="/assets/icons/edit.svg" alt="edit" width={25} height={25} /> Edit Profile
                  </Link>
                ) : (
                  <div className="flex gap-10 justify-evenly ">
                    <Button className="shad-button_primary" onClick={onFollowClick}> Follow</Button>
                    <Link className="rounded-md bg-white flex items-center p-1 px-4" to={`/chat/${creatorProfile?.$id}`}>
                      <p className="text-sm text-black">Message</p>
                    </Link>
                  </div>
                )
              }
            </div>
            <p className="text-light-3 my-3">@{creatorProfile?.username}</p>
            <div className="flex gap-14 w-1.5 justify-between items-center ">
              <p className="flex gap-3"><span className="text-violet-400">{42}</span> posts </p>
              <p className="flex gap-3"><span className="text-violet-400">{422}</span> Follower </p>
              <p className="flex gap-3"><span className="text-violet-400">{642}</span> Following </p>
            </div>
            <hr className="border w-full border-dark-4/80 my-2" />
            <p >{creatorProfile?.bio || "A Snapgram Creator."}</p>
          </div>
        </div>
      </div>

      {/* We will impliment it later */}
      {/* <div className="profile-tab flex justify-between w-full">
        <div className="flex items-center w-full">
          {
            profileTabs.map((tab) => (
              <Button className="bg-dark-3 hover:bg-dark-4 flex gap-3">
                <img src={tab.imageUrl} alt="tabImage" width={25} height={25} />
                <p> {tab.label}</p>
              </Button>
            ))
          }
        </div>
        <img src="/assets/icons/filter.svg" alt="filter" />
      </div> */}


      <div className="w-full">
        <h1 className="lg:h2-bold sm:h3-bold mb-6"><span className="text-violet-500">{creatorProfile?.username}</span>'s  all posts</h1>

        {
          (isUsersPostLoading) ?
            (
              <div className="flex-center w-full h-full">
                <Loader />
              </div>
            ) :
            (
              <GridPostList posts={usersPosts?.documents || []} showUser={false} showState={true} />
            )
        }

      </div>


    </div>
  )
}

export default Profile;