"use client"
import { UserButton, useSession } from "@clerk/nextjs"

const DebugCohort = () => {
  const user = useSession();
  console.log(user)
  return (
    <div><UserButton/></div>
  )
}

export default DebugCohort