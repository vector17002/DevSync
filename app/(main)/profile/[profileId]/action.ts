"use server"

import { db } from "@/db/migrate"
import { userTable } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateProfile(profileId : string , values : any){
   await db.update(userTable).set({...values}).where(eq(userTable.id , profileId))
   revalidatePath(`/profile/${profileId}`)
}

export async function followUser(profileId : string , userId : string){
   await db.update(userTable).set({followers : sql`array_append(followers, ${userId})`}).where(eq(userTable.id, profileId))
   await db.update(userTable).set({following : sql`array_append(following, ${profileId})`}).where(eq(userTable.id, userId))
   revalidatePath(`/profile/${profileId}`)
   revalidatePath(`/profile/${userId}`)
}

export async function unfollowUser(profileId : string, userId : string){
   await db.update(userTable).set({followers : sql`array_remove(followers, ${userId})`}).where(eq(userTable.id, profileId))
   await db.update(userTable).set({following : sql`array_remove(following, ${profileId})`}).where(eq(userTable.id, userId))
   revalidatePath(`/profile/${userId}`)
   revalidatePath(`/profile/${profileId}`)
}