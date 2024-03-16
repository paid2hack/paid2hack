"use client"

import { Button } from "~/app/Components/UI/Button"
import { CreateTeamDialog } from "~/app/Components/UI/CreateTeamDialog"
import { IfEventCreator } from "~/app/Components/UI/IfEventCreator"
import { IfWalletConnected } from "~/app/Components/UI/IfWalletConnected"
import { LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"
import { TeamList } from "~/app/Components/UI/TeamList"
import { UpdateEventNameDialog } from "~/app/Components/UI/UpdateEventNameDialog"

export default function EventPage({ params }: { params: { eventId: number } }) {
  const { eventId } = params

  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <div>
          <h1>Event: {ev.name} (id: {eventId})</h1>
          <p className="my-2">Creator: {ev.owner}</p>
          <IfEventCreator eventId={eventId}>
            <UpdateEventNameDialog eventId={eventId}>
              <Button className="mb-2">Update event name</Button>
            </UpdateEventNameDialog>
          </IfEventCreator>
          <div className="mt-10">
            <h2>Teams</h2>
            <IfWalletConnected connectButton={null}>
              <CreateTeamDialog eventId={eventId}>
                <Button className="mb-4">Create team</Button>
              </CreateTeamDialog>
              <TeamList eventId={eventId} />
            </IfWalletConnected>
          </div>
        </div>
      )}
    </LoadEventInfo>
  )
}