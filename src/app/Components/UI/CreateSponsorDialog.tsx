"use client"

import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ActionDialog, CloseDialogCallback } from "~/app/Components/Dialogs/ActionDialog";
import { usePublicClient, useWriteContract } from "wagmi";
import { MASTER_CONTRACT_CONFIG, SPONSOR_CONTRACT_BYTECODE, SPONSOR_CONTRACT_CONFIG } from "~/contracts";
import { Button } from "./Button";
import { ErrorBox } from "./ErrorBox";
import { EventInfo, LoadEventInfo } from "./LoadEventInfo";
import { useWallet } from "~/app/hooks/wallet";
import { useRouter } from "next/navigation";

const Form: FC<{ id: number, info: EventInfo, closeDialog: CloseDialogCallback }> = ({ id, info, closeDialog }) => {
  const router = useRouter()

  const wallet = useWallet()
  const publicClient = usePublicClient()
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

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    try {
      setCreating(true)

      const hash = await wallet?.client.deployContract({
        ...SPONSOR_CONTRACT_CONFIG,
        args: [MASTER_CONTRACT_CONFIG.address, BigInt(id), name],
        bytecode: SPONSOR_CONTRACT_BYTECODE
      })

      console.log(`Deployment hash: ${hash}`)

      const { contractAddress } = (await publicClient?.waitForTransactionReceipt({ hash: hash as `0x${string}` }))!

      console.log(`Deployed at: ${contractAddress}`)

      router.push(`/event/${id}/sponsor/${contractAddress}`)

      closeDialog()
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }, [canSubmit, closeDialog, id, name, publicClient, router, wallet?.client])

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <input className="text-black mb-4" type="text" placeholder="Sponsor name" onChange={onNameChange} value={name} max={40} size={30} />
      <Button className="mb-2" type="submit" disabled={!canSubmit}>Become a sponsor</Button>
      {error ? <ErrorBox>{error}</ErrorBox> : null}
    </form>
  )
}


export const CreateSponsorDialog: FC<PropsWithChildren<{ eventId: number }>> = ({ eventId, children }) => {
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