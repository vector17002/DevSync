import { initialProfile } from "@/lib/initial-profile";
import { NextResponse } from "next/server";

const DevPals = async () => {
  const user = await initialProfile();
  if(!user) 
    return new NextResponse("You are not authorise")
    
  return (
    <div>
      Devpals
    </div>
  )
}

export default DevPals