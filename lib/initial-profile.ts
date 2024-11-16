import { db } from "@/db/migrate";
import { userTable } from "@/db/schema";
import { currentUser, redirectToSignIn } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm";

export const initialProfile = async () =>{
    try{
    await currentUser();
    }catch{
        return redirectToSignIn()
    }
    const user = await currentUser()
    if(!user)
        return redirectToSignIn();

    const profile = await db.query.userTable.findFirst({        
        where: eq(userTable.id, user.id)
     })

     if(!profile){
        try{
        const githubDetails = user.externalAccounts.filter((details) => {
            return details.provider === "oauth_github"
        })

        let githubUrl = '';
        if(githubDetails)
        githubUrl = `https://github.com/${githubDetails[0]?.username}`

        const newProfile = await db.insert(userTable).values({
            //@ts-ignore
            id: user.id,
            image_url: user.imageUrl,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
            githubId: githubUrl !== '' ? githubUrl : "",
            githubImageUrl: githubDetails[0]?.imageUrl,
            followers: [''],
            following: [''],
            tagline: ""
        }).returning().onConflictDoNothing();

        return newProfile;
    }catch(error){
        console.log(error)
    }}

    return profile
}