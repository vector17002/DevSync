import { db } from "@/db/migrate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MultiCard from "@/components/card";
import { Cover } from "@/components/ui/cover";
import { SearchBar } from "./search";
import { like } from "drizzle-orm";
import { sessionTable } from "@/db/schema";
import { unstable_noStore } from "next/cache";

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
    <div className="w-full h-full mt-10 flex flex-col items-center justify-center">
      <div className="flex flex-col w-full gap-8 items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-8">
          <Cover className="text-5xl font-extrabold">Debug Cohort</Cover>
<div className="flex flex-col text-lg text-slate-600 justify-center items-center dark:text-slate-300"> Create or find a session, let other developers across the application <p>help you solve bugs and collab in your project.</p></div>
        </div>
        <div className="flex gap-5 w-3/5 items-center">
        <Link href={'/create-session'}>
        <Button className="w-full px-4 dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2">Create session</Button>
        </Link>
        <SearchBar/>
        </div>
      </div> 
    <div className="w-4/5 h-full flex items-center mt-10 gap-5 overflow-x-scroll scroll-smooth">
      {sessions.map((session) => (
      <MultiCard key={session.id} data={session} />
      ))}
    </div>
    </div>
  )
}

export default DebugCohort