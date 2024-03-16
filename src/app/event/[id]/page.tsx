"use client"

import { Button } from "~/app/Components/UI/Button"
import { IfEventCreator } from "~/app/Components/UI/IfEventCreator"
import { LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"
import { UpdateEventNameDialog } from "~/app/Components/UI/UpdateEventNameDialog"

export default function EventPage({ params }: { params: { id: number } }) {
  const { id } = params

  return (
    <LoadEventInfo eventId={id}>
      {(ev) => (
        <div>
          <h1>Event: {ev.name}</h1>
          <IfEventCreator eventId={id}>
            <UpdateEventNameDialog eventId={id}>
              <Button className="mb-2">Update event name</Button>
            </UpdateEventNameDialog>
          </IfEventCreator>
        </div>
      )}
    </LoadEventInfo>
  )
}