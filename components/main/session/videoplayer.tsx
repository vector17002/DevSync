"use client"
import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
  } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import "@stream-io/video-react-sdk/dist/css/styles.css"
import {generateToken } from '../../../app/(main)/session/[sessionId]/action';
import { useRouter } from 'next/navigation';
import { BsPeople } from 'react-icons/bs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const apiKey = process.env.GET_STREAM_API_KEY!;

  const VideoPlayer = ({sessionId , user} : {sessionId : string , user : any}) => {
    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call | null>(null)
    const router = useRouter()
  useEffect(() => {
    const client = new StreamVideoClient({ 
      apiKey : apiKey,
       user : {
      id: user.id,
      name: user.name,
      image: user.image_url
    },
    tokenProvider: () => generateToken() 
  });
    setClient(client)
    
    const call = client?.call('development', sessionId)
    call?.join({create: true});
    setCall(call)
    
    return() => {
        client.disconnectUser()
    }
    } , [user , sessionId])
    return (
      <div className='w-full mb-10'>
      {client && call &&
      <StreamTheme className='w-full h-full'>
      <div className='w-full text-white -z-10'>
      <StreamVideo client={client} >
        <StreamCall call={call}>
          <div className='flex w-full flex-col'>
          <SpeakerLayout/>
          <div className='flex justify-center items-center gap-5 w-full'>
          <CallControls onLeave={() => {
            router.push('/debugcohort')
          }}/>
          {/* {showParticipants && ( <div className='flex text-neutral-500 mt-5 w-max items-center justify-center'>
          <CallParticipantsList 
          onClose={() => setShowParticipants(!showParticipants)}/>
          </div>)}
         */}
        <Dialog>
        <DialogTrigger className='dark:text-black dark:bg-white text-white bg-black hover:text-black dark:hover:text-white dark:hover:bg-black rounded-full p-2'>
              <BsPeople className="w-5 h-5"/>
        </DialogTrigger>
        <DialogContent className='bg-white dark:bg-zinc-900 w-full max-w-sm dark:text-white font-extralight'>
          <CallParticipantsList  onClose={() => {}}/>
        </DialogContent>
      </Dialog>
          </div>
         </div>
        </StreamCall>
      </StreamVideo>
      </div>
      </StreamTheme>}
      </div>
    );
  };
  export default VideoPlayer