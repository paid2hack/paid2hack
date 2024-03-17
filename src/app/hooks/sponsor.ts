import { useMemo } from "react";
import { zeroAddress } from "viem";
import { useReadContracts } from "wagmi";
import { DEFAULT_CONTRACT_QUERY_OPTIONS, SPONSOR_CONTRACT_CONFIG } from "~/contracts";
import { env } from "~/env";

export interface SponsorInfo {
  address: string;
  owner: string;
  name: string;
  allocatedPrizeMoney: bigint;
  unallocatablePrizeMoney: bigint;
}

export interface TeamPrizeInfo {
  teamId: number
  token: string
  prize: bigint
}

const _parseSponsorInfoFromResultArray = (address: string, data: any[]) => {
  return {
    address,
    owner: data![0].result as `0x${string}`,
    name: data![1].result as string,
    allocatedPrizeMoney: BigInt(data![2].result!),
    unallocatablePrizeMoney: BigInt(data![3].result!),
  };
}

const _getContractCalls = (sponsorAddress: `0x${string}`) => {
  return [
    {
      ...SPONSOR_CONTRACT_CONFIG,
      address: sponsorAddress,
      functionName: "owner",
      args: [],
    },
    {
      ...SPONSOR_CONTRACT_CONFIG,
      address: sponsorAddress,
      functionName: "name",
    },
    {
      ...SPONSOR_CONTRACT_CONFIG,
      address: sponsorAddress,
      functionName: "totalTokenPrizeAmounts",
      args: [env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT as `0x${string}`],
    },
    {
      ...SPONSOR_CONTRACT_CONFIG,
      address: sponsorAddress,
      functionName: "getAllocatablePrize",
      args: [env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT as `0x${string}`],
    },
  ];
}

export const useSponsor = (sponsorAddress: string) => {
  const address = sponsorAddress as `0x${string}`;

  const raw = useReadContracts({
    contracts: _getContractCalls(address),
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
  }, [raw.data, raw.error, raw.isLoading])

  return {
    ...raw,
    parsedData: noErrors
      ? (_parseSponsorInfoFromResultArray(address, raw.data!) as SponsorInfo) : null,
  };
}

export const useSponsorPrizes = (sponsorAddress: string, teamIds: bigint[]) => {
  const address = sponsorAddress as `0x${string}`;

  const raw = useReadContracts({
    contracts: teamIds.map((id) => [
      {
        ...SPONSOR_CONTRACT_CONFIG,
        address,
        functionName: "getPrizeAmount",
        args: [id, env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT],
      },
    ]).flat(),
    query: {
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });

  const noErrors = useMemo(() => {
    if (
      raw.isLoading ||
      raw.error ||
      !raw.data ||
      raw.data.length !== teamIds.length
    ) {
      return false;
    }

    return raw.data.reduce((m, v) => {
      return m && !v.error;
    }, true);
  }, [raw.data, raw.error, raw.isLoading, teamIds.length]);

  const parsedData = useMemo(() => {
    if (!noErrors) {
      return null;
    }

    const ret: TeamPrizeInfo[] = [];

    for (let i = 0; i < teamIds.length; i++) {
      ret.push({
        teamId: Number(teamIds[i]),
        token: env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT,
        prize: BigInt(raw.data![i]!.result!),
      })  
    }

    return ret;
  }, [noErrors, raw.data, teamIds]);

  return {
    ...raw,
    parsedData,
  }
};

export const useSponsors = (sponsorAddresses: string[]) => {
  const raw = useReadContracts({
    contracts: sponsorAddresses.map((a) => _getContractCalls(a as `0x${string}`)).flat(),
    query: {
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });  

  const noErrors = useMemo(() => {
    if (raw.isLoading || raw.error || !raw.data || raw.data.length !== sponsorAddresses.length * 3) {
      return false;
    }

    return raw.data.reduce((m, v) => {
      return m && !v.error;
    }, true);
  }, [raw.data, raw.error, raw.isLoading, sponsorAddresses.length]);

  const parsedData = useMemo(() => {
    if (!noErrors) {
      return null
    }

    const ret: SponsorInfo[] = []
    const c = _getContractCalls(zeroAddress)

    for (let i = 0; i < sponsorAddresses.length; i++) {
      const idx = i * c.length
      const d = _parseSponsorInfoFromResultArray(
        sponsorAddresses[i]!,
        raw.data!.slice(idx, idx + c.length),
      );

      if (d.owner !== zeroAddress) {
        ret.push(d)
      }
    }

    return ret
  }, [noErrors, raw.data, sponsorAddresses])

  return {
    ...raw,
    parsedData,
  }
}
