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
import { Button } from '../UI/Button';
import { ErrorBox } from '../UI/ErrorBox';
import { EventInfo, LoadEventInfo } from '../UI/LoadEventInfo';

const Form: FC<{
  id: number;
  info: EventInfo;
  closeDialog: CloseDialogCallback;
}> = ({ id, info, closeDialog }) => {
  const { writeContractAsync } = useWriteContract();

  const [name, setName] = useState(info.name);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

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
          functionName: 'updateEventName',
          args: [BigInt(id), name],
        });

        closeDialog();
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setCreating(false);
      }
    },
    [canSubmit, id, name, writeContractAsync],
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

      <button type="submit" disabled={!canSubmit} className="relative p-[3px]">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div className="group relative  rounded-[6px] bg-black  px-8 py-2 text-white transition duration-200 hover:bg-transparent">
          Change Event Name
        </div>
      </button>
      {error ? <ErrorBox>{error}</ErrorBox> : null}
    </form>
  );
};

export const UpdateEventNameDialog: FC<
  PropsWithChildren<{ eventId: number }>
> = ({ eventId, children }) => {
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
