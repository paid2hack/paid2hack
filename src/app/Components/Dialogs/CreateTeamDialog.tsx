'use client';

import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { useWriteContract } from 'wagmi';
import { z } from 'zod';
import { useWallet } from '~/app/hooks/wallet';
import { MASTER_CONTRACT_CONFIG } from '~/contracts';
import { ErrorBox } from '../UI/ErrorBox';
import { LoadEventInfo } from '../UI/LoadEventInfo';
import { ActionDialog, CloseDialogCallback } from './ActionDialog';
import { TeamForm, teamFormSchema } from './CreateTeamForm';

export const CreateTeamDialog: FC<PropsWithChildren<{ eventId: number }>> = ({
  eventId,
  children,
}) => {
  const wallet = useWallet();
  const { writeContractAsync } = useWriteContract();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = useCallback(
    async (
      data: z.infer<typeof teamFormSchema>,
      closeDialog: CloseDialogCallback,
    ) => {
      if (creating) {
        return;
      }
      try {
        setCreating(true);
        await writeContractAsync({
          ...MASTER_CONTRACT_CONFIG,
          functionName: 'createTeam',
          args: [
            BigInt(eventId),
            {
              name: data.name,
              leader: wallet!.address,
              members: [],
            },
          ],
        });
        console.log('Team created');
        closeDialog();
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setCreating(false);
      }
    },
    [creating, eventId, writeContractAsync, wallet],
  );

  return (
    <ActionDialog
      dialogTitle={dialogTitle}
      dialogDescription="Enter the details of your team for the event."
      renderContent={(closeDialog: any) => (
        <LoadEventInfo eventId={eventId}>
          {(ev) => (
            <>
              <TeamForm onSubmit={(data) => onSubmit(data, closeDialog)} />
              {error ? <ErrorBox>{error}</ErrorBox> : null}
            </>
          )}
        </LoadEventInfo>
      )}
    >
      {children}
    </ActionDialog>
  );
};

const dialogTitle = (
  <div className="text-2xl">
    <span className="text-[hsl(280,100%,70%)]">Create</span> your Team
  </div>
);
