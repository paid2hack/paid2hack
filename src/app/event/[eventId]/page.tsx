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
import { SponsorList } from '~/app/Components/UI/SponsorList';
import { CreateSponsorDialog } from '~/app/Components/UI/CreateSponsorDialog';

export default function EventPage({ params }: { params: { eventId: number } }) {
  const { eventId } = params;

  return (
    <LoadEventInfo eventId={eventId}>
      {(ev, isEventCreator) => (
        <div className="min-h-screen bg-gray-900 px-8 py-10">
          <Card className="border border-gray-700 bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-100">
                {ev.name}
              </CardTitle>
              <p className="mt-1 text-sm text-gray-400">
                ID: {eventId}
                <span className="block">Creator: {ev.owner}</span>
              </p>
            </CardHeader>
            <Separator className="my-4 border-gray-700" />
            <div className="mt-4 flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              >
                Site
              </Button>
              {isEventCreator && (
                <UpdateEventNameDialog eventId={eventId}>
                  <Button className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-gray-100">
                    Update Event Name
                  </Button>
                </UpdateEventNameDialog>
              )}
            </div>
          </Card>

          <Tabs defaultValue="funding" className="mt-8">
            <TabsList className="bg-gray-800">
              <TabsTrigger
                value="funding"
                className="text-gray-300 hover:text-gray-100"
              >
                Funding
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="text-gray-300 hover:text-gray-100"
              >
                Teams
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="funding"
              className="border-t border-gray-700 bg-gray-800 p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-100">Sponsors</h2>
                <CreateSponsorDialog eventId={eventId}>
                  <Button className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-gray-100">
                    Become a Sponsor
                  </Button>
                </CreateSponsorDialog>
              </div>
              <Separator className="mb-6 border-gray-700" />
              <SponsorList eventId={eventId} />
            </TabsContent>
            <TabsContent
              value="teams"
              className="border-t border-gray-700 bg-gray-800 p-6"
            >
              <IfWalletConnected connectButton={null}>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-100">Teams</h2>
                  <CreateTeamDialog eventId={eventId}>
                    <Button className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-gray-100">
                      Create Team
                    </Button>
                  </CreateTeamDialog>
                </div>
                <Separator className="mb-6 border-gray-700" />
                <div className="grid grid-cols-1 gap-6">
                  <TeamList eventId={eventId} />
                </div>
              </IfWalletConnected>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </LoadEventInfo>
  );
}
