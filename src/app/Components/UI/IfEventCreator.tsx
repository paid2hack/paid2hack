"use client"

import { FC, PropsWithChildren, useMemo } from "react"
import { useWallet } from "~/app/hooks/wallet"
import { isSameEthereumAddress } from "~/app/lib/utils"
import { EventInfo, LoadEventInfo } from "./LoadEventInfo"


const InnerIfEventCreator: FC<PropsWithChildren<{ event: EventInfo }>> = ({ event, children }) => {
  const wallet = useWallet()

  const walletIsCreator = useMemo(() => {
    return isSameEthereumAddress(event.owner, wallet?.address)
  }, [event.owner, wallet?.address])

  return walletIsCreator ? children : null
}

/*
  This component prevents its children from rendering if the user's wallet is not the creator of the given event.
*/
export const IfEventCreator: FC<PropsWithChildren<{ eventId: number }>> = ({ children, eventId }) => {
  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <InnerIfEventCreator event={ev}>{children}</InnerIfEventCreator>
      )}
    </LoadEventInfo>
  )
}

