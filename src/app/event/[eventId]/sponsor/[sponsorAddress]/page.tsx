"use client"

import Link from "next/link"
import { ReactNode, useMemo } from "react"
import { formatEther } from "viem"
import { Button } from "~/app/Components/UI/Button"
import { ErrorBox } from "~/app/Components/UI/ErrorBox"
import { IfSponsorOwner } from "~/app/Components/UI/IfSponsorOwner"
import { EventInfo, LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"
import { Loading } from "~/app/Components/UI/Loading"
import { UpdateSponsorNameDialog } from "~/app/Components/UI/UpdateSponsorNameDialog"
import { useSponsor, useSponsorPrizes } from "~/app/hooks/sponsor"
import { isSameEthereumAddress } from "~/app/lib/utils"

const SponsorInfo = ({ event, sponsorAddress }: { event: EventInfo, sponsorAddress: string }) => {
  const sponsor = useSponsor(sponsorAddress)
  const prizes = useSponsorPrizes(sponsorAddress, event.teamIds as bigint[])
  
  const isLoading = useMemo(() => sponsor.isLoading || prizes.isLoading, [sponsor.isLoading, prizes.isLoading])
  const error = useMemo(() => sponsor.error || prizes.error, [sponsor.error, prizes.error])

  const name = useMemo(() => sponsor.parsedData?.name, [sponsor.parsedData?.name])
  const totalPrizeMoney = useMemo(() => sponsor.parsedData?.totalPrizeMoney, [sponsor.parsedData?.totalPrizeMoney])

  const teamPrizes = useMemo(() => {
    const ret: ReactNode[] = []
    let itemIndex = 1

    if (prizes.data) {
      for (let i = 0; i < event.teamIds.length; i++) {
        if (prizes.data[i]?.error) {
          ret.push(<li key={itemIndex++}>
            <ErrorBox>{`${prizes.data[i]!.error}`}</ErrorBox>
          </li>)
        } else if (prizes.data[i]?.result) {
          ret.push(<li key={itemIndex++}>{formatEther(BigInt(prizes.data[i]!.result!))}</li>)
        }
      }
    }

    return ret
  }, [event.teamIds.length, prizes.data])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorBox>{`${error}`}</ErrorBox>
  }

  return (
    <div>
      <h1>Name: {name}</h1>
      <h2>Total prize money: {formatEther(totalPrizeMoney || 0n)}</h2>
      <IfSponsorOwner sponsorAddress={sponsorAddress}>
        <UpdateSponsorNameDialog sponsorAddress={sponsorAddress}>
          <Button className="mb-2">Update sponsor name</Button>
        </UpdateSponsorNameDialog>
      </IfSponsorOwner>
      <h2>Prizes allocated:</h2>
      <ul>
        {teamPrizes}
      </ul>
    </div>
  )
}

const SponsorInfoWrapper = ({ event, sponsorAddress }: { event: EventInfo, sponsorAddress: string }) => {
  const isSponsorForEvent = useMemo(() => !!event.sponsors.find(a => isSameEthereumAddress(a, sponsorAddress)), [event.sponsors, sponsorAddress])

  if (!isSponsorForEvent) {
    return <ErrorBox>Sponsor not found for event</ErrorBox>
  } else {
    return <SponsorInfo event={event} sponsorAddress={sponsorAddress} />
  }
}

export default function SponsorPage({ params }: { params: { eventId: string, sponsorAddress: string } }) {
  const eventId = Number(params.eventId)
  const sponsorAddress = params.sponsorAddress

  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <div>
          <Link href={`/event/${eventId}`}><p className="italic text-sm">Event: {ev.name}</p></Link>
          <SponsorInfoWrapper event={ev} sponsorAddress={sponsorAddress} />
        </div>
      )}
    </LoadEventInfo>
  )
}