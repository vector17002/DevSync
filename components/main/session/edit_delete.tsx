'use client'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"
import { deleteSession } from '@/app/(main)/session/[sessionId]/action'
import { useRouter } from 'next/navigation'
import { ComboboxDemo } from '../combobox'
import SessionForm from '../edit-session/session-form'
import toast from 'react-hot-toast'
const EditDelete = ({session} : {session : any}) => {
  const router = useRouter()
  return (
    <div className="flex gap-5">
   <SessionForm session={session}/>
    <AlertDialog >
      <AlertDialogTrigger asChild>
      <Button className="bg-rose-500 text-white hover:text-red-500" size="icon"> 
        <TrashIcon className='w-4 h-4'/>
    </Button>
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
    </div>
  )
}

export default EditDelete