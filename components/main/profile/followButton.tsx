"use client"

import { followUser, unfollowUser } from "@/app/(main)/profile/[profileId]/action"
import { Button } from "@/components/ui/button"

const FollowButton = ({userId , profileId , isFollowing} : {userId : string , profileId : string , isFollowing: boolean}) => {
  async function handleFollow(){
    if(isFollowing)
    await unfollowUser(profileId, userId)
    else
    await followUser(profileId, userId)
  }
  return (
    <Button className='w-full px-4 dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2' onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</Button>
  )
}

export default FollowButton