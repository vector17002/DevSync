"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { createSessionAction } from "@/app/(main)/create-session/action"
import toast from "react-hot-toast"
import { revalidatePath } from "next/cache"

const formSchema = z.object({
   name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50, {
    message: "Name should be of max 50 characters"
  }),
  details:z.string().min(10, {
    message: "Please specify something about your project",
  }).max(100, {
    message: "Details should be of max 100 characters"
  }), 
  githubRepo: z.string(),
  skills: z.string().toLowerCase(),
  // startAt: z.string().date(),
  // endAt: z.string().date()
})
 const SessionForm = () => {    
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          details: "",
          githubRepo: "",
          skills: "",
          // startAt: "",
          // endAt: ""
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>)  {
        // await createSessionAction(values)
        await toast.promise(
          //@ts-ignore
         createSessionAction(values),{
            loading: "Creating session",
            success: <p className="font-semibold text-base">Created session succesfully</p>,
            error: <p className="font-semibold text-base">Something went wrong!! <br/> Unable to create session</p>
          }
        )
        router.push('/debugcohort')
        router.refresh()
      }
    return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-3/5 mt-10 mb-10">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Name</FormLabel>
              <FormControl className="text-slate-500 dark:text-slate-300">
                <Input placeholder="Name of your project" {...field} className="rounded-xl"/>
              </FormControl>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Description</FormLabel>
              <FormControl className="text-slate-500 dark:text-slate-300">
                <Input placeholder="Description" {...field} className="rounded-xl"/>
              </FormControl>
              <FormDescription>Please give a brief description of your project and the bug you are facing</FormDescription>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Github Repository</FormLabel>
              <FormControl className="text-slate-500 dark:text-slate-300">
                <Input type="url" placeholder="Github Repository url" {...field} className="rounded-xl" />
              </FormControl>
              <FormDescription>Please provide github repository url so that collaborators can have a better idea of the project</FormDescription>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Skills</FormLabel>
              <FormControl className="text-slate-500 dark:text-slate-300">
                <Input placeholder="Tags" {...field} className="rounded-xl" />
              </FormControl>
              <FormDescription>Please add relevant skills seperated with commas</FormDescription>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="px-4 rounded-xl dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2">Submit</Button>
      </form>
    </Form>
    )
}

export default SessionForm