"use client"

import { FC, useMemo } from "react"
import { ErrorBox } from "./ErrorBox"
import { Loading } from "./Loading"
import { TeamInfo, useTeam } from "~/app/hooks/team"
import { useWallet } from "~/app/hooks/wallet"
import { isSameEthereumAddress } from "~/app/lib/utils"


export const LoadTeamInfo: FC<{ teamId: number, children: (team: TeamInfo, isTeamLeader: boolean, isTeamMember: boolean) => any }> = ({ children, teamId }) => {
  const wallet = useWallet()

  const team = useTeam(teamId)

  const isTeamLeader = useMemo(() => {
    return !!isSameEthereumAddress(team?.data?.leader, wallet?.address)
  }, [team?.data?.leader, wallet?.address])

  const isTeamMember = useMemo(() => {
    return isTeamLeader || !!team?.data?.members.find((m) => isSameEthereumAddress(m, wallet?.address))
  }, [isTeamLeader, team?.data?.members, wallet?.address])

  const error = useMemo(() => team.error, [team.error])

  const isLoading = useMemo(() => team.isLoading, [team.isLoading])

  if (error) {
    return <ErrorBox>{`${error}`}</ErrorBox>
  }

  if (isLoading) {
    return <Loading />
  }

  return children(team.data!, isTeamLeader, isTeamMember)
}

