"use client"

import { FC, useMemo } from "react"
import { ErrorBox } from "./ErrorBox"
import { Loading } from "./Loading"
import { useEvent } from "~/app/hooks/event"
import { useWallet } from "~/app/hooks/wallet"
import { isSameEthereumAddress } from "~/app/lib/utils"

export interface EventInfo {
  name: string
  owner: `0x${string}`
  teamIds: readonly bigint[]
  sponsors: readonly string[]
}

/**
 * Load event info and render children once done.
 */
export const LoadEventInfo: FC<{ eventId: number, children: (ev: EventInfo, isEventCreator: boolean) => any }> = ({ children, eventId }) => {
  const wallet = useWallet()

  const event = useEvent(eventId)

  const isEventCreator = useMemo(() => {
    return !!isSameEthereumAddress(event?.data?.owner, wallet?.address)
  }, [event?.data?.owner, wallet?.address])

  if (event.error) {
    return <ErrorBox>{`${event.error}`}</ErrorBox>
  }

  if (event.isLoading) {
    return <Loading />
  }

  return children(event.data!, isEventCreator)
}

