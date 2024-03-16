"use client"

import { Button } from "~/app/Components/UI/Button"
import { CreateSponsorDialog } from "~/app/Components/UI/CreateSponsorDialog"
import { CreateTeamDialog } from "~/app/Components/Dialogs/CreateTeamDialog"
import { IfWalletConnected } from "~/app/Components/UI/IfWalletConnected"
import { LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"
import { SponsorList } from "~/app/Components/UI/SponsorList"
import { TeamList } from "~/app/Components/UI/TeamList"
import { UpdateEventNameDialog } from "~/app/Components/Dialogs/UpdateEventNameDialog"

export default function EventPage({ params }: { params: { eventId: string } }) {
  const eventId = Number(params.eventId)

  return (
    <LoadEventInfo eventId={eventId}>
      {(ev, isEventCreator) => (
        <div>
          <h1>Event: {ev.name} (id: {eventId})</h1>
          <p className="my-2">Creator: {ev.owner}</p>
          {isEventCreator && (
            <UpdateEventNameDialog eventId={eventId}>
              <Button className="mb-2">Update event name</Button>
            </UpdateEventNameDialog>
          )}
          <div className="mt-10">
            <h2>Teams</h2>
            <IfWalletConnected connectButton={null}>
              <CreateTeamDialog eventId={eventId}>
                <Button className="mb-4">Create team</Button>
              </CreateTeamDialog>
              <TeamList eventId={eventId} />
            </IfWalletConnected>
          </div>
          <div className="mt-10">
            <h2>Sponsors</h2>
            <IfWalletConnected connectButton={null}>
              <CreateSponsorDialog eventId={eventId}>
                <Button className="mb-4">Become a sponsor</Button>
              </CreateSponsorDialog>
              <SponsorList eventId={eventId} />
            </IfWalletConnected>
          </div>
        </div>
      )}
    </LoadEventInfo>
  )
}