"use client"

import Link from "next/link"
import { ReactNode, useMemo } from "react"
import { formatEther } from "viem"
import { Button } from "~/app/Components/UI/Button"
import { ErrorBox } from "~/app/Components/UI/ErrorBox"
import { EventInfo, LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"
import { LoadSponsorInfo } from "~/app/Components/UI/LoadSponsorInfo"
import { LoadTeamInfo } from "~/app/Components/UI/LoadTeamInfo"
import { Loading } from "~/app/Components/UI/Loading"
import { UpdateSponsorNameDialog } from "~/app/Components/UI/UpdateSponsorNameDialog"
import { SponsorInfo, useSponsor, useSponsorPrizes } from "~/app/hooks/sponsor"
import { isSameEthereumAddress } from "~/app/lib/utils"

interface Params { event: EventInfo, sponsorAddress: string, sponsor: SponsorInfo, isSponsorOwner: boolean }

const SponsorInfo = ({ event, sponsorAddress, isSponsorOwner }: Params) => {
  const sponsor = useSponsor(sponsorAddress)
  const prizes = useSponsorPrizes(sponsorAddress, event.teamIds as bigint[])
  
  const isLoading = useMemo(() => sponsor.isLoading || prizes.isLoading, [sponsor.isLoading, prizes.isLoading])
  const error = useMemo(() => sponsor.error || prizes.error, [sponsor.error, prizes.error])

  const name = useMemo(() => sponsor.parsedData?.name, [sponsor.parsedData?.name])
  const totalPrizeMoney = useMemo(() => sponsor.parsedData?.totalPrizeMoney, [sponsor.parsedData?.totalPrizeMoney])

  const teamPrizes = useMemo(() => {
    const ret: ReactNode[] = []
    let itemIndex = 1

    if (prizes.parsedData) {
      for (let i = 0; i < event.teamIds.length; i++) {
        ret.push(
          <li key={itemIndex++}>
            <LoadTeamInfo teamId={prizes.parsedData[i]!.teamId}>
              {(team) => (
                <p>{team.name} - {formatEther(prizes.parsedData![i]!.prize)}</p>
              )}
            </LoadTeamInfo>
          </li>
          )
      }
    }

    return ret
  }, [event.teamIds.length, prizes.parsedData])

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
      {isSponsorOwner && (
        <UpdateSponsorNameDialog sponsorAddress={sponsorAddress}>
          <Button className="mb-2">Update sponsor name</Button>
        </UpdateSponsorNameDialog>
      )}
      <h2>Prizes allocated:</h2>
      <ul>
        {teamPrizes}
      </ul>
    </div>
  )
}

const SponsorInfoWrapper = (params: Params) => {
  const { event, sponsorAddress } = params
  const isSponsorForEvent = useMemo(() => !!event.sponsors.find(a => isSameEthereumAddress(a, sponsorAddress)), [event.sponsors, sponsorAddress])

  if (!isSponsorForEvent) {
    return <ErrorBox>Sponsor not found for event</ErrorBox>
  } else {
    return <SponsorInfo {...params} />
  }
}

export default function SponsorPage({ params }: { params: { eventId: string, sponsorAddress: string } }) {
  const eventId = Number(params.eventId)
  const sponsorAddress = params.sponsorAddress

  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <LoadSponsorInfo sponsorAddress={sponsorAddress}>
          {(sponsor, IfSponsorOwner) => (
            <div>
              <Link href={`/event/${eventId}`}><p className="italic text-sm">Event: {ev.name}</p></Link>
              <SponsorInfoWrapper event={ev} sponsorAddress={sponsorAddress} sponsor={sponsor} isSponsorOwner={IfSponsorOwner} />
            </div>
          )}
        </LoadSponsorInfo>
      )}
    </LoadEventInfo>
  )
}