import { useMemo } from "react";
import { useInfiniteReadContracts, useReadContract } from "wagmi";
import { DEFAULT_CONTRACT_QUERY_OPTIONS, MASTER_CONTRACT_CONFIG } from "~/contracts";
import { isSameEthereumAddress } from "../lib/utils";
import { zeroAddress } from "viem";

export interface TeamInfo {
  name: string;
  leader: `0x${string}`;
  members: readonly `0x${string}`[];
}

export const useTeam = (teamId: number) => {
  return useReadContract({
    ...MASTER_CONTRACT_CONFIG,
    functionName: "getTeam",
    args: [BigInt(teamId)],
    query: {
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });
}

export interface TeamIdTeamInfo {
  teamId: number,
  info: TeamInfo,
}

export const useEventTeams = (eventId: number, perPage: number) => {
  const raw = useInfiniteReadContracts({
    cacheKey: "teams",
    contracts(pageParam) {
      return [...new Array(perPage)].map((_, i) => {
        return {
          ...MASTER_CONTRACT_CONFIG,
          functionName: "getEventTeam",
          args: [eventId, pageParam + i - 1],
          watch: true,
        };
      });
    },
    query: {
      initialPageParam: 1,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + perPage;
      },
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  })

  const noErrors = useMemo(() => {
    if (
      raw.isLoading ||
      raw.error ||
      !raw.data
    ) {
      return false;
    }

    const { pages } = raw.data as any

    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].length; j++) {
        if (pages[i][j].error) {
          return false
        }
      }
    }

    return true
  }, [raw.data, raw.error, raw.isLoading]);

  const parsedData = useMemo(() => {
    if (!noErrors) {
      return null;
    }

    const ret: TeamIdTeamInfo[] = [];
    const { pages } = raw.data as any;

    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].length; j++) {
        const [teamId, team] = pages[i][j].result;

        if (team.leader !== zeroAddress) {
          ret.push({ teamId: Number(teamId), info: team as TeamInfo })
        }
      }
    }

    return ret;
  }, [noErrors, raw.data]);

  return {
    ...raw,
    parsedData,
  }
}
