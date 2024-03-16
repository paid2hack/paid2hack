"use client"

import { FC, ReactNode, useMemo } from "react";
import {  useInfiniteReadContracts, useReadContract } from "wagmi";
import { Loading } from "./Loading";
import { MASTER_CONTRACT_CONFIG } from "~/contracts";
import { ErrorBox } from "./ErrorBox";
import { zeroAddress } from "viem";
import Link from "next/link";
import { useEvents, useTotalEvents } from "~/app/hooks/event";

const PER_PAGE = 10

const List: FC<{ total: number, events: any }> = ({ total, events }) => {
  const items = useMemo(() => {
    const { pages = [] } = events

    let tokenId = 1
    let ret: ReactNode[] = []

    for (let i = 0; i < pages.length && ret.length < total; i++) {
      for (let j = 0; j < pages[i].length && ret.length < total; j++) {
        if (pages[i][j].error) {
          ret.push(<li key={tokenId++}><ErrorBox>{`${pages[i][j].error}`}</ErrorBox></li>)
        } else {
          const { name, owner } = pages[i][j].result
          if (owner !== zeroAddress) {
            ret.push(
              <li className="mb-5" key={tokenId++}>
                <Link className="p-4 border-white border rounded-md" href={`/event/${tokenId}`}>{name}</Link>
              </li>
            )
          }
        }
      }
    }

    return ret
  }, [events, total])

  return <ul className="flex flex-col justify-start items-start">{items}</ul>
}

export const EventList: FC = () => {
  const totalRaw = useTotalEvents()

  const total = useMemo(() => {
    return Number(totalRaw.data || 0)
  }, [totalRaw.data])

  const events = useEvents(PER_PAGE)

  const isLoading = useMemo(() => {
    return events.isLoading || totalRaw.isLoading
  }, [events.isLoading, totalRaw.isLoading])

  const error = useMemo(() => {
    return events.error || totalRaw.error
  }, [events.error, totalRaw.error])

  return (
    <div>
      {error && <ErrorBox>Error loading events: {`${error}`}</ErrorBox>}
      {isLoading && <Loading />}
      {events.data && <List total={total} events={events.data} />}
    </div>
  )
}
