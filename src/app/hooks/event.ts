import { useMemo } from "react";
import { zeroAddress } from "viem";
import { useInfiniteReadContracts, useReadContract } from "wagmi";
import { DEFAULT_CONTRACT_QUERY_OPTIONS, MASTER_CONTRACT_CONFIG } from "~/contracts";

export interface EventInfo {
  name: string;
  owner: `0x${string}`;
  teamIds: readonly bigint[];
  sponsors: readonly string[];
}

export const useEvent = (eventId: number) => {
  return useReadContract({
    ...MASTER_CONTRACT_CONFIG,
    functionName: "getEvent",
    args: [BigInt(eventId)],
    query: {
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });
}

export const useEvents = (perPage: number) => {
  const raw = useInfiniteReadContracts({
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
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });

  const noErrors = useMemo(() => {
    if (
      raw.isLoading ||
      raw.error ||
      !raw.data
    ) {
      return false;
    }

    const { pages } = raw.data as any;

    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].length; j++) {
        if (pages[i][j].error) {
          return false;
        }
      }
    }

    return true;
  }, [raw.data, raw.error, raw.isLoading]);

  const parsedData = useMemo(() => {
    if (!noErrors) {
      return null;
    }

    const ret: EventInfo[] = [];
    const { pages } = raw.data as any;

    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].length; j++) {
        const { owner } = pages[i][j].result;

        if (owner !== zeroAddress) {
          ret.push(pages[i][j].result as EventInfo);
        }
      }
    }

    return ret;
  }, [noErrors, raw.data]);


  return {
    ...raw,
    parsedData,
  };
}

export const useTotalEvents = () => {
  return useReadContract({
    ...MASTER_CONTRACT_CONFIG,
    functionName: "totalEvents",
    args: [],
    query: {
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });
}