"use client"
import { generateToken } from "@/app/(main)/session/[sessionId]/action";
import { useState , useEffect } from "react";
import { StreamChat, Channel as StreamChannel } from "stream-chat";
import {
    Chat,
    Channel,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
  } from "stream-chat-react";
  import "stream-chat-react/dist/css/v2/index.css";

const apiKey = process.env.GET_STREAM_API_KEY!;

const ChatWindow = ({sessionId , user} : {sessionId : string , user : any}) => {
    const [client , setClient] = useState<StreamChat | null>(null)
    const [channel , setChannel] = useState<StreamChannel | null>(null)
    useEffect(() => {
       async function init(){
        const client = new StreamChat(apiKey)

        await client.connectUser({
            id: user.id,
            name: user.name,
            image: user.image_url
        },
        () => generateToken()
        )

        const channel = client.channel('messaging', sessionId, {
            name: 'Session Chat',
            members: [user.id]
        })
        await channel.watch()

        setChannel(channel)
        setClient(client)
       } 
       init()

       if(client && channel){
        return () => {
            client.disconnectUser()
        }
       }
}, [])

    if (!client) return <div>Loading...</div>;

    return (
      <Chat client={client}>
        <Channel 
        //@ts-ignore
        channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    );
  };
  
export default ChatWindow