"use client"

import { FC, useMemo } from "react"
import { ErrorBox } from "./ErrorBox"
import { Loading } from "./Loading"
import { SponsorInfo, useSponsor } from "~/app/hooks/sponsor"

export const LoadSponsorInfo: FC<{ sponsorAddress: string, children: (sponsor: SponsorInfo) => any }> = ({ children, sponsorAddress }) => {
  const sponsor = useSponsor(sponsorAddress)

  const error = useMemo(() => sponsor.error, [sponsor.error])

  const isLoading = useMemo(() => sponsor.isLoading, [sponsor.isLoading])

  if (error) {
    return <ErrorBox>{`${error}`}</ErrorBox>
  }

  if (isLoading) {
    return <Loading />
  }

  return children(sponsor.parsedData!)
}

