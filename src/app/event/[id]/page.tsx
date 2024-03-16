"use client"

import { IfEventCreator } from "~/app/Components/UI/IfEventCreator"
import { LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"

export default function EventPage({ params }: { params: { id: number } }) {
  const { id } = params

  return (
    <LoadEventInfo eventId={id}>
      {(ev) => (
        <div>
          <h1>Event: {ev.name}</h1>
          <IfEventCreator eventId={id}>
            <div>You are the creator of this event.</div>
          </IfEventCreator>
        </div>
      )}
    </LoadEventInfo>
  )
}