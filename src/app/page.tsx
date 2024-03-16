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
      <div className="mx-4 my-6 flex-col border-b-4  bg-slate-800/70 ">
        <Card className="rounded-b-none border-b-2 border-b-[hsl(280,100%,70%)]/70  px-2">
          <CardHeader className="">
            <CardTitle>Upcoming events</CardTitle>
          </CardHeader>
        </Card>
        <div className="">
          <Card className="-none mx-2 my-2 border-b-2 border-background/80 bg-background/80 px-2 shadow-sm">
            <CardHeader className="ml-4  p-2">
              <CardTitle className="flex items-center  justify-between  text-sm ">
                <div>EthGlobal</div> <div>$250,000</div>{' '}
                <div className=" rounded-lg border-2 border-green-900 bg-green-950/40 px-4 text-sm  text-slate-300">
                  Verified
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="-none mx-2 my-2 border-b-2 border-background/80 bg-background/80 px-2 shadow-sm">
            <CardHeader className="ml-4  p-2">
              <CardTitle className="flex items-center  justify-between  text-sm ">
                <div>EthGlobal</div> <div>$250,000</div>{' '}
                <div className=" rounded-lg border-2 border-green-900 bg-green-950/40 px-4 text-sm  text-slate-300">
                  Verified
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="-none mx-2 my-2 border-b-2 border-background/80 bg-background/80 px-2 shadow-sm">
            <CardHeader className="ml-4  p-2">
              <CardTitle className="flex items-center  justify-between  text-sm ">
                <div>EthGlobal</div> <div>$250,000</div>{' '}
                <div className=" rounded-lg border-2 border-green-900 bg-green-950/40 px-4 text-sm  text-slate-300">
                  Verified
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div>
        <EventList />
      </div>
    </>
  );
}
