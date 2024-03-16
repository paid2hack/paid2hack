import Link from "next/link";
import { EventList } from "./Components/UI/EventList";
import { CreateEventDialog } from "./Components/UI/CreateEventDialog";
import { Button } from "./Components/UI/Button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <CreateEventDialog>
          <Button size='sm' className="mb-4" asChild={true}><span>Create</span></Button>
        </CreateEventDialog>
        <EventList />
      </div>
    </div>
  );
}
