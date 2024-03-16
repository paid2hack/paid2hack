"use client"

import { FC, ReactNode, useMemo } from "react";
import { ErrorBox } from "./ErrorBox";
import { TeamIdTeamInfo, useEventTeams } from "~/app/hooks/team";
import { LoadEventInfo } from "./LoadEventInfo";
import { Loading } from "./Loading";
import Link from "next/link";

const PER_PAGE = 10

const List: FC<{ eventId: number, total: number, teams: TeamIdTeamInfo[] }> = ({ eventId, total, teams }) => {
  const items = useMemo(() => {
    let ret: ReactNode[] = []
    let itemIndex = 0

    for (let i = 0; i < total; i++) {
      if (teams[i]) {
        const { teamId, info } = teams[i]!

        ret.push(
          <li className="mb-5" key={itemIndex++}>
            <Link className="p-4 border-white border rounded-md" href={`/event/${eventId}/team/${teamId}`}>{info.name}</Link>
          </li>
        )
      }
    }

    return ret
  }, [eventId, teams, total])

  return <ul className="flex flex-col justify-start items-start">{items}</ul>
}

const TeamListInner: FC<{ eventId: number, teamIds: readonly bigint[] }> = ({ eventId, teamIds }) => {
  const totalTeams = useMemo(() => {
    return Number(teamIds.length)
  }, [teamIds.length])

  const teams = useEventTeams(eventId, PER_PAGE)

  const error = useMemo(() => teams.error, [teams.error])
  const isLoading = useMemo(() => teams.isLoading, [teams.isLoading])

  return (
    <>
      {error && <ErrorBox>Error loading events: {`${error}`}</ErrorBox>}
      {isLoading && <Loading />}
      {teams.parsedData && <List eventId={eventId} total={totalTeams} teams={teams.parsedData} />}
    </>
  )
}

export const TeamList: FC<{ eventId: number }> = ({ eventId }) => {
  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <TeamListInner eventId={eventId} teamIds={ev.teamIds} />
      )}
    </LoadEventInfo>
  )
}

