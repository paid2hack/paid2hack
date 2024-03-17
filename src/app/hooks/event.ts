import { useMemo } from "react";
import { useInfiniteReadContracts, useReadContract, useReadContracts } from "wagmi";
import { DEFAULT_CONTRACT_QUERY_OPTIONS, MASTER_CONTRACT_CONFIG } from "~/contracts";
import { env } from "~/env";

export interface EventInfo {
  name: string;
  owner: `0x${string}`;
  teamIds: readonly bigint[];
  sponsors: readonly string[];
  totalPrizeMoney: bigint;
}

const _getContractCalls = (eventId: number) => {
  return [
    {
      ...MASTER_CONTRACT_CONFIG,
      functionName: "getEvent",
      args: [BigInt(eventId)],
    },
    {
      ...MASTER_CONTRACT_CONFIG,
      functionName: "getTotalSponsorPrize",
      args: [BigInt(eventId), env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT as `0x${string}`],
    },
  ];
};

const _parseEventInfoFromResultArray = (data: any[]): EventInfo => {
  return {
    ...data[0].result,
    totalPrizeMoney: BigInt(data![1].result),
  };
};

export const useEvent = (eventId: number) => {
  const raw = useReadContracts({
    contracts: _getContractCalls(eventId),
    query: {
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });

  const noErrors = useMemo(() => {
    if (raw.isLoading || raw.error || !raw.data) {
      return false;
    }

    return raw.data.reduce((m, v) => {
      return m && !v.error;
    }, true);
  }, [raw.data, raw.error, raw.isLoading]);

  return {
    ...raw,
    parsedData: noErrors
      ? _parseEventInfoFromResultArray(raw.data!)
      : null,
  };
}

export const useEvents = (perPage: number) => {
  const raw = useInfiniteReadContracts({
    cacheKey: "events",
    contracts(pageParam) {
      return [...new Array(perPage)]
        .map((_, i) => {
          return _getContractCalls(pageParam + i).map(c => ({ ...c, watch: true }))
        })
        .flat();
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
      for (let j = 0; j < pages[i].length; j += 2) {
        const event = _parseEventInfoFromResultArray(pages[i].slice(j, j + 2));
        ret.push(event);
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