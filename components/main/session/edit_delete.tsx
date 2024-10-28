'use client'
import { Button } from '@/components/ui/button'
import { Edit, TrashIcon } from 'lucide-react'
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
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ComboboxDemo } from '../combobox'
const EditDelete = ({sessionId , currStatus } : {sessionId : string , currStatus : string }) => {
    const router = useRouter()
  return (
    <div className="flex gap-5">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <Link href={`/edit-session/${sessionId}`}>
    <Button size="icon" variant="outline" className="rounded-xl"> <Edit className="w-4 h-4"/> </Button>
    </Link>
        </TooltipTrigger>
        <TooltipContent className='bg-black text-white font-bold text-sm dark:bg-white dark:text-black rounded-xl p-2'>
          <p>Edit your session</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <AlertDialog >
      <AlertDialogTrigger asChild>
      <Button className="bg-rose-500 rounded-xl text-white hover:text-red-500" size="icon"> 
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
          <AlertDialogCancel className='rounded-xl font-bold'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-rose-500 text-white font-bold hover:text-red-500 rounded-xl' onClick={() => {deleteSession(sessionId) 
          router.push('/debugcohort')}}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <ComboboxDemo sessionId={sessionId} currStatus={currStatus}/>
    </div>
  )
}

export default EditDelete