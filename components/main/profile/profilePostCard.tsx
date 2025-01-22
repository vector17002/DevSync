import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { initialProfile } from "@/lib/initial-profile"
import { PostTableType } from "@/db/schema"
import { BugIcon, Code, Heart } from "lucide-react"
import { FaBlog, FaCommentDots } from "react-icons/fa6"
  
const ProfilePostCard = async ({post} : {post : PostTableType}) => {
    const user = await initialProfile()
    return (
  <Card className="w-full h-[10rem] flex flex-col justify-between border-neutral-200 dark:border-neutral-600">
    <CardHeader className="h-max">
      <CardTitle className="flex flex-row justify-between mb-2"><p className="text-lg font-bold">{post.title}</p>
      <div className="flex items-center gap-2">
      <Badge className={cn(post.category === 'bug' ? "bg-rose-500" : post.category === 'blog' ? "bg-green-500" : "bg-indigo-500" , "text-white rounded-xl w-max h-max")}>
        {post.category ===  'bug' ? <span><BugIcon className="w-4 h-4"/></span> : post.category === 'blog' ? <span><FaBlog className="w-4 h-4" /></span> : <span><Code className="w-4 h-4"/></span>}
      </Badge>
      </div></CardTitle>
      <CardDescription className="text-sm">{post.content}</CardDescription>
    </CardHeader>
    <CardContent className="flex mt-3 items-center gap-8 h-4 mb-5">
      <button className="flex items-center gap-1">
        <Heart className="w-5 h-5"/>
        <p className="font-bold text-sm">{post.likes?.length}</p>
      </button>
      <div>
        <FaCommentDots className="w-5 h-5"/>
      </div>
    </CardContent>
  </Card>
    )
  }
  
  export default ProfilePostCard