import { db } from '@/db/migrate'
import VideoPlayer from '../../../../components/main/session/videoplayer'
import { initialProfile } from '@/lib/initial-profile'
import { sessionTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import SessionInformation from '@/components/main/session/sessionInformation'
import ChatWindow from '@/components/main/session/chat'

const SessionPage = async (props : {params : {sessionId : string}}) => {
  const user = await initialProfile()

  if(!user)
     throw new Error('You are not authorized')

  const sessionId = props.params.sessionId
  const session = await db.query.sessionTable.findFirst({
    where: eq(sessionTable.id, sessionId)
  })
  if(!session) return (<div className='text-center text-5xl justify-center font-bold h-full flex'>Session not found</div>)
  return (
    <div className='w-full pr-8 flex justify-center gap-0 mt-10'>
      <VideoPlayer sessionId={sessionId} user={user}/>
      <div className='flex flex-col gap-5'>
      <SessionInformation session={session}/>
      <ChatWindow sessionId={sessionId} user={user}/>
      </div>
    </div>
  )
}

export default SessionPage