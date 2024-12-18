import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { initialProfile } from "@/lib/initial-profile"
import { FaGithub } from "react-icons/fa6"
import CardPopover from "../cardpopover"

const ProfileSessionCard = async ({session} : {session : any}) => {
  const user = await initialProfile()
  return (
    <Card className="w-full h-[12rem] flex flex-col justify-between dark:border-neutral-600">
  <CardHeader className="h-max">
    <CardTitle className="flex flex-row justify-between mb-2"><p className="text-lg font-bold">{session.name}</p>
    <div className="flex items-center gap-2">
    <Badge className={cn(session.status === 'on-going' ? "bg-green-500  animate-flicker" : session.status === 'compeleted' ? "bg-red-500" : "bg-indigo-500" , "text-white rounded-xl w-max h-max")}>
      {session.status ===  'on-going' ? "Live" : session.status === 'compeleted' ? "Completed" : "Paused"}
    </Badge>
    {
    //@ts-ignore
    user.id === session.hostId && (<CardPopover session={session}/>)}
    </div></CardTitle>
    <CardDescription className="text-sm">{session.details}</CardDescription>
  </CardHeader>
  <CardContent className="flex mt-3 justify-between items-center gap-5 h-4">
  { session.githubRepo !== " " &&
   (<Link 
    //@ts-ignore
    href={session.githubRepo} className="font-semibold bg-slate-100 w-max px-2 rounded-md dark:bg-zinc-800 flex text-xs gap-1 items-center py-2 mb-2 mt-2" target="_blank">
    <FaGithub className="w-6 h-6"/>
    Github Repository
    </Link>)}
  </CardContent>
  <CardFooter>
  </CardFooter>
</Card>
  )
}

export default ProfileSessionCard