"use client"

import { FC, PropsWithChildren, useMemo } from "react"
import { useWallet } from "~/app/hooks/wallet"
import { isSameEthereumAddress } from "~/app/lib/utils"
import { SponsorInfo } from "~/app/hooks/sponsor"
import { LoadSponsorInfo } from "./LoadSponsorInfo"


const InnerIfSponserOwner: FC<PropsWithChildren<{ sponsor: SponsorInfo }>> = ({ sponsor, children }) => {
  const wallet = useWallet()

  const walletIsCreator = useMemo(() => {
    return isSameEthereumAddress(sponsor.owner, wallet?.address)
  }, [sponsor.owner, wallet?.address])

  return walletIsCreator ? children : null
}

/*
  This component prevents its children from rendering if the user's wallet is not the owner of the given sponsor.
*/
export const IfSponsorOwner: FC<PropsWithChildren<{ sponsorAddress: string }>> = ({ children, sponsorAddress }) => {
  return (
    <LoadSponsorInfo sponsorAddress={sponsorAddress}>
      {(sponsor) => (
        <InnerIfSponserOwner sponsor={sponsor}>{children}</InnerIfSponserOwner>
      )}
    </LoadSponsorInfo>
  )
}

