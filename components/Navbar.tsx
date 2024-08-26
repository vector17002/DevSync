import Link from "next/link"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import Image from "next/image"
import { currentUser } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import CurrentPage from "../lib/currentPage"


const Navbar = async () => {
  const user = await currentUser()
  return (
    <div className="flex w-full justify-between px-10 pb-2 py-2">
        <Link href={"/"} >
          <Image src="/assets/logo-final.png" height={80} width={60} className="rounded-full" alt={"logo"}/>
        </Link>
        <div className="flex flex-row gap-5 justify-center items-center">
        <ModeToggle/>
        <CurrentPage/>
        <Link href={"/debugcohort"} >
        {user ? (
          <>
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
          </>
        ): (<></>)}
        </Link>
        </div>
    </div>
  )
}

export default Navbar