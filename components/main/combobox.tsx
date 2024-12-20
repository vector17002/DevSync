"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { setStatusForSession } from "@/app/(main)/session/[sessionId]/action"
import toast from "react-hot-toast"

const frameworks = [
  {
    value: "on-going",
    label: "Live",
  },
  {
    value: "compeleted",
    label: "Done",
  },
  {
    value: "not-completed",
    label: "Pause",
  },
]

export function ComboboxDemo({sessionId , currStatus} : {sessionId: string , currStatus: string }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(currStatus)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full"
        >
          {currStatus ? frameworks.find((f) => f.value === currStatus)?.label : "Set Status"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max p-0 bg-white dark:bg-black dark:border-zinc-700">
        <Command>
          <CommandInput placeholder="Search status" />
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={async (currentValue) => {
                   toast.promise(
                    //@ts-ignore
                    setStatusForSession(sessionId , currentValue),
                    {
                      loading: "Changing status",
                      success: <p className="font-semibold text-base">Status changed</p>,
                      error: <p>Something went wrong!!</p>
                    }
                   )
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
