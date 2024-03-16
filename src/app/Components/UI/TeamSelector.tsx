"use client"

import { FC, useState, useEffect, useCallback, useMemo } from "react"
import { useEventTeams } from "~/app/hooks/team"
import { ErrorBox } from "./ErrorBox"
import { Loading } from "./Loading"
import { EventInfo } from "./LoadEventInfo"
import { cn } from "~/app/lib/utils"
import { Button } from "~/app/Components/UI/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/app/Components/UI/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/Components/UI/Popover"
import { Check, ChevronsUpDown } from "lucide-react"

export const TeamSelector: FC<{ onSelect: (teamId: number) => void, event: EventInfo, eventId: number }> = (params) => {
  const { eventId, event, onSelect } = params

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const teams = useEventTeams(eventId, 10)

  const onSelectValue = useCallback((value: string) => {
    setValue(value)
    setOpen(false)
    onSelect(Number(value))
  }, [onSelect])

  // load all teams
  useEffect(() => {
    if (teams.parsedData && !teams.isFetching && teams.parsedData.length < event.teamIds.length) {
      teams.fetchNextPage()
    }
  }, [event.teamIds.length, teams])

  const label = useMemo(() => {
    return value
        ? (teams.parsedData || []).find((d) => String(d.teamId) === value)?.info.name
        : "Select team..."
  }, [teams.parsedData, value])

  if (teams.isLoading || !teams.parsedData) {
    return <Loading />
  }

  if (teams.error) {
    return <ErrorBox>{`${teams.error}`}</ErrorBox>
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search team..." />
          <CommandList>
            <CommandEmpty>No teams found</CommandEmpty>
            <CommandGroup>
              {teams.parsedData.map((d) => (
                <CommandItem
                  key={d.teamId}
                  value={String(d.teamId)}
                  onSelect={onSelectValue}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === String(d.teamId) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {d.info.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
