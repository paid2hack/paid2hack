"use client"

import { FC, PropsWithChildren, useMemo } from "react"
import { useWallet } from "~/app/hooks/wallet"
import { isSameEthereumAddress } from "~/app/lib/utils"
import { LoadTeamInfo, TeamInfo } from "./LoadTeamInfo"


const InnerIfTeamLeader: FC<PropsWithChildren<{ team: TeamInfo }>> = ({ team, children }) => {
  const wallet = useWallet()

  const walletIsCreator = useMemo(() => {
    return isSameEthereumAddress(team.leader, wallet?.address)
  }, [team.leader, wallet?.address])

  return walletIsCreator ? children : null
}

/*
  This component prevents its children from rendering if the user's wallet is not the leader of the given team.
*/
export const IfTeamLeader: FC<PropsWithChildren<{ teamId: number }>> = ({ children, teamId }) => {
  return (
    <LoadTeamInfo teamId={teamId}>
      {(team) => (
        <InnerIfTeamLeader team={team}>{children}</InnerIfTeamLeader>
      )}
    </LoadTeamInfo>
  )
}

