import { db } from '@/db/migrate'
import VideoPlayer from '../../../../components/main/session/videoplayer'
import { initialProfile } from '@/lib/initial-profile'
import { sessionTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import SessionInformation from '@/components/main/session/sessionInformation'

const SessionPage = async (props : {params : {sessionId : string}}) => {
  const user = await initialProfile()

  if(!user)
     throw new Error('You are not authorized')

  const sessionId = props.params.sessionId
  const session = await db.query.sessionTable.findFirst({
    where: eq(sessionTable.id, sessionId)
  })

  if(!session)
    return (<div>Session Not Found</div>)
  return (
    <div className='w-full pr-8 flex justify-center gap-0 mt-10'>
      <VideoPlayer sessionId={sessionId} user={user}/>
      <SessionInformation session={session}/>
    </div>
  )
}

export default SessionPage