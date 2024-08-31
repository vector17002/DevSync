//@ts-nocheck
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
import { GithubIcon, Tags } from "lucide-react"
import { SessionTableType } from "@/db/schema"
import { Badge } from "./ui/badge"
import ParticipantsBagde from "./ui/participants"
  

const MultiCard = ({data} : {data  : SessionTableType}) => {
  const tags = data.skills?.toLowerCase().split(',')
  return (
<Card className="min-w-[20vw] h-[40vh] flex flex-col justify-between">
  <CardHeader>
    <CardTitle className="text-xl font-bold">{data.name}</CardTitle>
    <CardDescription>{data.details}</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col justify-between gap-5">
    <div className="flex gap-5 items-center w-full flex-wrap">
    {tags?.map((tag) => (
      <Badge className="bg-black text-white p-1 px-2 rounded-xl hover:bg-white hover:text-black dark:bg-white dark:text-black" key={tag}>{tag}</Badge>
    ))}
    </div>
    <Link href={data.githubRepo} className="font-semibold flex hover:text-blue-300 text-xs">
    <GithubIcon className="w-4 h-4"/>
     Github
    </Link>
  </CardContent>
  <CardFooter className="flex items-center gap-2 text-xs">
    <CustomButton value="Join now" link={`/session/${data.id}`}/>
    <ParticipantsBagde item={data.hostId} designation={'Host'}/>
  </CardFooter>
</Card>

  )
}

export default MultiCard