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
import { Input } from "@/components/ui/input"
import { updateSession } from "@/app/(main)/edit-session/action"
import { Edit } from "lucide-react"

const formSchema = z.object({
   name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50, {
    message: "Name should be of max 50 characters"
  }),
  details:z.string().min(2, {
    message: "Please specify something about your project.",
  }).max(80, {
    message: "Details should be of max 100 characters"
  }), 
  githubRepo: z.string(),
  skills: z.string(),
})
 const SessionForm = ({session} : {session : any}) => {   
     const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: `${session.name}`,
        details: `${session.details}`,
        githubRepo: `${session.githubRepo}`,
        skills: `${session.skills}`
      },
    })
      async function onSubmit(values: z.infer<typeof formSchema>)  {
        await updateSession( 
          //@ts-ignore
          session.id, values)
      }
    return(
    <Dialog>
      <DialogTrigger asChild>
       <Button size="icon" variant="outline"> <Edit className="w-4 h-4"/> </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-xl bg-white dark:bg-black">
     <DialogHeader className="items-center">
          <DialogTitle className="text-xl">Edit session</DialogTitle>
        </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Name</FormLabel>
              <FormControl className="text-neutral-600 dark:text-neutral-300">
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
              <FormControl className="text-neutral-600 dark:text-neutral-300">
                <Input placeholder="Description" {...field} className="rounded-xl"/>
              </FormControl>
              <FormDescription>Please give a precise short description of your project</FormDescription>
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
              <FormControl className="text-neutral-600 dark:text-neutral-300">
                <Input placeholder="Github Repository url" {...field} className="rounded-xl" />
              </FormControl>
              <FormDescription>Please provide github repository url</FormDescription>
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
              <FormControl className="text-neutral-600 dark:text-neutral-300">
                <Input placeholder="Tags" {...field} className="rounded-xl" />
              </FormControl>
              <FormDescription>Please add relevant skills seperated with commas</FormDescription>
              <FormMessage className="text-rose-400"/>
            </FormItem>
          )}
        />
       
      </form>
    </Form>
    <DialogFooter className="sm:justify-start">
          <Button type="button" className="px-4 rounded-xl dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2" onClick={form.handleSubmit(onSubmit)}>
          <DialogClose>
              Update
          </DialogClose>
          </Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
    )
}

export default SessionForm
