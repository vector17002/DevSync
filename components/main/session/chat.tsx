"use client"
import { generateToken } from "@/app/(main)/session/[sessionId]/action";
import { useState , useEffect } from "react";
import { StreamChat, Channel as StreamChannel } from "stream-chat";
import {
    Chat,
    Channel,
    Window,
    MessageList,
    MessageInput,
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
             return () => {
        client?.disconnectUser()
        client?.channel('messaging', sessionId).delete()
             }
      }, [])

          if (!client) return (
          <div className="flex flex-col space-y-4 p-4">
            {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 animate-pulse">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
            ))}
          </div>
          )

          return (
        <Chat client={client} customClasses={{
          'messageList': 'h-[35vh] overflow-y-auto dark:bg-zinc-950 w-4/5 text-neutral-500',
          'channel': 'dark:bg-zinc-950',
          //@ts-ignore
          'messageInput': 'dark:bg-zinc-950 dark:text-white'
            }}>
          <Channel 
          //@ts-ignore
          channel={channel}>
            <Window>
            <MessageList />
            <MessageInput audioRecordingEnabled={true} />
            </Window>
          </Channel>
          </Chat>
    );
  };
  
export default ChatWindow