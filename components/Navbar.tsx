import Link from "next/link"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"

const Navbar = () => {
  return (
    <div className="flex w-full justify-between px-10 items-center pb-3">
        <Link href={"/"} >
        <Button className="bg-black dark:bg-slate-300 text-white dark:text-black rounded-xl dark:hover:text-white dark:hover:bg-black p-5">
            Icon button
          </Button>
        </Link>
        <div className="flex flex-row gap-2 justify-center items-center">
        <ModeToggle/>
        <Link href={"/debugcohort"} >
        <Button className="bg-black dark:bg-slate-300 text-white dark:text-black rounded-xl dark:hover:text-white dark:hover:bg-black p-5">
            Get started
          </Button>
        </Link>
        </div>
    </div>
  )
}

export default Navbar