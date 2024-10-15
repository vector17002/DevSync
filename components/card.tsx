import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import CustomButton from "./custombutton"
import Link from "next/link"
import { GithubIcon } from "lucide-react"
import { SessionTableType } from "@/db/schema"
import { Badge } from "./ui/badge"
import ParticipantsBagde from "./ui/participants"
import EditDelete from "./main/session/edit_delete"
  

const MultiCard = ({data , user} : {data  : SessionTableType , user : any}) => {
const tags = data.skills?.toLowerCase().split(',')
  return (
<Card className="min-w-[22vw] h-[40vh] flex flex-col justify-between">
  <CardHeader className="h-2">
    <CardTitle className="text-xl font-bold">{data.name}</CardTitle>
    <CardDescription>{data.details}</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col justify-between gap-5 h-4">
    <div className="flex gap-5 items-center w-full flex-wrap">
    {tags?.map((tag) => (
      <Badge className="bg-black text-white p-1 px-2 rounded-xl hover:bg-white hover:text-black dark:bg-white dark:text-black" key={tag}>{tag}</Badge>
    ))}
    </div>
    <div className="flex items-center gap-5">
    <Link 
    //@ts-ignore 
    href={data.githubRepo} className="font-semibold flex hover:text-blue-300 text-xs" target="_blank">
    <GithubIcon className="w-4 h-4"/>
     Github
    </Link>
   {
     //@ts-ignore
    user.id === data.hostId.id ? (
      //@ts-ignore
      <EditDelete sessionId={data.id}/>
      ) : (<></>)
    }
    </div>
  </CardContent>
  <CardFooter className="flex items-center gap-2 text-xs">
    <CustomButton value="Join" link={`/session/${data.id}`} className={""}/>
    <ParticipantsBagde item={data.hostId} designation={'Host'}/>
  </CardFooter>
</Card>
  )
}

export default MultiCard