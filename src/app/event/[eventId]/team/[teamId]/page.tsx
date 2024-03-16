"use client"

import { Button } from "~/app/Components/UI/Button"
import { CreateTeamDialog } from "~/app/Components/UI/CreateTeamDialog"
import { IfEventCreator } from "~/app/Components/UI/IfEventCreator"
import { IfWalletConnected } from "~/app/Components/UI/IfWalletConnected"
import { LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"
import { TeamList } from "~/app/Components/UI/TeamList"
import { UpdateEventNameDialog } from "~/app/Components/UI/UpdateEventNameDialog"

export default function TeamPate({ params }: { params: { eventId: number } }) {
  const { eventId } = params

  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <div>
          <h1>Event: {ev.name} (id: {eventId})</h1>
          <p>TODO: load team info and check that it belongs to event</p>
        </div>
      )}
    </LoadEventInfo>
  )
}