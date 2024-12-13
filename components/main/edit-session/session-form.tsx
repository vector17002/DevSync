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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { updateSession } from "@/app/(main)/session/action"
import { toast } from "react-hot-toast"

const formSchema = z.object({
   name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50, {
    message: "Name should be of max 50 characters"
  }),
  details:z.string().min(2, {
    message: "Please specify something about your project.",
  }).max(100, {
    message: "Details should be of max 100 characters"
  }), 
  githubRepo: z.string(),
  skills: z.string()
    .toLowerCase()
    .refine((val) => val.split(',').length <= 4, {
      message: "You can only specify up to 4 skills"
    })
    .refine((val) => val.split(',').every(skill => skill.trim().length > 0), {
      message: "Skills cannot be empty"
    }),
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
        // await updateSession( 
        //   //@ts-ignore
        //   session.id, values)
        //   toast.success("Edited session succesfully")
          toast.promise(
            //@ts-ignore
            updateSession(session.id, values),{
              loading: "Editing session",
              success: <p className="font-semibold text-base">Edited session succesfully</p>,
              error: <p className="font-semibold text-base">Something went wrong!!</p>
            }
          )
      }
    return(
    <Dialog>
      <DialogTrigger asChild className="hover:bg-indigo-500 hover:text-white rounded-md p-2 w-full">
        <p>Edit</p>
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
              <FormDescription>Please add up to 4 relevant skills separated with commas</FormDescription>
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
