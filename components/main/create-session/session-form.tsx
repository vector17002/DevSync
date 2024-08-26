"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { createSessionAction } from "@/app/(main)/create-session/action"

const formSchema = z.object({
   name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50, {
    message: "Name should be of max 50 characters"
  }),
  details:z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(200, {
    message: "Name should be of max 50 characters"
  }), 
  githubRepo: z.string(),
})
 const SessionForm = () => {    
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          details: "",
          githubRepo: ""
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>)  {
        await createSessionAction(values)
        router.push('/debugcohort')
      }
    return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/4 mt-20">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Name</FormLabel>
              <FormControl className="text-slate-500 dark:text-slate-300">
                <Input placeholder="Name" {...field} className="rounded-xl"/>
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
                <Input placeholder="Description of the project" {...field} className="rounded-xl"/>
              </FormControl>
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
                <Input placeholder="Please provie project github repository if you have one" {...field} className="rounded-xl" />
              </FormControl>
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