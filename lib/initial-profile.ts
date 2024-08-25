import { db } from "@/db/migrate";
import { userTable } from "@/db/schema";
import { currentUser, redirectToSignIn } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm";

export const initialProfile = async () =>{
    const user = await currentUser();
    console.log(user)

    if(!user)
        return redirectToSignIn();

    const profile = await db.query.userTable.findFirst({        
        where: eq(userTable.id, user.id)
     })

     if(!profile){
        try{
        const newProfile = await db.insert(userTable).values({
            //@ts-ignore
            id: user.id,
            image_url: user.imageUrl,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
            githubId: `https://github.com/${user.externalAccounts[0].username}`,
            githubImageUrl: user.externalAccounts[0].imageUrl
        }).returning().onConflictDoNothing();

        return newProfile;
    }catch(error){
        console.log(error)
    }}

    return profile
}