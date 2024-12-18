import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { db } from '@/db/migrate'
import { userTable } from '@/db/schema'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { eq } from 'drizzle-orm'
import RemoveFollower from './removeFollower'
import { initialProfile } from '@/lib/initial-profile'
import Link from 'next/link'


export const FollowerTile = async ({follower , user , isFollowing} : {follower : string , user : string , isFollowing: boolean}) =>{
    const currentUser = await initialProfile();
    const details = await db.query.userTable.findFirst({
          where: eq(userTable.id, follower)
    })
   return(
    <div className='flex justify-between items-center bg-slate-50 w-full p-2 dark:bg-zinc-900'>
      <Link href={`/profile/${follower}`}>
      <div className='flex gap-2 justify-start items-center'>
        <Avatar>
          <AvatarImage src={details?.image_url}/>
        </Avatar>
        <p className='text-sm font-semibold'>{details?.name}</p>
      </div>
      </Link>
      {//@ts-ignore 
      currentUser?.id === user && (
      <RemoveFollower userId={user} isFollowing={isFollowing} profileId={follower}/>)}
    </div>
   ) 
}
const FollowersFollowing = ({profile} : {profile : any}) => {
  const followers = profile?.followers.filter((follower : string) => follower !== "")
  const following = profile?.following.filter((following : string) => following !== "")
  return (
    <div className="w-full justify-between items-center flex">
      <Dialog>
        <DialogTrigger className='text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2'>
          Followers : {followers?.length ? followers.length : 0}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm bg-white dark:bg-black">
          <DialogHeader className='font-bold items-center'>Followers</DialogHeader>
          <div className='flex flex-col justify-between items-center w-full overflow-y-scroll max-h-xl scroll-smooth gap-3'>
          {//@ts-ignore
          profile?.followers.map((follower) => (
             <FollowerTile key={follower} follower={follower} user={profile.id} isFollowing={false}/>
          ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger className='text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2'>
          Following : {following?.length ? following.length : 0}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm bg-white dark:bg-black">
          <DialogHeader className='font-bold items-center'>Following</DialogHeader>
          <div className='flex flex-col justify-between items-center w-full overflow-y-scroll max-h-xl scroll-smooth gap-3'>
          {//@ts-ignore
          profile?.following.map((following) => (
            <FollowerTile key={following} follower={following} user={profile.id} isFollowing={true}/>
          ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FollowersFollowing