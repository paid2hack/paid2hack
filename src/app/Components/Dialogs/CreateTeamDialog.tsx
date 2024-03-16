'use client';

import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { ActionDialog, CloseDialogCallback } from './ActionDialog';
import { useWriteContract } from 'wagmi';
import { MASTER_CONTRACT_CONFIG } from '~/contracts';
import { Button } from '../UI/Button';
import { ErrorBox } from '../UI/ErrorBox';
import { EventInfo, LoadEventInfo } from '../UI/LoadEventInfo';
import { useWallet } from '~/app/hooks/wallet';

const Form: FC<{
  id: number;
  info: EventInfo;
  closeDialog: CloseDialogCallback;
}> = ({ id, info, closeDialog }) => {
  const wallet = useWallet();
  const { writeContractAsync } = useWriteContract();

  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  // TODO: input team member addresses

  const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const canSubmit = useMemo(() => {
    return name.length > 0 && name.length < 40 && !creating;
  }, [name, creating]);

  const onSubmit = useCallback(
    async (
      e: React.FormEvent<HTMLFormElement>,
      closeDialog: CloseDialogCallback,
    ) => {
      e.preventDefault();

      if (!canSubmit) {
        return;
      }

      try {
        setCreating(true);

        await writeContractAsync({
          ...MASTER_CONTRACT_CONFIG,
          functionName: 'createTeam',
          args: [
            BigInt(id),
            {
              name,
              leader: wallet!.address,
              members: [],
            },
          ],
        });

        closeDialog();
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setCreating(false);
      }
    },
    [canSubmit, id, name, wallet, writeContractAsync],
  );

  return (
    <form className="flex flex-col" onSubmit={(e) => onSubmit(e, closeDialog)}>
      <input
        className="mb-4 text-black"
        type="text"
        placeholder="Event name"
        onChange={onNameChange}
        value={name}
        max={40}
        size={30}
      />
      <p className="my-4">Team leader: {wallet?.address}</p>
      <Button className="mb-2" type="submit" disabled={!canSubmit}>
        Create team
      </Button>
      {error ? <ErrorBox>{error}</ErrorBox> : null}
    </form>
  );
};

export const CreateTeamDialog: FC<PropsWithChildren<{ eventId: number }>> = ({
  eventId,
  children,
}) => {
  return (
    <ActionDialog
      renderContent={(closeDialog) => (
        <LoadEventInfo eventId={eventId}>
          {(ev) => <Form id={eventId} info={ev} closeDialog={closeDialog} />}
        </LoadEventInfo>
      )}
    >
      {children}
    </ActionDialog>
  );
};