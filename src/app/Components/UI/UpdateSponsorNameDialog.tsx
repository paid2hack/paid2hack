"use client"

import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ActionDialog, CloseDialogCallback } from "./ActionDialog";
import { useWriteContract } from "wagmi";
import { SPONSOR_CONTRACT_CONFIG } from "~/contracts";
import { Button } from "./Button";
import { ErrorBox } from "./ErrorBox";
import { LoadSponsorInfo } from "./LoadSponsorInfo";
import { SponsorInfo } from "~/app/hooks/sponsor";

const Form: FC<{ sponsorAddress: string, info: SponsorInfo, closeDialog: CloseDialogCallback }> = ({ sponsorAddress, info, closeDialog }) => {
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
        ...SPONSOR_CONTRACT_CONFIG,
        address: sponsorAddress as `0x${string}`,
        functionName: 'updateName',
        args: [name],
      })

      closeDialog()
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }, [canSubmit, name, sponsorAddress, writeContractAsync])

  return (
    <form className="flex flex-col" onSubmit={(e) => onSubmit(e, closeDialog)}>
      <input className="text-black mb-4" type="text" placeholder="Event name" onChange={onNameChange} value={name} max={40} size={30} />
      <Button className="mb-2" type="submit" disabled={!canSubmit}>Update sponsor name</Button>
      {error ? <ErrorBox>{error}</ErrorBox> : null}
    </form>
  )
}


export const UpdateSponsorNameDialog: FC<PropsWithChildren<{ sponsorAddress: string }>> = ({ sponsorAddress, children }) => {
  return (
    <ActionDialog
      renderContent={(closeDialog) => (
        <LoadSponsorInfo sponsorAddress={sponsorAddress}>
          {(sponsor) => <Form sponsorAddress={sponsorAddress} info={sponsor} closeDialog={closeDialog} />}
        </LoadSponsorInfo>
      )}
    >
      {children}
    </ActionDialog>
  )
}