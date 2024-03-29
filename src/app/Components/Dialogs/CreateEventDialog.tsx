'use client';

import {
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ActionDialog, CloseDialogCallback } from './ActionDialog';
import { useWriteContract } from 'wagmi';
import { MASTER_CONTRACT_CONFIG } from '~/contracts';
import { Button } from '../UI/button';
import { ErrorBox } from '../UI/ErrorBox';
import { Form } from '../UI/Form/form';
import { EventForm, eventFormSchema } from './CreateEventForm';
import { z } from 'zod';

export const CreateEventDialog: FC<PropsWithChildren> = ({ children }) => {
  const { writeContractAsync } = useWriteContract();

  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = useCallback(
    async (
      data: z.infer<typeof eventFormSchema>,
      closeDialog: CloseDialogCallback,
    ) => {
      if (creating) {
        return;
      }
      try {
        setCreating(true);

        await writeContractAsync({
          ...MASTER_CONTRACT_CONFIG,
          functionName: 'createEvent',
          args: [data.event], // Use the 'name' field from the form data
        });
        console.log('Event created');

        closeDialog();
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setCreating(false);
      }
    },
    [creating, writeContractAsync],
  );
  return (
    <ActionDialog
      dialogTitle={dialogTitle}
      dialogDescription="Enter the name of your event that you would like to escrow on-chain."
      renderContent={(closeDialog: any) => (
        <EventForm onSubmit={(data) => onSubmit(data, closeDialog)} />
      )}
    >
      {children}
    </ActionDialog>
  );
};

const dialogTitle = (
  <div className="text-2xl">
    <span className="text-[hsl(280,100%,70%)]">Secure</span> your Hackathon
  </div>
);
