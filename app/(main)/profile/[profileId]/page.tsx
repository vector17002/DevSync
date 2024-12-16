import EditProfile from "@/components/main/profile/edit-profile";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db/migrate";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLocationDot, FaTags } from "react-icons/fa6"
import { FaUniversity } from "react-icons/fa"
import { initialProfile } from "@/lib/initial-profile";
import ProfileSessionCard from "@/components/main/profile/profileSessionCard";
import FollowButton from "@/components/main/profile/followButton";
import { Separator } from "@/components/ui/separator";
import FollowersFollowing from "@/components/main/profile/followersFollowing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = async (props : { params : { profileId : string} }) => {
const user = await initialProfile()
 const profileId = props.params.profileId;
 const profile = await db.query.userTable.findFirst({
  where: eq(userTable.id , profileId),
  with: { sessions : true, comments: true , posts: true}
 })
 const githubUserName = profile?.githubId?.slice(19, profile?.githubId?.length);
 const skills = profile?.skills?.split(',');
 //@ts-ignore
 const isFollowing = profile?.followers.includes(user.id)

  return (
    <main className="flex max-w-6xl h-max my-[2rem] mx-auto flex-row gap-3 justify-center">
     <div className="w-full max-w-[20rem] h-full px-5 flex glassmorphism gap-4 flex-col">
      <div className="w-full h-full flex justify-start gap-4 items-center mt-5">
      <Image 
      //@ts-ignore
       src={profile?.image_url} alt="Profile Img" width={80} height={80} className="rounded-xl object-contain"/>
       <div className="w-max h-max justify-center flex flex-col">
        <p className="text-sm font-bold">{profile?.name}</p>
        <p className="text-xs">{profile?.tagline}</p>
      </div>
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-200 font-semibold flex flex-col gap-5 justify-center w-full">
        <p>{profile?.bio}</p>
        { //@ts-ignoreundefined
        profile?.id == user.id ? (<EditProfile profile={profile}/>) : (<FollowButton userId={user.id} profileId={profileId} isFollowing={isFollowing}/>)}
        <FollowersFollowing profile={profile}/>
        <div className="flex gap-2 items-center"><FaLocationDot className="w-3 h-3"/> <p>{profile?.location}</p></div>
        {profile?.university && (
          <div className="flex gap-2 items-center"> <FaUniversity className="w-3 h-3"/> <p>{profile?.university}</p></div>
        )}
        {profile?.skills && ( <div className="w-full flex gap-2 flex-wrap items-center">
        <FaTags className="w-3 h-3"/>
        {skills?.map((skill) => (
           <Link href={`/debugcohort?search=${skill}`} key={skill}>
           <Badge className="bg-black text-white text-xs rounded-xl hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white" >{skill}</Badge></Link>
        ))}
        </div>) }
        {profile?.githubImageUrl && (
          //@ts-ignore
          <div className="flex gap-2 items-center"><FaGithub className="w-3 h-3"/> <Link href={profile.githubId}>{githubUserName}</Link> </div>
        )}
        <Separator className="bg-slate-300"/>
      </div>
     </div>
     <Tabs defaultValue="sessions" className="w-full">
       <TabsList className="w-full justify-start gap-3">
         <TabsTrigger value="sessions" className="text-lg font-semibold glassmorphism p-2 rounded-none">Sessions</TabsTrigger>
         <TabsTrigger value="posts" className="text-lg font-semibold glassmorphism p-2 rounded-none">Posts</TabsTrigger>
       </TabsList>
       <TabsContent value="sessions" className="flex flex-col">
       <div className="w-full h-max flex flex-col gap-3">
      { //@ts-ignore
      (profile.sessions.length > 0)  && (<div className="w-full h-max grid items-center m-2 mt-5 gap-5 grid-cols-2">
        {profile?.sessions.map((session) => (
          <ProfileSessionCard key={session.id} session={session}/>
        ))}
      </div>)}
      {profile?.sessions.length === 0 && (
        <div>No Sessions found</div>
      )}
     </div>
       </TabsContent>
       <TabsContent value="posts">
       <div className="w-full h-max flex flex-col gap-3">
       { //@ts-ignore
      (profile?.posts.length > 0)  && (<div className="w-full h-max grid items-center m-2 mt-5 gap-5 grid-cols-2">
        {profile?.posts.map((session) => (
          <ProfileSessionCard key={session.id} session={session}/>
        ))}
      </div>)}
      {profile?.posts.length === 0 && (
        <div>No Posts found</div>
      )}
     </div>
       </TabsContent>
     </Tabs>
    </main>
  )
}

export default Profile