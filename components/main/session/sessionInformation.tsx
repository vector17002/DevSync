import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { initialProfile } from "@/lib/initial-profile"
import EditDelete from "./edit_delete"

const SessionInformation = async ({session} : {session : any}) => {
  const user = await initialProfile()
  const tags = session.skills?.toLowerCase().split(',')

  return (
    <Card className="min-w-[25vw] h-[50vh] flex flex-col justify-between">
  <CardHeader>
    <CardTitle className="text-xl font-bold">{session.name}</CardTitle>
    <CardDescription>{session.details}</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col justify-between gap-5">
    <div className="flex gap-5 items-center w-full flex-wrap">
    {tags?.map(
        //@ts-ignore
        (tag) => (
      <Badge className="bg-black text-white p-1 px-2 rounded-xl hover:bg-white hover:text-black dark:bg-white dark:text-black" key={tag}>{tag}</Badge>
    ))}
    </div>
    <Link href={session.githubRepo} className="font-semibold flex hover:text-blue-300 text-xs" target="_blank">
    <GithubIcon className="w-4 h-4"/>
     Github
    </Link>
    {
    //@ts-ignore 
    user.id === session.hostId && (
      <EditDelete sessionId={session.id}/>
    )
    }
  </CardContent>
</Card>
  )
}

export default SessionInformation