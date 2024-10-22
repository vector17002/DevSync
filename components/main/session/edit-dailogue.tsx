import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Edit } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"

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
   skills: z.string()
 })

export function EditDialogue({sessionId} : {sessionId: string}) {
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
        
        router.push('/debugcohort')
      }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl"> <Edit className="w-4 h-4"/> </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] bg-white dark:bg-black rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">Edit Session</DialogTitle>
          <DialogDescription>
            Make changes to your session here. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white dark:bg-black w-full h-full space-y-5">
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
        <DialogFooter>
        <Button type="submit" className="px-4 rounded-xl dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2">Submit</Button>
        </DialogFooter>
      </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
