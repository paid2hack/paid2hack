"use client"

import { FC, PropsWithChildren, ReactNode, useMemo } from "react"
import { useWallet } from "~/app/hooks/wallet"
import { useReadContract } from "wagmi"
import { MASTER_CONTRACT_CONFIG } from "~/contracts"
import { ErrorBox } from "./ErrorBox"
import { isSameEthereumAddress } from "~/app/lib/utils"
import { Loading } from "./Loading"
import { useEvent } from "~/app/hooks/event"

export interface EventInfo {
  name: string
  owner: `0x${string}`
  teamIds: readonly bigint[]
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

