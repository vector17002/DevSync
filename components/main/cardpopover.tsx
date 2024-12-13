'use client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover" 
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "react-hot-toast"
import SessionForm from "./edit-session/session-form"
import {DotsVerticalIcon } from "@radix-ui/react-icons"
import { AlertDialogFooter } from "../ui/alert-dialog"
import { AlertDialogHeader } from "../ui/alert-dialog"
import { deleteSession } from "@/app/(main)/session/[sessionId]/action"
import { ComboboxDemo } from "./combobox"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../ui/button"

const CardPopover = ({session} : {session : any}) => {
const router = useRouter()
return (
<Popover>
  <PopoverTrigger>
    <DotsVerticalIcon className="w-5 h-5"/>
  </PopoverTrigger>
  <PopoverContent className="w-max h-max bg-white dark:bg-zinc-900 flex flex-col gap-2 text-sm font-semibold">                                           
   <SessionForm session={session}/>
    <AlertDialog >
      <AlertDialogTrigger asChild className="hover:bg-red-500 hover:text-white rounded-md p-2 w-full">
        <p>Delete</p>
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-white dark:bg-black p-5'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            session and all the data associated with it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='rounded-md font-bold'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-rose-500 text-white font-bold hover:text-red-500 rounded-md' onClick={() => {
           toast.promise( deleteSession(session.id), {
            loading: "Deleting session",
            success: <p className="font-semibold text-base">Session deleted</p>,
            error: <p className="font-semibold text-base">Something went wrong!!</p>
           } )
          router.refresh()}}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <ComboboxDemo sessionId={session.id} currStatus={session.status}/>
  </PopoverContent>
</Popover>
  )
}

export default CardPopover