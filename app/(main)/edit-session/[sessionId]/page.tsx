import SessionForm from '@/components/main/edit-session/session-form'
import React from 'react'

const EditSession = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-10">
    <div className="text-5xl font-bold">Edit Session</div>
    <SessionForm/>
</div>
  )
}

export default EditSession