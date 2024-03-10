import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { getAllUsersMutation } from "@/lib/react-query/queryAndMutations";
import { Link } from "react-router-dom";


const AllUsers = () => {

  const { data: users, isPending: isUserDataLoading, } = getAllUsersMutation();
  // const { data: users, isFetching: isSearchFetching } = getAllUsersMutation();


  // console.log("All users data", users);

  if (isUserDataLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <div className="explore-container">
        <h2 className="h3-bold md:h2-bold w-full mb-5">All User's</h2>
      <div className="grid-container">

        {
          users?.documents.map((user) => (
            <div key={user.$id} className="user-card">

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
                className="hover:bg-primary-500 hover:outline-none"
                onClick={() => alert("Followed.")}>Follow</Button>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default AllUsers
