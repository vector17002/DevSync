import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import CurrentPage from "../lib/currentPage"
import { cn } from "@/lib/utils"
import { initialProfile } from "@/lib/initial-profile"


const Navbar = async () => {
  const user = await initialProfile()
  return (
    <div className="flex w-full justify-between px-10 py-2 bg-slate-50 dark:bg-gray-950">
        <Link href={"/"} >
         <div className="dark:flex hidden">
          <Image src="/assets/image.png" height={160} width={180} className="rounded-full" alt={"logo"}/>
          </div>
          <div className="visible dark:hidden">
          <Image src="/assets/logofinall.png" height={160} width={180} className="rounded-full" alt={"logo"}/>
          </div>
        </Link>
        <div className="flex flex-row gap-5 justify-center items-center">
        <ModeToggle/>
        <CurrentPage 
        //@ts-ignore
        userId={user.id}/>
        <Link href={"/debugcohort"} >
          <div className={cn(user ? 'w-full' : 'hidden')}>
          <div className="dark:hidden w-full rounded-xl p-1">
          <UserButton 
          showName={true}
          appearance={{
            variables:{
              colorText: "black",
            }
          }}/>
          </div>
          <div className="hidden dark:flex w-full">
          <UserButton 
          showName={true}
          appearance={{
            baseTheme: dark,
            variables:{
              colorText: "white"
            }
          }}
          afterSignOutUrl="/"/>
          </div>
          </div>
        </Link>
        </div>
    </div>
  )
}

export default Navbar