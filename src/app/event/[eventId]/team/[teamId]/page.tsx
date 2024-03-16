"use client"

import Link from "next/link"
import { useMemo } from "react"
import { Button } from "~/app/Components/UI/Button"
import { ErrorBox } from "~/app/Components/UI/ErrorBox"
import { IfTeamLeader } from "~/app/Components/UI/IfTeamLeader"
import { EventInfo, LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"
import { LoadTeamInfo, TeamInfo } from "~/app/Components/UI/LoadTeamInfo"
import { UpdateTeamNameDialog } from "~/app/Components/UI/UpdateTeamNameDialog"

const TeamInfo = ({ event, teamId, teamInfo }: { event: EventInfo, teamId: number, teamInfo: TeamInfo }) => {
  const isTeamInEvent = useMemo(() => !!event.teamIds.find(n => Number(n) === teamId), [event.teamIds, teamId])

  if (!isTeamInEvent) {
    return <ErrorBox>Team not found in event</ErrorBox>
  }

  return (
    <div>
      <h1>Team: {teamInfo.name}</h1>
      <p>Leader: {teamInfo.leader}</p>
      <p>Members: {teamInfo.members.join(", ")}</p>
      <IfTeamLeader teamId={teamId}>
        <UpdateTeamNameDialog teamId={teamId}>
          <Button className="mb-2">Update team name</Button>
        </UpdateTeamNameDialog>
      </IfTeamLeader>
    </div>
  )
}

export default function TeamPate({ params }: { params: { eventId: number, teamId: number } }) {
  const { eventId, teamId } = params

  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <div>
          <Link href={`/event/${eventId}`}><p className="italic text-sm">Event: {ev.name}</p></Link>
          <LoadTeamInfo teamId={teamId}>
            {(team) => <TeamInfo event={ev} teamId={teamId} teamInfo={team} />}
          </LoadTeamInfo>
        </div>
      )}
    </LoadEventInfo>
  )
}