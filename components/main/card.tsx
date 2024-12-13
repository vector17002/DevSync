import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import CustomButton from "../custombutton"
import Link from "next/link"
import { SessionTableType } from "@/db/schema"
import { Badge } from "../ui/badge"
import ParticipantsBagde from "../ui/participants"
import { initialProfile } from "@/lib/initial-profile"
import { cn } from "@/lib/utils"
import { FaGithub } from "react-icons/fa6"
import CardPopover from "./cardpopover"
  

const MultiCard = async ({ data } : {data  : SessionTableType}) => {
const user = await initialProfile();
const tags = data.skills?.toLowerCase().split(',')
  return (
<Card className="min-w-[22rem] max-w-[22rem] h-[20rem] flex flex-col justify-between dark:border-neutral-600">
  <CardHeader className="h-2">
    <CardTitle className="flex flex-row justify-between mb-2">
    <p className="text-xl font-bold">{data.name}</p>
    <div className="flex items-center justify-center gap-4">
    <Badge className={cn(data.status === 'on-going' ? "bg-green-500  animate-flicker" : data.status === 'compeleted' ? "bg-red-500" : "bg-indigo-500" , "text-white rounded-xl w-max h-max")}>
      {data.status ===  'on-going' ? "Live" : data.status === 'compeleted' ? "Completed" : "Paused"}
    </Badge>
    {
    //@ts-ignore
    user.id === data.hostId.id && (<CardPopover session={data}/> )}
    </div>
    </CardTitle>
    <CardDescription>{data.details}</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col justify-between gap-5 h-5">
    <div className="flex gap-3 items-center w-full flex-wrap mt-2">
    {tags?.map((tag) => (
      <Link href={`/debugcohort?search=${tag}`} key={tag}>
      <Badge className="bg-black text-white rounded-xl hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white" >{tag}</Badge></Link>
    ))}
    </div>
    {data.githubRepo !== " " &&
   (<Link 
    //@ts-ignore 
    href={data.githubRepo} className="font-semibold flex hover:text-indigo-500 text-xs gap-1 items-center py-2" target="_blank">
    <span className="bg-neutral-100 dark:bg-neutral-700 p-2">{data.githubRepo}</span>
    </Link>)}
  </CardContent>
  <CardFooter className="flex items-center justify-between gap-3 text-xs mt-5">
    {data.status === 'on-going' ? ( <CustomButton value="Join" link={`/session/${data.id}`} className={""}/>) : data.status === 'compeleted' ? (<p className="text-md font-semibold"> Ended at {data.endedAt} </p>) : 
    //@ts-ignore
    user.id !== data.hostId.id ? (<CustomButton value="Subscribe" className={"w-full bg-gray-400"}/>) :(<p className="text-md font-semibold">Paused at {data.endedAt}</p>)}
    <Link 
    //@ts-ignore
    href={`/profile/${data.hostId.id}`}> <ParticipantsBagde item={data.hostId} designation={'Host'}/> </Link>
  </CardFooter>
</Card>
  )
}

export default MultiCard