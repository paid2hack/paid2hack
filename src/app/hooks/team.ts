import { useMemo } from "react";
import { useInfiniteReadContracts, useReadContract } from "wagmi";
import { MASTER_CONTRACT_CONFIG } from "~/contracts";

export const useTeam = (teamId: number) => {
  return useReadContract({
    ...MASTER_CONTRACT_CONFIG,
    functionName: "getTeam",
    args: [BigInt(teamId)],
    query: {
      refetchInterval: 5000,
    },
  });
}

export const useEventTeams = (eventId: number, perPage: number) => {
  return useInfiniteReadContracts({
    cacheKey: "teams",
    contracts(pageParam) {
      return [...new Array(perPage)].map((_, i) => {
        return {
          ...MASTER_CONTRACT_CONFIG,
          functionName: "getEventTeam",
          args: [eventId, pageParam + i - 1],
          watch: true,
        }
      });
    },
    query: {
      initialPageParam: 1,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + perPage;
      },
      refetchInterval: 5000,
    },
  });
}
