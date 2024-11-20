"use client"

import { followUser, unfollowUser } from "@/app/(main)/profile/[profileId]/action"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

const FollowButton = ({userId , profileId , isFollowing} : {userId : string , profileId : string , isFollowing: boolean}) => {
  async function handleFollow(){
    if(isFollowing){
    toast.promise(
     unfollowUser(profileId, userId),{
      loading: "Unfollowing user",
      success: <p className="font-semibold text-base">Unfollowed successfully</p>,
      error: <p className="font-semibold text-base">Something went wrong!!</p>
     }
    )
    }
    else{
    toast.promise(
      followUser(profileId, userId),{
       loading: "Following user",
       success: <p className="font-semibold text-base">Followed successfully</p>,
       error: <p className="font-semibold text-base">Something went wrong!!</p>
      }
     )
   }
  }
  return (
    <Button className='w-full px-4 dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2' onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</Button>
  )
}

export default FollowButton