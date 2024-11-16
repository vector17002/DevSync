import EditProfile from "@/components/main/profile/edit-profile";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db/migrate";
import { userTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLocationDot, FaTags } from "react-icons/fa6"
import { FaUniversity } from "react-icons/fa"
import { initialProfile } from "@/lib/initial-profile";
import ProfileSessionCard from "@/components/main/profile/profileSessionCard";
import UserActivity from "@/components/main/profile/userActivity";
import FollowButton from "@/components/main/profile/followButton";
import { Separator } from "@/components/ui/separator";
import FollowersFollowing from "@/components/main/profile/followersFollowing";

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
    <main className="flex max-w-8xl h-max my-[2rem] mx-auto flex-row gap-3 justify-center">
     <div className="w-[18rem] h-full px-5 flex glassmorphism gap-4 flex-col">
      <div className="w-max h-full flex justify-center gap-4 items-center">
      <Image 
      //@ts-ignore
       src={profile?.image_url} alt="Profile Img" width={80} height={80} className="rounded-xl object-contain"/>
       <div className="w-max h-max justify-center flex flex-col">
        <p className="text-sm font-bold">{profile?.name}</p>
        <p className="text-xs">{profile?.tagline}</p>
      </div>
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-200 font-semibold flex flex-col gap-5 justify-start max-w-[15rem]">
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
     <div className="flex flex-col justify-center items-center gap-3 max-w-[50rem] min-w-[50rem] h-max">
     <div className="w-full h-max glassmorphism flex flex-col gap-3">
      <p className="text-lg font-semibold dark:text-white">{   
      //@ts-ignore
      user?.id === profile?.id ? "My" : "User's"} sessions</p>
      <div className="w-full h-full flex items-center mt-5 gap-5 overflow-x-scroll scroll-smooth">
        {profile?.sessions.map((session) => (
          <ProfileSessionCard key={session.id} session={session}/>
        ))}
      </div>
     </div>
     <div className="w-full h-max glassmorphism flex flex-col gap-3">
      <UserActivity profile={profile}/>
     </div>
     </div>
    </main>
  )
}

export default Profile