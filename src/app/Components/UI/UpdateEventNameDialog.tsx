"use client"

import { FC, PropsWithChildren, ReactNode, useCallback, useMemo, useState } from "react";
import { ActionDialog, CloseDialogCallback } from "./ActionDialog";
import { useWriteContract } from "wagmi";
import { MASTER_CONTRACT_CONFIG } from "~/contracts";
import { Button } from "./Button";
import { ErrorBox } from "./ErrorBox";
import { EventInfo, LoadEventInfo } from "./LoadEventInfo";

const Form: FC<{ id: number, info: EventInfo, closeDialog: CloseDialogCallback }> = ({ id, info, closeDialog }) => {
  const { writeContractAsync } = useWriteContract()

  const [name, setName] = useState(info.name);
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
        functionName: 'updateEventName',
        args: [BigInt(id), name],
      })

      closeDialog()
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }, [canSubmit, id, name, writeContractAsync])

  return (
    <form className="flex flex-col" onSubmit={(e) => onSubmit(e, closeDialog)}>
      <input className="text-black mb-4" type="text" placeholder="Event name" onChange={onNameChange} value={name} max={40} size={30} />
      <Button className="mb-2" type="submit" disabled={!canSubmit}>Save new name</Button>
      {error ? <ErrorBox>{error}</ErrorBox> : null}
    </form>
  )
}


export const UpdateEventNameDialog: FC<PropsWithChildren<{ eventId: number }>> = ({ eventId, children }) => {
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
  )
}