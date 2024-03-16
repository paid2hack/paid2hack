"use client"

import { FC, useCallback, useMemo, useState } from "react";
import { ActionDialog, CloseDialogCallback } from "./ActionDialog";
import { useWriteContract } from "wagmi";
import { MASTER_CONTRACT_CONFIG } from "~/contracts";
import { Button } from "./Button";
import { ErrorBox } from "./ErrorBox";
import { PropsWithClassName } from "~/app/lib/utils";

export const CreateEventDialog: FC<PropsWithClassName> = ({ className }) => {
  const { writeContractAsync } = useWriteContract()

  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, [])

  const canSubmit = useMemo(() => {
    return name.length > 0 && name.length < 40 && !creating
  }, [name, creating])

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>, closeDialog: CloseDialogCallback) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    try {
      setCreating(true)

      await writeContractAsync({
        ...MASTER_CONTRACT_CONFIG,
        functionName: 'createEvent',
        args: [name],
      })

      closeDialog()
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }, [canSubmit, name, writeContractAsync])

  return (
    <ActionDialog
      triggerElement={
        <div className={className}>
          <Button size='sm' asChild={true}><span>Create</span></Button>          
        </div>
      }
      renderContent={(closeDialog) => (
        <form className="flex flex-col" onSubmit={(e) => onSubmit(e, closeDialog)}>
          <input className="text-black mb-4" type="text" placeholder="Event name" onChange={onNameChange} value={name} max={40} size={30} />
          <Button className="mb-2" type="submit" disabled={!canSubmit}>Create event</Button>
          {error ? <ErrorBox>{error}</ErrorBox> : null}
        </form>
      )}
    />
  )
}