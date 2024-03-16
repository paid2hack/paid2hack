import Link from "next/link";
import { EventList } from "./Components/UI/EventList";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <Link href="/organizers"><button className="mb-10">Create event</button></Link>
        <EventList />
      </div>
    </div>
  );
}
