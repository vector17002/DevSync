"use client"
import {
    Call,
    CallControls,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
  } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import "@stream-io/video-react-sdk/dist/css/styles.css"
import {generateToken } from './action';

const apiKey = process.env.GET_STREAM_API_KEY!;

  const VideoPlayer = ({sessionId , userId} : {sessionId: string , userId : string}) => {
    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call | null>(null)
  useEffect(() => {
    const client = new StreamVideoClient({ 
      apiKey : apiKey,
       user : {
      id: userId
    },
    tokenProvider: () => generateToken() 
  });
    setClient(client)
    const call = client?.call('default', sessionId)
    call?.join({create: true});
    setCall(call)
    
    return() => {
        call.leave()
        client.disconnectUser()
    }
    } , [userId , sessionId])
    return (
      client && call && <StreamVideo client={client}>
        <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout/>
          <CallControls/>
        </StreamCall>
        </StreamTheme>
      </StreamVideo>
    );
  };
  export default VideoPlayer