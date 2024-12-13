import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { initialProfile } from "@/lib/initial-profile"
import { FaGithub } from "react-icons/fa6"
import Invite from "../invite"

const SessionInformation = async ({session} : {session : any}) => {
  const user = await initialProfile()
  const tags = session.skills?.toLowerCase().split(',')

  return (
    <Card className="min-w-[25vw] max-w-[27vw] h-[50vh] flex flex-col justify-evenly dark:border-neutral-600">
  <CardHeader>
    <CardTitle className="text-xl font-bold">{session.name}</CardTitle>
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
  </CardContent>
</Card>
  )
}

export default SessionInformation