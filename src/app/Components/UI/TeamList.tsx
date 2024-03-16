"use client"

import { FC, ReactNode, useMemo } from "react";
import { ErrorBox } from "./ErrorBox";
import { useEventTeams } from "~/app/hooks/team";
import { LoadEventInfo } from "./LoadEventInfo";
import { Loading } from "./Loading";
import Link from "next/link";

const PER_PAGE = 10

const List: FC<{ eventId: number, total: number, teams: any }> = ({ eventId, total, teams }) => {
  const items = useMemo(() => {
    const { pages = [] } = teams

    let ret: ReactNode[] = []
    let itemIndex = 0

    for (let i = 0; i < pages.length && ret.length < total; i++) {
      for (let j = 0; j < pages[i].length && ret.length < total; j++) {
        if (pages[i][j].error) {
          ret.push(<li key={itemIndex++}><ErrorBox>{`${pages[i][j].error}`}</ErrorBox></li>)
        } else {
          const [ teamId, team ] = pages[i][j].result
          ret.push(
            <li className="mb-5" key={itemIndex++}>
              <Link className="p-4 border-white border rounded-md" href={`/event/${eventId}/team/${teamId}`}>{team.name}</Link>
            </li>
          )
        }
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
      {teams.data && <List eventId={eventId} total={totalTeams} teams={teams.data} />}
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

