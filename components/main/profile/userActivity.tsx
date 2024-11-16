"use client"

import { UserTableType } from "@/db/schema"

const UserActivity = ({profile} : {profile : any}) => {
  console.log(profile?.posts)
  return (
    <div className="w-full h-max flex flex-col">
        <div className="w-max h-max">
        </div>
    </div>
  )
}

export default UserActivity