"use client"

import { FC, ReactNode, useMemo } from "react";
import {  useInfiniteReadContracts, useReadContract } from "wagmi";
import { Loading } from "./Loading";
import { MASTER_CONTRACT_CONFIG } from "~/contracts";
import { ErrorBox } from "./ErrorBox";
import { zeroAddress } from "viem";

const PER_PAGE = 10

const List: FC<{ totalEvents: number, events: any }> = ({ totalEvents, events }) => {
  const items = useMemo(() => {
    const { pages = [] } = events

    let tokenId = 1
    let ret: ReactNode[] = []

    for (let i = 0; i < pages.length && ret.length < totalEvents; i++) {
      for (let j = 0; j < pages[i].length && ret.length < totalEvents; j++) {
        if (pages[i][j].error) {
          ret.push(<li key={tokenId++}><ErrorBox>{pages[i][j].error}</ErrorBox></li>)
        } else {
          const { name, owner } = pages[i][j].result
          if (owner !== zeroAddress) {
            ret.push(<li className="p-4 border-white border mb-5 rounded-md" key={tokenId++}>{name}</li>)
          }
        }
      }
    }

    return ret
  }, [events, totalEvents])

  return <ul className="flex flex-col justify-start items-start">{items}</ul>
}

export const EventList: FC = () => {
  const totalEventsRaw = useReadContract({
    ...MASTER_CONTRACT_CONFIG,
    functionName: 'totalEvents',
    args: [],
    query: {
      refetchInterval: 5000,
    }
  })

  const totalEvents = useMemo(() => {
    return Number(totalEventsRaw.data || 0)
  }, [totalEventsRaw.data])

  const events = useInfiniteReadContracts({
    cacheKey: 'events',
    contracts(pageParam) {
      return [...new Array(PER_PAGE)].map((_, i) => (
        {
          ...MASTER_CONTRACT_CONFIG,
          functionName: 'getEvent',
          args: [pageParam + i],
          watch: true,
        }
      ))
    },
    query: {
      initialPageParam: 1,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + PER_PAGE
      },
      refetchInterval: 5000,
    },
  })

  return (
    <div>
      {events.error && <ErrorBox>Error loading events: {`${events.error}`}</ErrorBox>}
      {events.isLoading && <Loading />}
      {events.data && <List totalEvents={totalEvents} events={events.data} />}
    </div>
  )
}
