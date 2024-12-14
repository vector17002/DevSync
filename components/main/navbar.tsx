import Link from "next/link"
import { ModeToggle } from "../mode-toggle"
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import CurrentPage from "../../lib/currentPage"
import { cn } from "@/lib/utils"
import { initialProfile } from "@/lib/initial-profile"


const Navbar = async () => {
  const user = await initialProfile()
  return (
    <div className="sticky top-0 w-full bg-slate-50 dark:bg-gray-950 z-auto">
    <div className="flex w-full max-w-6xl mx-auto justify-between px-10 py-2 bg-slate-50 dark:bg-gray-950 sticky-nav">
          <Link href={"/"} className="bg-black rounded-full p-1">
          <Image src="/assets/Logo.png" height={38} width={38} className="rounded-full" alt={"logo"}/>
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
          }}
          afterSignOutUrl="/"/>
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
    </div>
  )
}

export default Navbar