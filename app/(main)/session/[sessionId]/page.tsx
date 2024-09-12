
import { db } from '@/db/migrate'
import VideoPlayer from './videoplayer'
import { initialProfile } from '@/lib/initial-profile'
import { sessionTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

const SessionPage = async (props : {params : {sessionId : string}}) => {
  const user = await initialProfile()

  if(!user)
     throw new Error('You are not authorized')

  const sessionId = props.params.sessionId
  const session = db.query.sessionTable.findFirst({
    where: eq(sessionTable.id, sessionId)
  })
  return (
      <VideoPlayer session={session} user={user}/>
  )
}

export default SessionPage