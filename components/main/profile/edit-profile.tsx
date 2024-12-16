"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/app/(main)/profile/[profileId]/action";
import toast from "react-hot-toast";
  
  
  const formSchema = z.object({
    tagline: z.string().min(3,{
      message: "Tagline must be at least 5 characters.",
    }).max(20,{
      message: "Tagline must be at max 20 characters."
    }),
    bio: z.string().min(10, {
     message: "Bio must be at least 2 characters.",
   }).max(75, {
     message: "Bio should be of max 75 characters."
   }),
   skills: z.string().toLowerCase(),
   location: z.string(),
   university: z.string()
  })
  

const EditProfile = ( { profile } : {profile : any}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          tagline: `${profile.tagline}`,
          bio: `${profile.bio}`,
          skills: `${profile.skills}`,
          location: `${profile.location}`,
          university : `${profile.university}`
        },
      })

     const onSubmit = async (values: z.infer<typeof formSchema>) => {
      toast.promise(
        updateProfile(profile.id, values),
        {
           loading: "Updating profile",
           success: <p className="font-semibold text-base">Updated successfully</p>,
           error: <p className="font-semibold text-base">Something went wrong!!</p>
        },
      )
     }
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className='w-full px-4 dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2'>
          Update Profile
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-black">
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
          <DialogDescription>
            Update your profile and let others know more about you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-2">
          <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl className="text-neutral-600 dark:text-neutral-300">
                <Input placeholder="Give a tagline For ex (SDE at ..)" {...field}/>
              </FormControl>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl className="text-neutral-600 dark:text-neutral-300">
                <Input placeholder="Bio" {...field}/>
              </FormControl>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl className="text-neutral-600 dark:text-neutral-300">
                <Input placeholder="Enter your skills and interests seperated with ','" {...field} />
              </FormControl>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl className="text-neutral-600 dark:text-neutral-300">
                <Input placeholder="Enter your current location in 'State, Country' format" {...field} />
              </FormControl>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University / Organization</FormLabel>
              <FormControl className="text-neutral-600 dark:text-neutral-300">
                <Input placeholder="Enter your college or university" {...field} />
              </FormControl>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
        <Button type="button" variant="outline" className="w-max px-4 dark:text-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" onClick={form.handleSubmit(onSubmit)}>
          <DialogClose>
              Update
          </DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfile