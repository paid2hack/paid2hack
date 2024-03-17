'use client';

import { Button } from '~/app/Components/UI/button';
import { CreateTeamDialog } from '~/app/Components/Dialogs/CreateTeamDialog';

import { IfWalletConnected } from '~/app/Components/UI/IfWalletConnected';
import { LoadEventInfo } from '~/app/Components/UI/LoadEventInfo';
import { TeamList } from '~/app/Components/UI/TeamList';
import { UpdateEventNameDialog } from '~/app/Components/Dialogs/UpdateEventNameDialog';
import { Card, CardHeader, CardTitle } from '~/app/Components/UI/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/app/Components/UI/Tabs';
import { Separator } from '~/app/Components/UI/separator';

export default function EventPage({ params }: { params: { eventId: number } }) {
  const { eventId } = params;

  return (
    <LoadEventInfo eventId={eventId}>
      {(ev, isEventCreator) => (
        <div className="mx-8">
          <div className="my-10 flex flex-col rounded-md border-4 border-[hsl(280,100%,70%)]/60 bg-slate-950  p-10 shadow-lg  shadow-[hsl(280,100%,70%)]/40 ">
            <div className="w-full space-y-1">
              <h4 className="text-sm font-medium leading-none">
                <h1>
                  {/* <span className="text-primary/70">Event: </span> */}
                  {ev.name}
                </h1>
              </h4>
              <p className="text-sm text-muted-foreground">
                id: {eventId}
                <div>Creator: {ev.owner} </div>
              </p>
            </div>
            <Separator className="my-4" />
            <div className="mt-2 flex h-5 items-center space-x-4 text-sm">
              <Separator orientation="vertical" />
              <Button variant="ghost">Site</Button>
              <Separator orientation="vertical" />
              <div>
                {isEventCreator && (
                  <UpdateEventNameDialog eventId={eventId}>
                    <Button>Update event name</Button>
                  </UpdateEventNameDialog>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="funding" className="w-full border-4">
            <TabsList className="w-full rounded-none">
              <TabsTrigger className="basis-1/2" value="funding">
                Funding
              </TabsTrigger>
              <TabsTrigger className="basis-1/2" value="teams">
                Teams
              </TabsTrigger>
            </TabsList>
            <TabsContent value="funding" className="border-4"></TabsContent>
            <TabsContent value="teams">
              <IfWalletConnected connectButton={null}>
                <CreateTeamDialog eventId={eventId}>
                  <Button className="mb-4">Create team</Button>
                </CreateTeamDialog>
                <div>
                  <h2>Teams</h2>
                  <Separator />
                  <div className="my-4">
                    <TeamList eventId={eventId} />
                  </div>
                </div>
              </IfWalletConnected>
            </TabsContent>
          </Tabs>

          <div className="mt-10"></div>
        </div>
      )}
    </LoadEventInfo>
  );
}
