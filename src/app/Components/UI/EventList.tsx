'use client';

import { FC, ReactNode, useMemo } from 'react';
import { Loading } from './Loading';
import { ErrorBox } from './ErrorBox';
import Link from 'next/link';
import { EventInfo, useEvents, useTotalEvents } from '~/app/hooks/event';
import { Card, CardHeader, CardTitle } from './card';
import { formatEther } from 'viem';

const PER_PAGE = 10;

const List: FC<{ total: number; events: EventInfo[] }> = ({
  total,
  events,
}) => {
  const items = useMemo(() => {
    let tokenId = 1;
    let ret: ReactNode[] = [];

    for (let i = 0; i < total; i++) {
      if (events[i]) {
        const { name, totalPrizeMoney, teamIds, sponsors, owner } = events[i]!;
        const prizeMoney = formatEther(totalPrizeMoney);
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        ret.push(
          <li className="" key={tokenId++}>
            <Link className="" href={`/event/${tokenId}`}>
              <EventCard
                name={name}
                teamIds={teamIds}
                sponsors={sponsors}
                owner={owner}
                prizeMoney={prizeMoney}
                totalPrizeMoney={totalPrizeMoney}
              />
            </Link>
          </li>,
        );
      }
    }

    return ret;
  }, [events, total]);

  return (
    <div className="mx-4 my-6 flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-md">
      <Card className="rounded-none border-b border-gray-800 bg-gray-900 px-2">
        <CardHeader>
          <CardTitle className="text-gray-100">Upcoming events</CardTitle>
        </CardHeader>
      </Card>
      <ul className="divide-y divide-gray-800">{items}</ul>
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
    return events.isLoading || !events.parsedData || totalRaw.isLoading;
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

const EventCard = ({
  name,
  teamIds,
  sponsors,
  owner,
  prizeMoney,
}: EventInfo & {
  prizeMoney: string;
}) => {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <Card className="hover:shadow-slate-650 mx-4 my-4 border-2 border-slate-700 bg-slate-800 px-2 shadow-sm shadow-slate-700 transition-all duration-100 ease-in-out hover:border-2 hover:bg-slate-700 hover:shadow-md">
      <CardHeader className="ml-4 p-2">
        <CardTitle className="grid grid-cols-3 text-sm text-slate-200">
          <div>{capitalized}</div>
          <div className="text-center">{prizeMoney} tokens</div>{' '}
          <div className="flex items-end justify-end">
            <div className="w-20 rounded-lg border-2 border-green-600 bg-green-800 px-4 text-sm text-green-200">
              Verified
            </div>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
