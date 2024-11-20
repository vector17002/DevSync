"use client"

import {  unfollowUser } from "@/app/(main)/profile/[profileId]/action"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

const RemoveFollower = ({userId , profileId , isFollowing} : {userId : string , profileId : string , isFollowing: boolean}) => {
  async function handleFollow(){
    if(isFollowing){
    
    toast.promise(
      unfollowUser(profileId, userId),
      {
        loading: "Ufollowing user",
        success: <p className="font-semibold text-base">Unfollowed user</p>,
        error: <p className="font-semibold text-base">Something went wrong!!</p>
      }
    )
  } else{
    toast.promise(
      unfollowUser(userId, profileId),
      {
        loading: "Removing user",
        success: <p className="font-semibold text-base">Removed user</p>,
        error: <p className="font-semibold text-base">Something went wrong!!</p>
      }
    )
  }
  }
  return (
    <Button className='w-max px-4 dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2' onClick={handleFollow}>{isFollowing ? "Unfollow" : "Remove"}</Button>
  )
}

export default RemoveFollower