import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs"
import { NextResponse } from "next/server";

const DebugCohort = async () => {
  const user = await initialProfile();

  console.log(user)
  
  if(!user) 
    return new NextResponse("You are not authorise")
    
  return (
    <div><UserButton afterSignOutUrl="/"/></div>
  )
}

export default DebugCohort