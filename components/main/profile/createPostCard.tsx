"use client"
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
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
// import { createPostAction } from "@/app/(main)/post/action"
import toast from "react-hot-toast"
import { PlusCircleIcon } from "lucide-react"

// Define the form schema based on the postTable schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }).max(255, {
    message: "Title should be of max 255 characters"
  }),
  content: z.string().min(10, {
    message: "Please provide meaningful content for your post.",
  }),
  category: z.enum(["bug", "blog", "project-pitch"], {
    message: "Category must be one of 'bug', 'blog', or 'project-pitch'."
  }),
})

const CreatePostCard = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "bug", // Default category
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await toast.promise(
      //@ts-ignore
      createPostAction(values), {
      loading: "Creating post",
      success: <p className="font-semibold text-base">Post created successfully</p>,
      error: <p className="font-semibold text-base">Something went wrong!! <br /> Unable to create post</p>
    }
    )
    router.refresh()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700">
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-300">Create New Post</p>
          <PlusCircleIcon className="w-10 h-10 text-gray-500 dark:text-gray-300" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white dark:bg-black dark:border-zinc-700">
        <DialogHeader className="items-center">
          <DialogTitle className="text-xl">Create Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Title</FormLabel>
                  <FormControl className="text-slate-500 dark:text-slate-300">
                    <Input placeholder="Title of your post" {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Content</FormLabel>
                  <FormControl className="text-slate-500 dark:text-slate-300">
                    <Input placeholder="Content" {...field} className="rounded-xl" />
                  </FormControl>
                  <FormDescription>Please provide meaningful content for your post.</FormDescription>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Category</FormLabel>
                  <FormControl className="text-slate-500 dark:text-slate-300">
                    <select {...field} className="rounded-xl">
                      <option value="bug">Bug</option>
                      <option value="blog">Blog</option>
                      <option value="project-pitch">Project Pitch</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg">
                Create Post
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-700">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePostCard