import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { cn } from "@/lib/utils"
  import { initialProfile } from "@/lib/initial-profile"
import { PostTableType } from "@/db/schema"
import { BugIcon, Code } from "lucide-react"
import { FaBlog } from "react-icons/fa6"
import Link from "next/link"
  
  const ProfilePostCard = async ({post} : {post : PostTableType}) => {
    const user = await initialProfile()
    return (
  <Card className="w-full h-[10rem] flex flex-col justify-between border-neutral-200 dark:border-neutral-600">
    <CardHeader className="h-max">
      <CardTitle className="flex flex-row justify-between mb-2"><p className="text-lg font-bold">{post.title}</p>
      <div className="flex items-center gap-2">
      <Badge className={cn(post.category === 'bug' ? "bg-rose-500  animate-flicker" : post.category === 'blog' ? "bg-green-500" : "bg-indigo-500" , "text-white rounded-xl w-max h-max")}>
        {post.category ===  'bug' ? <span><BugIcon className="w-4 h-4"/></span> : post.category === 'blog' ? <span><FaBlog className="w-4 h-4" /></span> : <span><Code className="w-4 h-4"/></span>}
      </Badge>
      </div></CardTitle>
      <CardDescription className="text-sm">{post.content}</CardDescription>
    </CardHeader>
    <CardContent className="flex mt-3 justify-between items-center gap-5 h-4">
        <p>{post.likes?.length}</p>
    </CardContent>
  </Card>
    )
  }
  
  export default ProfilePostCard