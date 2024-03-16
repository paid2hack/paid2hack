"use client"

import { useCallback, useMemo, useState } from "react";
import { usePublicClient, useWriteContract } from 'wagmi'
import { MASTER_CONTRACT_CONFIG } from "~/contracts";
import { ErrorBox } from "../Components/UI/ErrorBox";

export default function OrganizersPage() {
  const { writeContractAsync } = useWriteContract()
  const publicClient = usePublicClient()

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

    if (!canSubmit || !publicClient) {
      return;
    }

    try {
      setCreating(true)

      const hash = await writeContractAsync({
        ...MASTER_CONTRACT_CONFIG,
        functionName: 'createEvent',
        args: [name],
      })

      const { logs } = await publicClient!.waitForTransactionReceipt({ hash });

      console.log(logs)

    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }, [canSubmit, name, publicClient, writeContractAsync])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input className="text-black" type="text" placeholder="Event name" onChange={onNameChange} value={name} max={40} size={30} />
        <button type="submit" disabled={!canSubmit}>Create event</button>
        {error ? <ErrorBox>{error}</ErrorBox> : null}
      </form>
    </div>
  )
}