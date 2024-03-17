'use client';

import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import {
  ActionDialog,
  CloseDialogCallback,
} from '~/app/Components/Dialogs/ActionDialog';
import { usePublicClient, useWriteContract } from 'wagmi';
import {
  MASTER_CONTRACT_CONFIG,
  SPONSOR_CONTRACT_BYTECODE,
  SPONSOR_CONTRACT_CONFIG,
} from '~/contracts';
import { Button } from './button';
import { ErrorBox } from './ErrorBox';
import { LoadEventInfo } from './LoadEventInfo';
import { useWallet } from '~/app/hooks/wallet';
import { useRouter } from 'next/navigation';
import { EventInfo } from '~/app/hooks/event';
import { z } from 'zod';
import { Input } from './Form/input';
import { SponsorForm } from '../Dialogs/SponsorForm';

const sponsorFormSchema = z.object({
  name: z.string().min(1).max(40),
});

export const CreateSponsorDialog: FC<
  PropsWithChildren<{ eventId: number }>
> = ({ eventId, children }) => {
  const wallet = useWallet();
  const router = useRouter();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = useCallback(
    async (
      data: z.infer<typeof sponsorFormSchema>,
      closeDialog: CloseDialogCallback,
    ) => {
      if (creating) {
        return;
      }

      try {
        setCreating(true);

        const hash = await wallet?.client.deployContract({
          ...SPONSOR_CONTRACT_CONFIG,
          args: [MASTER_CONTRACT_CONFIG.address, BigInt(eventId), data.name],
          bytecode: SPONSOR_CONTRACT_BYTECODE,
        });

        console.log(`Deployment hash: ${hash}`);

        const { contractAddress } =
          (await publicClient?.waitForTransactionReceipt({
            hash: hash as `0x${string}`,
          }))!;

        console.log(`Deployed at: ${contractAddress}`);

        router.push(`/event/${eventId}/sponsor/${contractAddress}`);

        closeDialog();
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setCreating(false);
      }
    },
    [creating, eventId, publicClient, router, wallet?.client],
  );

  return (
    <ActionDialog
      dialogTitle={dialogTitle}
      dialogDescription="Enter the details to become a sponsor for the event."
      renderContent={(closeDialog: any) => (
        <LoadEventInfo eventId={eventId}>
          {(ev) => (
            <>
              <SponsorForm onSubmit={(data) => onSubmit(data, closeDialog)} />
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
    <span className="text-[hsl(280,100%,70%)]">Become</span> a Sponsor
  </div>
);
