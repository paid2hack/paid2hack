import Link from 'next/link';
import { EventList } from './Components/UI/EventList';
import { CreateEventDialog } from './Components/Dialogs/CreateEventDialog';
import { Button } from './Components/UI/Button';
import { Header } from './home/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './Components/UI/card';

export default function HomePage() {
  return (
    <>
      <Header />
      <EventList />
    </>
  );
}
