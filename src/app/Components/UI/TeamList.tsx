"use client"

import { FC, ReactNode, useMemo } from "react";
import { ErrorBox } from "./ErrorBox";
import { useEventTeams } from "~/app/hooks/team";
import { LoadEventInfo } from "./LoadEventInfo";
import { Loading } from "./Loading";

const PER_PAGE = 10

const List: FC<{ total: number, teams: any }> = ({ total, teams }) => {
  const items = useMemo(() => {
    const { pages = [] } = teams

    let tokenId = 1
    let ret: ReactNode[] = []

    for (let i = 0; i < pages.length && ret.length < total; i++) {
      for (let j = 0; j < pages[i].length && ret.length < total; j++) {
        if (pages[i][j].error) {
          ret.push(<li key={tokenId++}><ErrorBox>{pages[i][j].error}</ErrorBox></li>)
        } else {
          console.log(pages[i][j].result)
          // const { name, owner } = pages[i][j].result
          // if (owner !== zeroAddress) {
          //   ret.push(
          //     <li className="mb-5" key={tokenId++}>
          //       <Link className="p-4 border-white border rounded-md" href={`/team/${teamId}`}>{name}</Link>
          //     </li>
          //   )
          // }
        }
      }
    }

    return ret
  }, [teams, total])

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
      {teams.data && <List total={totalTeams} teams={teams} />}
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

