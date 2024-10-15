'use client'
import { Button } from '@/components/ui/button'
import { Edit, EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
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
const EditDelete = ({sessionId } : {sessionId : string}) => {
    const router = useRouter()
  return (
    <div className="flex gap-5">
    <Link href={`/session/${sessionId}/edit`} className="w-full">
    <Button className="rounded-xl glassmorphism-inset-shadow">
      <EditIcon className='w-4 h-4'/>
    </Button>
    </Link>
    <AlertDialog >
      <AlertDialogTrigger asChild>
      <Button className="bg-rose-500 rounded-xl text-white hover:text-red-500"> 
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
    </div>
  )
}

export default EditDelete