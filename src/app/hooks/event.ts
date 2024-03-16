import { useMemo } from "react";
import { useInfiniteReadContracts, useReadContract } from "wagmi";
import { MASTER_CONTRACT_CONFIG } from "~/contracts";

export const useEvent = (eventId: number) => {
  return useReadContract({
    ...MASTER_CONTRACT_CONFIG,
    functionName: "getEvent",
    args: [BigInt(eventId)],
    query: {
      refetchInterval: 5000,
    },
  });
}

export const useEvents = (perPage: number) => {
  return useInfiniteReadContracts({
    cacheKey: "events",
    contracts(pageParam) {
      return [...new Array(perPage)].map((_, i) => ({
        ...MASTER_CONTRACT_CONFIG,
        functionName: "getEvent",
        args: [pageParam + i],
        watch: true,
      }));
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

export const useTotalEvents = () => {
  return useReadContract({
    ...MASTER_CONTRACT_CONFIG,
    functionName: "totalEvents",
    args: [],
    query: {
      refetchInterval: 5000,
    },
  });
}