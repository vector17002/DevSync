'use server'
import { db } from '@/db/migrate';
import { sessionTable } from '@/db/schema';
import { initialProfile } from '@/lib/initial-profile';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
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

export async function deleteSession(sessionId: string) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
    revalidatePath('/debugcohort')
}

export async function setStatusForSession(sessionId: string, value: "compeleted" | "not-completed" | "on-going"){
    if(value !== "compeleted"){
    //@ts-ignore
    await db.update(sessionTable).set({status : value}).where(eq(sessionTable.id, sessionId))
}else{
    //@ts-ignore
    await db.update(sessionTable).set({status : value, endedAt : new Date()}).where(eq(sessionTable.id, sessionId))
}
    revalidatePath('/debugcohort')
}