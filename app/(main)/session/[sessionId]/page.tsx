
import VideoPlayer from './videoplayer'
import { initialProfile } from '@/lib/initial-profile'

const SessionPage = async (props : {params : {sessionId : string}}) => {
  const user = await initialProfile()

  if(!user)
     throw new Error('You are not authorized')

  //@ts-ignore
  const userId = user.id

  const sessionId = props.params.sessionId
  return (
    <div className='w-full'>
      <VideoPlayer sessionId={sessionId} userId={userId}/>
    </div>
  )
}

export default SessionPage