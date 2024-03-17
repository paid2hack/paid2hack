'use client';
import { FC, ReactNode, useMemo } from 'react';
import { ErrorBox } from './ErrorBox';
import { TeamIdTeamInfo, useEventTeams } from '~/app/hooks/team';
import { LoadEventInfo } from './LoadEventInfo';
import { Loading } from './Loading';
import Link from 'next/link';

const PER_PAGE = 10;

const List: FC<{ eventId: number; total: number; teams: TeamIdTeamInfo[] }> = ({
  eventId,
  total,
  teams,
}) => {
  const items = useMemo(() => {
    let ret: ReactNode[] = [];
    let itemIndex = 0;
    for (let i = 0; i < total; i++) {
      if (teams[i]) {
        const { teamId, info } = teams[i]!;
        ret.push(
          <li className="" key={itemIndex++}>
            <Link
              className="block transform rounded-lg bg-gray-700 p-3 shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-gray-600 hover:shadow-lg"
              href={`/event/${eventId}/team/${teamId}`}
            >
              <h3 className="text-lg font-semibold text-gray-100">
                {info.name}
              </h3>
              <p className="text-sm text-gray-300">Team ID: {teamId}</p>
            </Link>
          </li>,
        );
      }
    }
    return ret;
  }, [eventId, teams, total]);

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items}
    </ul>
  );
};

const TeamListInner: FC<{ eventId: number; teamIds: readonly bigint[] }> = ({
  eventId,
  teamIds,
}) => {
  const totalTeams = useMemo(() => {
    return Number(teamIds.length);
  }, [teamIds.length]);

  const teams = useEventTeams(eventId, PER_PAGE);
  const error = useMemo(() => teams.error, [teams.error]);
  const isLoading = useMemo(() => teams.isLoading, [teams.isLoading]);

  return (
    <div className="w-full">
      <h2 className="mb-6 w-full text-2xl font-bold text-gray-100">
        Team List
      </h2>
      {error && <ErrorBox>Error loading events: {`${error}`}</ErrorBox>}
      {isLoading && <Loading />}
      {teams.parsedData && (
        <List eventId={eventId} total={totalTeams} teams={teams.parsedData} />
      )}
    </div>
  );
};

export const TeamList: FC<{ eventId: number }> = ({ eventId }) => {
  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => <TeamListInner eventId={eventId} teamIds={ev.teamIds} />}
    </LoadEventInfo>
  );
};
