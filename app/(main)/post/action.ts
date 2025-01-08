"use server"

import { db } from "@/db/migrate"
import { postTable, PostTableType } from "@/db/schema"
import { initialProfile } from "@/lib/initial-profile"
import { revalidatePath } from "next/cache"

export async function createPostAction(post  : Omit<PostTableType, "authorId">){
    const user = await initialProfile()

    if(!user)
        throw new Error("Please sign in using your account")

    //@ts-ignore
    await db.insert(postTable).values({...post, authorId: user.id})
    //@ts-ignore
    revalidatePath(`/profile/${user.id}`)
}