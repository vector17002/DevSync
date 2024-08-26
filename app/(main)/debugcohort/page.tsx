import { PinContainer } from "@/components/ui/3d-pin";
import { db } from "@/db/migrate";
import { userTable } from "@/db/schema";
import { initialProfile } from "@/lib/initial-profile";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const DebugCohort = async () => {
  const user = await initialProfile();
  if(!user) 
    return new NextResponse("You are not authorise")
  
  const sessions = await db.query.sessionTable.findMany({
    with: {
      hostId: true
    }
  });
  console.log(sessions)
  return (
    <div className="w-full flex flex-row">
      {sessions.map((session) => (
       <PinContainer>
        <div className="text-sm flex flex-col min-w-[15vw] gap-4 dark:text-white">
          {session.name}
          <div className="flex flex-col justify-center items-center w-full">
            <div>
            {session.details}
            </div>
          </div>
        </div>
       </PinContainer>
      ))}
    </div>
  )
}

export default DebugCohort