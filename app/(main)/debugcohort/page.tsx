import { db } from "@/db/migrate";
import MultiCard from "@/components/main/card";
import { Cover } from "@/components/ui/cover";
import { SearchBar } from "./search";
import { like } from "drizzle-orm";
import { sessionTable } from "@/db/schema";
import { unstable_noStore } from "next/cache";
import SessionForm from "@/components/main/create-session/session-form";

const DebugCohort = async ({ 
  searchParams
 } : {
  searchParams : {
  search : string
}}) => {
  unstable_noStore();
  const { search } = searchParams;
  const sessions = await db.query.sessionTable.findMany({
    where: search ? like(sessionTable.skills, `%${search}%`) : like(sessionTable.skills, `%%`),
    with: {
      hostId: true
    }
  });
  return ( 
    <div className="w-full max-w-8xl mx-auto h-full mt-10 mb-10 flex flex-col items-center justify-center">
      <div className="flex flex-col w-full gap-8 items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-8">
          <Cover className="text-4xl font-extrabold">Debug Cohort</Cover>
<div className="flex flex-col text-md text-slate-600 justify-center items-center dark:text-slate-300"> Create or find a session, let other developers across the application <p>help you solve bugs and collaborate in your project.</p></div>
        </div>
        <div className="flex gap-5 w-4/5 items-center justify-center">
        <SessionForm/>
        <SearchBar/>
        </div>
      </div> 
    <div className="w-full max-w-6xl mx-auto h-full grid grid-cols-1 md:grid-cols-3 items-center mt-10 gap-5 justify-center">
      {sessions.map((session) => (
      <MultiCard key={session.id} data={session} />
      ))}
    </div>
    </div>
  )
}

export default DebugCohort