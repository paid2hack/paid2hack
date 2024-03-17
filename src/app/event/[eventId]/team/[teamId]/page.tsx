'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { formatEther, zeroAddress } from 'viem';
import { useWriteContract } from 'wagmi';
import { UpdateTeamNameDialog } from '~/app/Components/Dialogs/UpdateTeamNameDialog';
import { Button } from '~/app/Components/UI/button';
import { ErrorBox } from '~/app/Components/UI/ErrorBox';
import { LoadEventInfo } from '~/app/Components/UI/LoadEventInfo';
import { LoadTeamInfo } from '~/app/Components/UI/LoadTeamInfo';
import { Loading } from '~/app/Components/UI/Loading';
import { EventInfo } from '~/app/hooks/event';
import {
  useSponsor,
  useSponsorClaimablePrizeByWallet,
} from '~/app/hooks/sponsor';
import { TeamInfo } from '~/app/hooks/team';
import { useWallet } from '~/app/hooks/wallet';
import { isEthereumAddress, isSameEthereumAddress } from '~/app/lib/utils';
import { MASTER_CONTRACT_CONFIG, SPONSOR_CONTRACT_CONFIG } from '~/contracts';
import { env } from '~/env';

interface Params {
  eventId: number;
  event: EventInfo;
  teamId: number;
  teamInfo: TeamInfo;
  isTeamLeader: boolean;
  isTeamMember: boolean;
}

const ClaimPrize = (params: Params & { sponsorAddress: string }) => {
  const { teamId, sponsorAddress } = params;
  const { writeContractAsync } = useWriteContract();
  const wallet = useWallet();

  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState();

  const claim = useCallback(async () => {
    try {
      setUpdating(true);
      setError(undefined);

      await writeContractAsync({
        ...SPONSOR_CONTRACT_CONFIG,
        address: sponsorAddress as `0x${string}`,
        functionName: 'claimPrize',
        args: [
          BigInt(teamId),
          env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT as `0x${string}`,
          wallet!.address as `0x${string}`,
        ],
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }, [writeContractAsync, sponsorAddress, teamId, wallet]);

  return (
    <div className="mt-4">
      <Button
        onClick={claim}
        disabled={updating}
        className="rounded-md bg-[#4c8bf5] px-4 py-2 text-white hover:bg-[#3c74d6] disabled:bg-gray-500"
      >
        Claim prize
      </Button>
      {updating && <Loading />}
      {error && (
        <ErrorBox className="mt-2 rounded-md bg-red-500 p-2 text-white">{`${error}`}</ErrorBox>
      )}
    </div>
  );
};

const SponsorPrize = (params: Params & { sponsorAddress: string }) => {
  const wallet = useWallet();
  const { eventId, teamId, sponsorAddress } = params;

  const sponsor = useSponsor(sponsorAddress);
  const sponsorPrize = useSponsorClaimablePrizeByWallet(
    sponsorAddress,
    teamId,
    wallet?.address || zeroAddress,
  );

  const isLoading = useMemo(
    () => sponsor.isLoading || sponsorPrize.isLoading,
    [sponsor.isLoading, sponsorPrize.isLoading],
  );

  const error = useMemo(
    () => sponsor.error || sponsorPrize.error,
    [sponsor.error, sponsorPrize.error],
  );

  const prize = useMemo(
    () => (sponsorPrize.data ? sponsorPrize.data : null),
    [sponsorPrize.data],
  );

  return (
    <div className="mb-4 rounded-md bg-[#2c2c2c] p-4">
      {isLoading && <Loading />}
      {error && (
        <ErrorBox className="mt-2 rounded-md bg-red-500 p-2 text-white">{`${error}`}</ErrorBox>
      )}
      {sponsor.parsedData && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">{sponsor.parsedData.name}</h3>
            <Link
              href={`/event/${eventId}/sponsor/${sponsorAddress}`}
              className="text-[#4c8bf5] hover:text-[#3c74d6]"
            >
              View
            </Link>
          </div>
          {prize ? (
            <div>
              <p className="mb-2 rounded-md bg-green-500 p-2 text-white">
                You can claim: {`${formatEther(prize)}`} tokens!!
              </p>
              <ClaimPrize {...params} sponsorAddress={sponsorAddress} />
            </div>
          ) : (
            <p>You have nothing to claim.</p>
          )}
        </>
      )}
    </div>
  );
};

const AddMemberForm = ({ teamId, teamInfo }: Params) => {
  const { writeContractAsync } = useWriteContract();

  const [member, setMember] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState();

  const onChangeMember = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMember(e.target.value);
    },
    [],
  );

  const canSubmit = useMemo(() => {
    return (
      !updating &&
      isEthereumAddress(member) &&
      !teamInfo.members.find((m) => isSameEthereumAddress(m, member)) &&
      !isSameEthereumAddress(teamInfo.leader, member)
    );
  }, [member, teamInfo.leader, teamInfo.members, updating]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        setUpdating(true);
        setError(undefined);

        const newMemberList = teamInfo.members.concat(member as `0x${string}`);

        await writeContractAsync({
          ...MASTER_CONTRACT_CONFIG,
          functionName: 'updateTeamMembers',
          args: [BigInt(teamId), newMemberList],
        });

        setMember('');
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setUpdating(false);
      }
    },
    [member, teamId, teamInfo.members, writeContractAsync],
  );

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <div className="mb-4">
        <input
          className="w-full rounded-md bg-[#2c2c2c] px-4 py-2 text-black"
          type="text"
          placeholder="New team member"
          onChange={onChangeMember}
          value={member}
          max={40}
          size={40}
        />
      </div>
      <Button
        className="mb-2 rounded-md bg-[#4c8bf5] px-4 py-2 text-white hover:bg-[#3c74d6] disabled:bg-gray-500"
        type="submit"
        disabled={!canSubmit}
      >
        Add new member
      </Button>
      {error ? (
        <ErrorBox className="mt-2 rounded-md bg-red-500 p-2 text-white">
          {error}
        </ErrorBox>
      ) : null}
    </form>
  );
};

const Member = ({
  teamId,
  teamInfo,
  member,
  isTeamLeader,
}: { member: string } & Params) => {
  const { writeContractAsync } = useWriteContract();

  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState();

  const remove = useCallback(async () => {
    try {
      setUpdating(true);
      setError(undefined);

      const newMemberList = teamInfo.members.filter(
        (m) => !isSameEthereumAddress(m, member),
      );

      await writeContractAsync({
        ...MASTER_CONTRACT_CONFIG,
        functionName: 'updateTeamMembers',
        args: [BigInt(teamId), newMemberList],
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }, [member, teamInfo.members, teamId, writeContractAsync]);

  return (
    <div className="flex items-center justify-between py-2">
      <p>{member}</p>
      {isTeamLeader && (
        <div className="flex items-center">
          <Button
            onClick={remove}
            disabled={updating}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-gray-500"
          >
            Remove
          </Button>
          {updating && <Loading className="ml-2" />}
        </div>
      )}
      {error && (
        <ErrorBox className="mt-2 rounded-md bg-red-500 p-2 text-white">{`${error}`}</ErrorBox>
      )}
    </div>
  );
};

const TeamInfoInner = (params: Params) => {
  const { eventId, event, teamId, teamInfo, isTeamLeader } = params;
  const isTeamInEvent = useMemo(
    () => !!event.teamIds.find((n) => Number(n) === teamId),
    [event.teamIds, teamId],
  );

  if (!isTeamInEvent) {
    return <ErrorBox>Team not found in event</ErrorBox>;
  }

  return (
    <div>
      <div className="bg- mb-8 flex max-w-56 flex-col justify-between gap-6">
        <h1 className="text-3xl font-bold">Team: {teamInfo.name}</h1>
        {isTeamLeader && (
          <UpdateTeamNameDialog teamId={teamId}>
            <Button className="rounded-md bg-[#4c8bf5] px-4 py-2 text-white hover:bg-[#3c74d6]">
              Update team name
            </Button>
          </UpdateTeamNameDialog>
        )}
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold">Team Leader</h2>
        <p>{teamInfo.leader}</p>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold">Members</h2>
        <ul className="space-y-2">
          {teamInfo.members.map((member, i) => (
            <li key={i}>
              <Member member={member} {...params} />
            </li>
          ))}
        </ul>
        {isTeamLeader && <AddMemberForm {...params} />}
      </div>
      <div>
        <h2 className="mb-2 text-xl font-bold">Prizes to Claim</h2>
        {event.sponsors.length > 0 ? (
          event.sponsors.map((sponsorAddress, i) => (
            <SponsorPrize key={i} {...params} sponsorAddress={sponsorAddress} />
          ))
        ) : (
          <p>No prizes available to claim.</p>
        )}
      </div>
    </div>
  );
};

export default function TeamPage({
  params,
}: {
  params: { eventId: string; teamId: string };
}) {
  const eventId = Number(params.eventId);
  const teamId = Number(params.teamId);

  return (
    <div className="mx-auto min-h-screen  bg-[#1a1a1a] text-[#f0f0f0]">
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <LoadEventInfo eventId={eventId}>
          {(ev) => (
            <>
              <Link
                href={`/event/${eventId}`}
                className="mb-8 block text-sm italic text-[#4c8bf5] hover:text-[#3c74d6]"
              >
                &larr; Back to Event: {ev.name}
              </Link>
              <LoadTeamInfo teamId={teamId}>
                {(team, isTeamLeader, isTeamMember) => (
                  <TeamInfoInner
                    eventId={eventId}
                    event={ev}
                    teamId={teamId}
                    teamInfo={team}
                    isTeamLeader={isTeamLeader}
                    isTeamMember={isTeamMember}
                  />
                )}
              </LoadTeamInfo>
            </>
          )}
        </LoadEventInfo>
      </div>
    </div>
  );
}
