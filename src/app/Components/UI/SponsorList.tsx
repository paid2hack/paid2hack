"use client"

import { FC, ReactNode, useMemo } from "react";
import { ErrorBox } from "./ErrorBox";
import { LoadEventInfo } from "./LoadEventInfo";
import { Loading } from "./Loading";
import { SponsorInfo, useSponsors } from "~/app/hooks/sponsor";
import { formatEther } from "viem";
import Link from "next/link";

const List: FC<{ eventId: number, total: number, sponsors: SponsorInfo[] }> = ({ eventId, total, sponsors }) => {
  const items = useMemo(() => {
    let ret: ReactNode[] = []

    for (let i = 0; i < total; i++) {
      if (sponsors[i]) {
        const { name, allocatedPrizeMoney, address } = sponsors[i]!

        ret.push(
          <Link key={i} className="p-4 border-white border rounded-md" href={`/event/${eventId}/sponsor/${address}`}>
            <p className="bold mr-2">{name}</p>
            <p>Prize: {formatEther(allocatedPrizeMoney)} tokens</p>
          </Link>
        )
      }
    }

    return ret
  }, [eventId, sponsors, total])

  return <ul className="flex flex-col justify-start items-start">{items}</ul>
}

const SponsorListInner: FC<{ eventId: number, sponsorAddresses: readonly string[] }> = ({ eventId, sponsorAddresses }) => {
  const totalSponsors = useMemo(() => sponsorAddresses.length, [sponsorAddresses.length])

  const sponsors = useSponsors(sponsorAddresses as string[])

  const error = useMemo(() => sponsors.error, [sponsors.error])
  const isLoading = useMemo(() => sponsors.isLoading, [sponsors.isLoading])

  return (
    <>
      {error && <ErrorBox>Error loading events: {`${error}`}</ErrorBox>}
      {isLoading && <Loading />}
      {sponsors.parsedData && <List eventId={eventId} total={totalSponsors} sponsors={sponsors.parsedData} />}
    </>
  )
}

export const SponsorList: FC<{ eventId: number }> = ({ eventId }) => {
  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <SponsorListInner eventId={eventId} sponsorAddresses={ev.sponsors} />
      )}
    </LoadEventInfo>
  )
}

