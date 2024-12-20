import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { initialProfile } from "@/lib/initial-profile"
import { FaGithub } from "react-icons/fa6"
import Invite from "../invite"
import CardPopover from "../cardpopover"

const SessionInformation = async ({session} : {session : any}) => {
  const user = await initialProfile()
  const tags = session.skills?.toLowerCase().split(',')

  return (
  <Card className="min-w-[25vw] max-w-[27vw] h-max flex flex-col justify-start dark:border-neutral-600">
  <CardHeader>
    <CardTitle className="flex flex-row justify-between text-xl font-bold">
      <p>{session.name}</p>
      {//@ts-ignore
      user?.id === session.hostId && (<CardPopover session={session}/>)}
      </CardTitle>
    <CardDescription>{session.details}</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col justify-between gap-5">
    
    <div className="flex gap-5 items-center w-full flex-wrap">
    {tags?.map(
        //@ts-ignore
        (tag) => (
          <Link href={`/debugcohort?search=${tag}`} key={tag}>
      <Badge className="bg-black text-white p-1 px-2 rounded-xl hover:bg-white hover:text-black dark:bg-white dark:text-black" >{tag}</Badge></Link>
    ))}
    </div>
    <Invite url={`http://localhost:3000/session/${session.id}`}/>
    { session.githubRepo !== " " &&
   (<Link 
    //@ts-ignore
    href={session.githubRepo} className="font-semibold bg-slate-100 w-max px-2 rounded-md dark:bg-zinc-800 flex text-xs gap-1 items-center py-2 mb-2 mt-2" target="_blank">
    <FaGithub className="w-6 h-6"/>
    Github Repository
    </Link>)}
  </CardContent>
</Card>
  )
}

export default SessionInformation