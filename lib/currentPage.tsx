"use client"

import Link from "next/link"
import {usePathname } from "next/navigation"
import { Button } from "../components/ui/button"
import CustomButton from "@/components/custombutton"

const CurrentPage = () =>{
    const path = usePathname()
    const pathToshow = path === "/" ? "/debugcohort" : path === "/debugcohort" ? "/devpals" : "/debugcohort";
    const elementToshow = pathToshow === "/debugcohort" && path === "/" ? "Get started" : pathToshow === "/debugcohort" ? "Sessions" : "Projects";

    return (
       <Link href={`${pathToshow}`}>
        <Button className="w-full px-4 rounded-xl dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2">
            {elementToshow}
        </Button>
       </Link>
    //    <CustomButton value={elementToshow} link={pathToshow}/>
    )
}
export default CurrentPage