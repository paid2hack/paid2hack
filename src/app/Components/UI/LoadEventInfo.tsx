"use client"

import { FC } from "react"
import { ErrorBox } from "./ErrorBox"
import { Loading } from "./Loading"
import { useEvent } from "~/app/hooks/event"

export interface EventInfo {
  name: string
  owner: `0x${string}`
  teamIds: readonly bigint[]
  sponsors: readonly string[]
}

/**
 * Load event info and render children once done.
 */
export const LoadEventInfo: FC<{ eventId: number, children: (ev: EventInfo) => any }> = ({ children, eventId }) => {
  const event = useEvent(eventId)

  if (event.error) {
    return <ErrorBox>{`${event.error}`}</ErrorBox>
  }

  if (event.isLoading) {
    return <Loading />
  }

  return children(event.data!)
}

