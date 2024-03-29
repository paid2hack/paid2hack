'use client';

import Link from 'next/link';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { useWriteContract } from 'wagmi';
import { ErrorBox } from '~/app/Components/UI/ErrorBox';
import { LoadEventInfo } from '~/app/Components/UI/LoadEventInfo';
import { LoadSponsorInfo } from '~/app/Components/UI/LoadSponsorInfo';
import { LoadTeamInfo } from '~/app/Components/UI/LoadTeamInfo';
import { Loading } from '~/app/Components/UI/Loading';
import { TeamSelector } from '~/app/Components/UI/TeamSelector';
import { UpdateSponsorNameDialog } from '~/app/Components/UI/UpdateSponsorNameDialog';
import { Button } from '~/app/Components/UI/button';
import { EventInfo } from '~/app/hooks/event';
import { SponsorInfo, useSponsor, useSponsorPrizes } from '~/app/hooks/sponsor';
import { isSameEthereumAddress } from '~/app/lib/utils';
import { PAYMENT_TOKEN_CONTRACT_CONFIG, SPONSOR_CONTRACT_CONFIG } from '~/contracts';
import { env } from '~/env';

interface Params {
  eventId: number;
  event: EventInfo;
  sponsorAddress: string;
  sponsor: SponsorInfo;
  isSponsorOwner: boolean;
}

const AllocateForm = (params: Params) => {
  const { writeContractAsync } = useWriteContract();

  const { sponsor, sponsorAddress } = params;

  const [amount, setAmount] = useState<string>('0');
  const [team, setTeam] = useState<number>();
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState();

  const onTeamSelect = useCallback((teamId: number) => {
    setTeam(teamId);
  }, []);

  const onSetAmount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  const canSubmit = useMemo(() => {
    return (
      !updating &&
      team &&
      amount &&
      amount !== '0' &&
      !isNaN(Number(amount)) &&
      parseEther(amount) <= sponsor.unallocatablePrizeMoney
    );
  }, [amount, sponsor.unallocatablePrizeMoney, team, updating]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        setUpdating(true);
        setError(undefined);

        await writeContractAsync({
          ...SPONSOR_CONTRACT_CONFIG,
          address: sponsorAddress as `0x${string}`,
          functionName: 'allocatePrizes',
          args: [
            [env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT as `0x${string}`],
            [BigInt(team!)],
            [parseEther(amount!)],
          ],
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setUpdating(false);
      }
    },
    [amount, sponsorAddress, team, writeContractAsync],
  );

  return (
    <form className="mt-6" onSubmit={onSubmit}>
      <h2 className="mb-4 text-xl font-bold text-gray-100">Allocate prize:</h2>
      <div className="my-4">
        <TeamSelector {...params} onSelect={onTeamSelect} />
      </div>
      <div className="my-4">
        <label className="mb-2 block text-gray-300">
          Prize amount - ({formatEther(sponsor.unallocatablePrizeMoney)} tokens
          available):
        </label>
        <input
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          required
          disabled={updating}
          onChange={onSetAmount}
        />
      </div>
      <Button className="mb-4" type="submit" disabled={!canSubmit}>
        Submit
      </Button>
      {error ? <ErrorBox>{error}</ErrorBox> : null}
    </form>
  );
};

const AddFunds = (params: Params) => {
  const { sponsorAddress } = params; 

  const { writeContractAsync } = useWriteContract();

  const [ amount, setAmount] = useState<string>('0');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState();

  const onChange = useCallback((e: any) => {
    setAmount(e.target.value);
  }, []);

  const addFunds = useCallback(async (e: any) => { 
    try {
      e.preventDefault()
      setUpdating(true);
      setError(undefined);

      await writeContractAsync({
        ...PAYMENT_TOKEN_CONTRACT_CONFIG,
        functionName: 'transfer',
        args: [sponsorAddress as `0x${string}`, BigInt(parseEther(amount))],
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }, [amount, sponsorAddress, writeContractAsync]);

  return (
    <div className="mx-4">
      <h2 className="mb-4 text-xl text-gray-300">Add funds</h2>
      <form className="flex flex-col" onSubmit={addFunds}>
        <input className="text-black mb-4" type="text" placeholder="Event name" onChange={onChange} value={amount} size={30} />
        <Button className="mb-2" type="submit">Add funds</Button>
        {error ? <ErrorBox>{error}</ErrorBox> : null}
      </form>
      {error ? <ErrorBox>{error}</ErrorBox> : null}
      {updating && <Loading />}
    </div>
  )
}

const SponsorInfoInner = (params: Params) => {
  const { event, sponsorAddress, isSponsorOwner } = params;
  const sponsor = useSponsor(sponsorAddress);
  const prizes = useSponsorPrizes(sponsorAddress, event.teamIds as bigint[]);

  const isLoading = useMemo(
    () => sponsor.isLoading || prizes.isLoading,
    [sponsor.isLoading, prizes.isLoading],
  );
  const error = useMemo(
    () => sponsor.error || prizes.error,
    [sponsor.error, prizes.error],
  );

  const name = useMemo(
    () => sponsor.parsedData?.name,
    [sponsor.parsedData?.name],
  );
  const allocatedPrizeMoney = useMemo(
    () => sponsor.parsedData?.allocatedPrizeMoney,
    [sponsor.parsedData?.allocatedPrizeMoney],
  );

  const unallocatedPrizeMoney = useMemo(
    () => sponsor.parsedData?.unallocatablePrizeMoney,
    [sponsor.parsedData?.unallocatablePrizeMoney],
  );

  const teamPrizes = useMemo(() => {
    const ret: ReactNode[] = [];
    let itemIndex = 1;

    if (prizes.parsedData) {
      for (let i = 0; i < event.teamIds.length; i++) {
        if (prizes.parsedData[i]?.teamId) {
          ret.push(
            <li key={itemIndex++} className="mb-2">
              <LoadTeamInfo teamId={prizes.parsedData[i]!.teamId}>
                {(team) => (
                  <p className="text-gray-300">
                    {team.name} - {formatEther(prizes.parsedData![i]!.amount)}{' '}
                    tokens ({formatEther(prizes.parsedData![i]!.claimed)} claimed)
                  </p>
                )}
              </LoadTeamInfo>
            </li>,
          );
        }
      }
    }

    return ret;
  }, [event.teamIds.length, prizes.parsedData]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox>{`${error}`}</ErrorBox>;
  }

  return (
    <div className="rounded-lg bg-gray-900 p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-gray-100">Name: {name}</h1>
      <AddFunds {...params} />
      <h2 className="mb-4 text-xl text-gray-300">
        Allocated / total prize money: {formatEther(allocatedPrizeMoney || 0n)} / {formatEther(unallocatedPrizeMoney || 0n)}
      </h2>
      {isSponsorOwner && (
        <UpdateSponsorNameDialog sponsorAddress={sponsorAddress}>
          <Button className="mb-4">Update sponsor name</Button>
        </UpdateSponsorNameDialog>
      )}
      <h2 className="mb-2 text-xl font-bold text-gray-100">
        Prizes allocated:
      </h2>
      <ul className="mb-6 space-y-2">{teamPrizes}</ul>
      {isSponsorOwner && <AllocateForm {...params} />}
    </div>
  );
};

const SponsorInfoWrapper = (params: Params) => {
  const { event, sponsorAddress } = params;
  const isSponsorForEvent = useMemo(
    () =>
      !!event.sponsors.find((a) => isSameEthereumAddress(a, sponsorAddress)),
    [event.sponsors, sponsorAddress],
  );

  if (!isSponsorForEvent) {
    return <ErrorBox>Sponsor not found for event</ErrorBox>;
  } else {
    return <SponsorInfoInner {...params} />;
  }
};

export default function SponsorPage({
  params,
}: {
  params: { eventId: string; sponsorAddress: string };
}) {
  const eventId = Number(params.eventId);
  const sponsorAddress = params.sponsorAddress;

  return (
    <div className="min-h-screen bg-gray-900 px-8 py-10">
      <LoadEventInfo eventId={eventId}>
        {(ev) => (
          <LoadSponsorInfo sponsorAddress={sponsorAddress}>
            {(sponsor, IfSponsorOwner) => (
              <div>
                <Link
                  href={`/event/${eventId}`}
                  className="mb-8 block text-sm italic text-[#4c8bf5] hover:text-[#3c74d6]"
                >
                  &larr; Back to Event: {ev.name}
                </Link>
                <SponsorInfoWrapper
                  eventId={eventId}
                  event={ev}
                  sponsorAddress={sponsorAddress}
                  sponsor={sponsor}
                  isSponsorOwner={IfSponsorOwner}
                />
              </div>
            )}
          </LoadSponsorInfo>
        )}
      </LoadEventInfo>
    </div>
  );
}


