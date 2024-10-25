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
import { Button } from '@/components/ui/button';

const apiKey = process.env.GET_STREAM_API_KEY!;

  const VideoPlayer = ({sessionId , user} : {sessionId : string , user : any}) => {
    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call | null>(null)
    const [showParticipants, setShowParticipants] = useState<boolean>(false)
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
    
    const call = client?.call('default', sessionId)
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
      <div className='w-full text-white'>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <SpeakerLayout/>
          <CallControls onLeave={() => {
            router.push('/debugcohort')
          }}/>
         {showParticipants && ( <div className='justify-center flex text-slate-400 mt-5'>
          <CallParticipantsList 
          onClose={() => setShowParticipants(!showParticipants)}/>
          </div>)}
          {!showParticipants && (
            <div className='flex items-center justify-center mt-5'>
            <Button onClick={() => {
              setShowParticipants(!showParticipants)
            }} className='dark:text-black dark:bg-white text-white bg-black hover:text-black dark:hover:text-white dark:hover:bg-black rounded-xl'>
              Participants
            </Button>
            </div>
          )}
        </StreamCall>
      </StreamVideo>
      </div>
      </StreamTheme>}
      </div>
    );
  };
  export default VideoPlayer