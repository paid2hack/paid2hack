"use client"

import { FC, useMemo } from "react"
import { ErrorBox } from "./ErrorBox"
import { Loading } from "./Loading"
import { EventInfo } from "./LoadEventInfo"
import { useTeam } from "~/app/hooks/team"

export interface TeamInfo {
  name: string
  leader: `0x${string}`
  members: readonly `0x${string}`[]
}

export const LoadTeamInfo: FC<{ teamId: number, children: (team: TeamInfo) => any }> = ({ children, teamId }) => {
  const team = useTeam(teamId)

  const error = useMemo(() => team.error, [team.error])

  const isLoading = useMemo(() => team.isLoading, [team.isLoading])

  if (error) {
    return <ErrorBox>{`${error}`}</ErrorBox>
  }

  if (isLoading) {
    return <Loading />
  }

  return children(team.data!)
}

