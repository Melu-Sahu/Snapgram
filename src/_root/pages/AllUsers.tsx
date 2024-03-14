import Loader from "@/components/shared/Loader";
import UsersCard from "@/components/shared/UsersCard";
import { useGetAllUsersMutation } from "@/lib/react-query/queryAndMutations";

const AllUsers = () => {

  const { data: users, isPending: isUserDataLoading } = useGetAllUsersMutation();

  if (isUserDataLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <div className="explore-container">
      <div className='max-w-5xl flex gap-3 justify-start w-full py-4 pb-10'>
        <img src="/assets/icons/people.svg" alt="add post" width={36} height={36} />
        <h2 className='h3-bold md:h3-bold text-left w-full'>All Creators</h2>
      </div>
      <div className="grid-container">
        {
          users?.documents.map((user) => (
            <UsersCard user={user} key={user.$id} />
          ))
        }
      </div>

    </div>
  )
}

export default AllUsers;
