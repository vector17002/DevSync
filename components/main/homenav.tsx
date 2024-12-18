import Link from "next/link"
import Image from "next/image"
import { initialProfile } from "@/lib/initial-profile"
import { ModeToggle } from "../mode-toggle"


const Navbar = async () => {
  const user = await initialProfile()
  return (
    <div className="sticky top-0 w-full bg-white dark:bg-zinc-900 z-50">
    <div className="flex w-full max-w-6xl mx-auto justify-between px-10 py-2 sticky-nav dark:bg-zinc-900 ">
        <Link href={"/"} className="bg-black rounded-full p-1">
          <Image src="/assets/Logo.png" height={38} width={38} className="rounded-full" alt={"logo"}/>
      </Link>
      <div className="flex flex-row gap-10 justify-center items-center">
        <ModeToggle/>
        <div className="hidden md:flex md:flex-row gap-8">
          <Link href={"/"} className="text-base font-medium">
            Home
          </Link>
          <Link href={"/#featured"} className="text-base font-medium">
            Features
          </Link>
          <Link href={"/#faq"} className="text-base font-medium">
             About
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar