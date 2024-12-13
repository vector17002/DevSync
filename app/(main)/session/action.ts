'use server'
import { db } from '@/db/migrate';
import { sessionTable, SessionTableType } from '@/db/schema';
import { initialProfile } from '@/lib/initial-profile';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateSession(sessionId : string , session : Omit<SessionTableType , "hostId"> ){
    const user = await initialProfile()
 
    if(!user)
        throw new Error("Please sign in to create a session")
 
    //@ts-ignore
    await db.update(sessionTable).set({...session}).where(eq(sessionTable.id,sessionId));
    revalidatePath("/debugcohort")
 }