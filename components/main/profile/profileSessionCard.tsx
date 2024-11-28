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
import EditDelete from "@/components/main/session/edit_delete"
import { cn } from "@/lib/utils"
import { initialProfile } from "@/lib/initial-profile"
import { FaGithub } from "react-icons/fa6"

const ProfileSessionCard = async ({session} : {session : any}) => {
  const user = await initialProfile()
  return (
    <Card className="w-full h-[12rem] flex flex-col justify-between">
  <CardHeader className="h-max">
    <CardTitle className="flex flex-row justify-between mb-2"><p className="text-lg font-bold">{session.name}</p>
    <Badge className={cn(session.status === 'on-going' ? "bg-green-500  animate-flicker" : session.status === 'compeleted' ? "bg-red-500" : "bg-indigo-500" , "text-white rounded-xl w-max h-max")}>
      {session.status ===  'on-going' ? "Live" : session.status === 'compeleted' ? "Completed" : "Paused"}
    </Badge></CardTitle>
    <CardDescription className="text-sm">{session.details}</CardDescription>
  </CardHeader>
  <CardContent className="flex mt-3 justify-between items-center gap-5 h-4">
  {
      //@ts-ignore
      user.id !== session.hostId && session.githubRepo !== " " &&
   (<Link 
    href={session.githubRepo} className="font-semibold flex hover:text-indigo-500 text-xs gap-1 items-center py-2 mb-5" target="_blank">
    <FaGithub className="w-6 h-6"/>
    <span className="bg-neutral-100 dark:bg-neutral-700 p-2">{session.githubRepo}</span>
    </Link>)}
    {//@ts-ignore
    user?.id === session.hostId && (
      <EditDelete session={session}/>
    )}
  </CardContent>
  <CardFooter>
  </CardFooter>
</Card>
  )
}

export default ProfileSessionCard