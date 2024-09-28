import { db } from "@/db/migrate";
import { NextResponse } from "next/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { initialProfile } from "@/lib/initial-profile";
import { Input } from "@/components/ui/input";
import MultiCard from "@/components/card";
import { Cover } from "@/components/ui/cover";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";

const DebugCohort = async () => {
  const user = await initialProfile();
  if(!user) 
    return new NextResponse("You are not authorise")
  
  const sessions = await db.query.sessionTable.findMany({
    with: {
      hostId: true
    }
  });

  return (
    <div className="w-full h-full mt-10 flex flex-col items-center justify-center">
      <div className="flex flex-col w-full gap-8 items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-8">
          <Cover className="text-5xl font-extrabold">Debug Cohort</Cover>
<div className="flex flex-col text-lg text-slate-600 justify-center items-center dark:text-slate-300"> Create or find a session let other developers across the application <p>help you solve bugs in your program.</p></div>
        </div>
        <div className="flex gap-5 w-3/5 items-center">
        <Label className="text-sm bg-slate-800 p-2 px-3 rounded-xl text-white dark:bg-slate-200 dark:text-black flex gap-2 items-center"> <SearchIcon className="w-4 h-4"/> Search</Label>
        <Input placeholder="Enter skills of interest, seperated with ','" className="rounded-xl text-slate-500 dark:text-slate-200"/>
        <Link href={'/create-session'}>
        <Button className="w-full px-4 rounded-xl dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2">Create session</Button>
        </Link>
        </div>
      </div> 
    <div className="w-4/5 h-full flex items-center mt-10 gap-5 overflow-x-scroll scroll-smooth">
      {sessions.map((session) => (
      //@ts-ignore
      <MultiCard key={session.id} data={session}/>
      ))}
    </div>
    </div>
  )
}

export default DebugCohort