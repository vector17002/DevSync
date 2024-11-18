"use server"

import { db } from "@/db/migrate"
import { eq } from "drizzle-orm"
import { sessionTable, SessionTableType } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { initialProfile } from "@/lib/initial-profile"

export async function updateSession(sessionId : string , session : Omit<SessionTableType , "hostId"> ){
   const user = await initialProfile()

   if(!user)
       throw new Error("Please sign in to create a session")

   //@ts-ignore
   await db.update(sessionTable).set({...session}).where(eq(sessionTable.id,sessionId));
   revalidatePath("/debugcohort")
}