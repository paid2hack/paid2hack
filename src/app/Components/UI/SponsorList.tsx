'use client';
import { FC, ReactNode, useMemo } from 'react';
import { ErrorBox } from './ErrorBox';
import { LoadEventInfo } from './LoadEventInfo';
import { Loading } from './Loading';
import { SponsorInfo, useSponsors } from '~/app/hooks/sponsor';
import { formatEther } from 'viem';
import Link from 'next/link';

const List: FC<{ eventId: number; total: number; sponsors: SponsorInfo[] }> = ({
  eventId,
  total,
  sponsors,
}) => {
  const items = useMemo(() => {
    let ret: ReactNode[] = [];
    for (let i = 0; i < total; i++) {
      if (sponsors[i]) {
        const { name, allocatedPrizeMoney, address } = sponsors[i]!;
        ret.push(
          <Link
            key={i}
            className="block transform rounded-lg bg-gray-700 p-3 shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-gray-600 hover:shadow-lg"
            href={`/event/${eventId}/sponsor/${address}`}
          >
            <h3 className="text-lg font-semibold text-gray-100">{name}</h3>
            <p className="text-gray-300">
              Prize: {formatEther(allocatedPrizeMoney)} tokens
            </p>
          </Link>,
        );
      }
    }
    return ret;
  }, [eventId, sponsors, total]);

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items}
    </ul>
  );
};

const SponsorListInner: FC<{
  eventId: number;
  sponsorAddresses: readonly string[];
}> = ({ eventId, sponsorAddresses }) => {
  const totalSponsors = useMemo(
    () => sponsorAddresses.length,
    [sponsorAddresses.length],
  );
  const sponsors = useSponsors(sponsorAddresses as string[]);
  const error = useMemo(() => sponsors.error, [sponsors.error]);
  const isLoading = useMemo(() => sponsors.isLoading, [sponsors.isLoading]);

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-gray-100">Sponsor List</h2>
      {error && <ErrorBox>Error loading events: {`${error}`}</ErrorBox>}
      {isLoading && <Loading />}
      {sponsors.parsedData && (
        <List
          eventId={eventId}
          total={totalSponsors}
          sponsors={sponsors.parsedData}
        />
      )}
    </>
  );
};

export const SponsorList: FC<{ eventId: number }> = ({ eventId }) => {
  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <SponsorListInner eventId={eventId} sponsorAddresses={ev.sponsors} />
      )}
    </LoadEventInfo>
  );
};
