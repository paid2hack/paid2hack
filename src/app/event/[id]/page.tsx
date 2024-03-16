"use client"

import { Button } from "~/app/Components/UI/Button"
import { CreateTeamDialog } from "~/app/Components/UI/CreateTeamDialog"
import { IfEventCreator } from "~/app/Components/UI/IfEventCreator"
import { IfWalletConnected } from "~/app/Components/UI/IfWalletConnected"
import { LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"
import { UpdateEventNameDialog } from "~/app/Components/UI/UpdateEventNameDialog"

export default function EventPage({ params }: { params: { id: number } }) {
  const { id } = params

  return (
    <LoadEventInfo eventId={id}>
      {(ev) => (
        <div>
          <h1>Event: {ev.name} (id: {id})</h1>
          <p className="my-2">Creator: {ev.owner}</p>
          <IfEventCreator eventId={id}>
            <UpdateEventNameDialog eventId={id}>
              <Button className="mb-2">Update event name</Button>
            </UpdateEventNameDialog>
          </IfEventCreator>
          <div className="mt-10">
            <IfWalletConnected connectButton={null}>
              <CreateTeamDialog eventId={id}>
                <Button>Create team</Button>
              </CreateTeamDialog>
            </IfWalletConnected>
          </div>
        </div>
      )}
    </LoadEventInfo>
  )
}