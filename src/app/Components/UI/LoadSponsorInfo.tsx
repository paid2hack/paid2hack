"use client"

import { FC, useMemo } from "react"
import { ErrorBox } from "./ErrorBox"
import { Loading } from "./Loading"
import { SponsorInfo, useSponsor } from "~/app/hooks/sponsor"
import { useWallet } from "~/app/hooks/wallet"
import { isSameEthereumAddress } from "~/app/lib/utils"

export const LoadSponsorInfo: FC<{ sponsorAddress: string, children: (sponsor: SponsorInfo, isSponsorOwner: boolean) => any }> = ({ children, sponsorAddress }) => {
  const wallet = useWallet()

  const sponsor = useSponsor(sponsorAddress)

  const isSponsorOwner = useMemo(() => {
    return !!isSameEthereumAddress(sponsor?.parsedData?.owner, wallet?.address)
  }, [sponsor?.parsedData?.owner, wallet?.address])

  const error = useMemo(() => sponsor.error, [sponsor.error])

  const isLoading = useMemo(() => sponsor.isLoading, [sponsor.isLoading])

  if (error) {
    return <ErrorBox>{`${error}`}</ErrorBox>
  }

  if (isLoading) {
    return <Loading />
  }

  return children(sponsor.parsedData!, isSponsorOwner)
}

