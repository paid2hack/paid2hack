"use client"

import { FC, ReactNode, useMemo } from "react";
import { ErrorBox } from "./ErrorBox";
import { LoadEventInfo } from "./LoadEventInfo";
import { Loading } from "./Loading";
import { useGetSponsorsAndPrizeMoney } from "~/app/hooks/sponsor";
import { formatEther } from "viem";

const List: FC<{ eventId: number, total: number, sponsors: any }> = ({ eventId, total, sponsors }) => {
  const items = useMemo(() => {
    let ret: ReactNode[] = []
    let itemIndex = 0

    for (let i = 0; i < total * 2; i += 2) {
      const name = sponsors[i]
      const prize = sponsors[i + 1]

      if (name.error || prize.error) {
        ret.push(<li key={itemIndex++}><ErrorBox>Error loading sponsor: {`${name.error || prize.error}`}</ErrorBox></li>)
      } else {
        ret.push(
          <li key={itemIndex++}>
            <p className="bold mr-2">{name.result}</p>
            <p>Prize: {formatEther(prize.result)} tokens</p>
          </li>
        )
      }
    }

    return ret
  }, [sponsors, total])

  return <ul className="flex flex-col justify-start items-start">{items}</ul>
}

const SponsorListInner: FC<{ eventId: number, sponsorAddresses: readonly string[] }> = ({ eventId, sponsorAddresses }) => {
  const totalSponsors = useMemo(() => sponsorAddresses.length, [sponsorAddresses.length])

  const sponsors = useGetSponsorsAndPrizeMoney(sponsorAddresses as string[])

  const error = useMemo(() => sponsors.error, [sponsors.error])
  const isLoading = useMemo(() => sponsors.isLoading, [sponsors.isLoading])

  return (
    <>
      {error && <ErrorBox>Error loading events: {`${error}`}</ErrorBox>}
      {isLoading && <Loading />}
      {sponsors.data && <List eventId={eventId} total={totalSponsors} sponsors={sponsors.data} />}
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

