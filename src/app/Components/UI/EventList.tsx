'use client';

import { FC, ReactNode, useMemo } from 'react';
import { Loading } from './Loading';
import { ErrorBox } from './ErrorBox';
import Link from 'next/link';
import { EventInfo, useEvents, useTotalEvents } from '~/app/hooks/event';
import { Card, CardHeader, CardTitle } from './card';
import { formatEther } from 'viem';

const PER_PAGE = 10;

const List: FC<{ total: number; events: EventInfo[] }> = ({ total, events }) => {
  const items = useMemo(() => {
    let tokenId = 1;
    let ret: ReactNode[] = [];

    for (let i = 0; i < total; i++ ) {
      if (events[i]) {
        const { name, totalPrizeMoney } = events[i]!
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        ret.push(
          <li className="" key={tokenId++}>
            <Link className="" href={`/event/${tokenId}`}>
              <Card
                className=" mx-2 my-2 border-b-2 border-background/80 bg-background/80 px-2 shadow-sm
              transition-all duration-100 ease-in-out  hover:border hover:bg-background/40 hover:shadow-md"
              >
                <CardHeader className="ml-4  p-2">
                  <CardTitle className="grid grid-cols-3  text-sm ">
                    <div>{capitalized}</div> <div>{formatEther(totalPrizeMoney)} tokens</div>{' '}
                    <div className="flex w-full items-end justify-end">
                      <div className="w-20 rounded-lg border-2 border-green-900 bg-green-950/40 px-4 text-sm  text-slate-300">
                        Verified
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </li>,
        );
      }
    }

    return ret;
  }, [events, total]);

  return (
    <div className="mx-4 my-6 flex-col border-b-4  bg-slate-800/70 ">
      <Card className="rounded-b-none border-b-2 border-b-[hsl(280,100%,70%)]/70  px-2">
        <CardHeader className="">
          <CardTitle>Upcoming events</CardTitle>
        </CardHeader>
      </Card>
      <ul className="">{items}</ul>
    </div>
  );
};

export const EventList: FC = () => {
  const totalRaw = useTotalEvents();

  const total = useMemo(() => {
    return Number(totalRaw.data || 0);
  }, [totalRaw.data]);

  const events = useEvents(PER_PAGE);

  const isLoading = useMemo(() => {
    return events.isLoading || !events.parsedData  || totalRaw.isLoading;
  }, [events.isLoading, events.parsedData, totalRaw.isLoading]);

  const error = useMemo(() => {
    return events.error || totalRaw.error;
  }, [events.error, totalRaw.error]);

  return (
    <div>
      {error && <ErrorBox>Error loading events: {`${error}`}</ErrorBox>}
      {isLoading && <Loading />}
      {events.parsedData && <List total={total} events={events.parsedData} />}
    </div>
  );
};
