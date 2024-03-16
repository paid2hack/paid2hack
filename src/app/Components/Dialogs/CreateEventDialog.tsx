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

export const CreateEventDialog: FC<PropsWithChildren> = ({ children }) => {
  const { writeContractAsync } = useWriteContract();

  const [name, setName] = useState('');
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
          functionName: 'createEvent',
          args: [name],
        });

        closeDialog();
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setCreating(false);
      }
    },
    [canSubmit, name, writeContractAsync],
  );

  return (
    <ActionDialog
      renderContent={(closeDialog) => (
        <form
          className="flex flex-col"
          onSubmit={(e) => onSubmit(e, closeDialog)}
        >
          <input
            className="mb-4 text-black"
            type="text"
            placeholder="Event name"
            onChange={onNameChange}
            value={name}
            max={40}
            size={30}
          />
          <Button className="mb-2" type="submit" disabled={!canSubmit}>
            Create events
          </Button>
          {error ? <ErrorBox>{error}</ErrorBox> : null}
        </form>
      )}
    >
      {children}
    </ActionDialog>
  );
};
