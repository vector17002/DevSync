"use client"

import {  unfollowUser } from "@/app/(main)/profile/[profileId]/action"
import { Button } from "@/components/ui/button"

const RemoveFollower = ({userId , profileId , isFollowing} : {userId : string , profileId : string , isFollowing: boolean}) => {
  async function handleFollow(){
    if(isFollowing)
    await unfollowUser(profileId, userId)
    else
    await unfollowUser(userId, profileId)
  }
  return (
    <Button className='w-max px-4 dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2' onClick={handleFollow}>{isFollowing ? "Unfollow" : "Remove"}</Button>
  )
}

export default RemoveFollower