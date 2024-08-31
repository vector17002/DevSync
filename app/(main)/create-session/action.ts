"use server"

import { db } from "@/db/migrate";
import { sessionTable, SessionTableType } from "@/db/schema";
import { initialProfile } from "@/lib/initial-profile";
import { revalidatePath } from "next/cache";

export async function createSessionAction(session : Omit<SessionTableType , "hostId"> ){
    const user = await initialProfile()

    if(!user)
        throw new Error("Please sign in to create a session")
    //@ts-ignore
    await db.insert(sessionTable).values({...session , hostId : user.id})
    revalidatePath("/debugcohort")
}