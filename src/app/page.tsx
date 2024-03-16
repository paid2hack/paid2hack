import Link from "next/link";
import { EventList } from "./Components/UI/EventList";
import { CreateEventDialog } from "./Components/UI/CreateEventDialog";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <CreateEventDialog className="mb-4" />
        <EventList />
      </div>
    </div>
  );
}
