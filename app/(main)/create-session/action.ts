"use server"

import { db } from "@/db/migrate";
import { sessionTable, SessionTableType } from "@/db/schema";
import { initialProfile } from "@/lib/initial-profile";

export async function createSessionAction(session : Omit<SessionTableType , "hostId"> ){
    const user = await initialProfile()
    console.log(session)
    //@ts-ignore
    await db.insert(sessionTable).values({...session , hostId : user.id})
    return
}