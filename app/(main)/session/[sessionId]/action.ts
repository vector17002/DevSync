'use server'
import { initialProfile } from '@/lib/initial-profile';
import { StreamChat } from 'stream-chat'

export async function  generateToken (){
const user = await initialProfile()

if(!user){
    throw new Error('You are not logged in')
}
//@ts-ignore
const api_key = process.env.GET_STREAM_API_KEY!;
const api_secret = process.env.GET_STREAM_SECRET!
const serverClient = StreamChat.getInstance(api_key, api_secret)
//@ts-ignore
const token = serverClient.createToken(user?.id)

return token
}