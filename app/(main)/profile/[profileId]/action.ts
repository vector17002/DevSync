"use server"

import { db } from "@/db/migrate"
import { userTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateProfile(profileId : string , values : any){
   await db.update(userTable).set({...values}).where(eq(userTable.id , profileId))
   revalidatePath(`/profile/${profileId}`)
}