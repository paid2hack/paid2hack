"use client"

import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import { useWriteContract } from "wagmi"
import { Button } from "~/app/Components/UI/Button"
import { ErrorBox } from "~/app/Components/UI/ErrorBox"
import { EventInfo, LoadEventInfo } from "~/app/Components/UI/LoadEventInfo"
import { LoadTeamInfo } from "~/app/Components/UI/LoadTeamInfo"
import { Loading } from "~/app/Components/UI/Loading"
import { UpdateTeamNameDialog } from "~/app/Components/UI/UpdateTeamNameDialog"
import { TeamInfo } from "~/app/hooks/team"
import { isEthereumAddress, isSameEthereumAddress } from "~/app/lib/utils"
import { MASTER_CONTRACT_CONFIG } from "~/contracts"

interface Params { event: EventInfo, teamId: number, teamInfo: TeamInfo, isTeamLeader: boolean }

const AddMemberForm = ({ teamId, teamInfo }: Params) => {
  const { writeContractAsync } = useWriteContract()

  const [member, setMember] = useState('')
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState()

  const onChangeMember = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMember(e.target.value)
  }, [])

  const canSubmit = useMemo(() => {
    return !updating && isEthereumAddress(member) && !teamInfo.members.find(m => isSameEthereumAddress(m, member)) && !isSameEthereumAddress(teamInfo.leader, member)
  }, [member, teamInfo.leader, teamInfo.members, updating])

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      setUpdating(true)
      setError(undefined)

      const newMemberList = teamInfo.members.concat(member as `0x${string}`)

      await writeContractAsync({
        ...MASTER_CONTRACT_CONFIG,
        functionName: 'updateTeamMembers',
        args: [BigInt(teamId), newMemberList],
      })

      setMember('')
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setUpdating(false)
    }
  }, [member, teamId, teamInfo.members, writeContractAsync])

  return (
    <form className="mt-2" onSubmit={onSubmit}>
      <input className="text-black mb-4" type="text" placeholder="New team member" onChange={onChangeMember} value={member} max={40} size={40} />
      <Button className="mb-2" type="submit" disabled={!canSubmit}>Add new member</Button>
      {error ? <ErrorBox>{error}</ErrorBox> : null}
    </form>
  )
}

const Member = ({ teamId, teamInfo, member, isTeamLeader }: { member: string } & Params) => {
  const { writeContractAsync } = useWriteContract()

  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState()

  const remove = useCallback(async () => {
    try {
      setUpdating(true)
      setError(undefined)

      const newMemberList = teamInfo.members.filter(m => !isSameEthereumAddress(m, member))

      await writeContractAsync({
        ...MASTER_CONTRACT_CONFIG,
        functionName: 'updateTeamMembers',
        args: [BigInt(teamId), newMemberList],
      })
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setUpdating(false)
    }
  }, [member, teamInfo.members, teamId, writeContractAsync])

  return (
    <div>
      <div className="flex flex-row justify-between">
        <p>{member}</p>
        {isTeamLeader && (
          <Button onClick={remove} disabled={updating}>Remove</Button>
        )}
      </div>
      {updating && <Loading />}
      {error && <ErrorBox>{`${error}`}</ErrorBox>}
    </div>
  )
}

const TeamInfo = (params: Params) => {
  const { event, teamId, teamInfo, isTeamLeader } = params
  const isTeamInEvent = useMemo(() => !!event.teamIds.find(n => Number(n) === teamId), [event.teamIds, teamId])

  if (!isTeamInEvent) {
    return <ErrorBox>Team not found in event</ErrorBox>
  }

  return (
    <div>
      <h1>Team: {teamInfo.name}</h1>
      <p>Leader: {teamInfo.leader}</p>
      {isTeamLeader && (
        <UpdateTeamNameDialog teamId={teamId}>
          <Button className="mb-2">Update team name</Button>
        </UpdateTeamNameDialog>
      )}
      <h2>Members:</h2>
      <ul>
        {teamInfo.members.map((member, i) => (
          <li key={i} className="mb-2">
            <Member member={member} {...params} />
          </li>
        ))}
      </ul>
      {isTeamLeader && <AddMemberForm {...params} />}
    </div>
  )
}

export default function TeamPage({ params }: { params: { eventId: string, teamId: string } }) {
  const eventId = Number(params.eventId)
  const teamId = Number(params.teamId)

  return (
    <LoadEventInfo eventId={eventId}>
      {(ev) => (
        <div>
          <Link href={`/event/${eventId}`}><p className="italic text-sm">Event: {ev.name}</p></Link>
          <LoadTeamInfo teamId={teamId}>
            {(team, isTeamLeader) => <TeamInfo event={ev} teamId={teamId} teamInfo={team} isTeamLeader={isTeamLeader} />}
          </LoadTeamInfo>
        </div>
      )}
    </LoadEventInfo>
  )
}