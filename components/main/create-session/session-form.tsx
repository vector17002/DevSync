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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"


const dateSchema = z.string().refine((val) => {
  return !isNaN(Date.parse(val)); // Checks if the string can be parsed as a valid date
}, {
  message: "Invalid date format",
});


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
  skills: z.string(),
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
        await createSessionAction(values)
        console.log(values)
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(values, null, 2)}</code>
            </pre>
          ),
        })
        router.push('/debugcohort')
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
                <Input placeholder="Description" {...field} className="rounded-xl"/>
              </FormControl>
              <FormDescription>Please give a breif  description of your project</FormDescription>
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
                <Input placeholder="Github Repository url" {...field} className="rounded-xl" />
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
        {/* <FormField
          control={form.control}
          name="startAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value , "PPP")
                      ) : (
                        <span>Pick start date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="bg-white"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Schedule your session for future
              </FormDescription>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        /> */}
        <Button type="submit" className="px-4 rounded-xl dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2">Submit</Button>
      </form>
    </Form>
    )
}

export default SessionForm