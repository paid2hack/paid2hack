import { useMemo } from "react";
import { zeroAddress } from "viem";
import { useReadContract, useReadContracts } from "wagmi";
import { DEFAULT_CONTRACT_QUERY_OPTIONS, SPONSOR_CONTRACT_CONFIG } from "~/contracts";
import { env } from "~/env";

export interface SponsorInfo {
  address: string;
  owner: string;
  name: string;
  allocatedPrizeMoney: bigint;
  unallocatablePrizeMoney: bigint;
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

const _parseSponsorInfoFromResultArray = (address: string, data: any[]) => {
  return {
    address,
    owner: data![0].result as `0x${string}`,
    name: data![1].result as string,
    allocatedPrizeMoney: BigInt(data![2].result!),
    unallocatablePrizeMoney: BigInt(data![3].result!),
  };
};

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

export interface SponsorPrizeInfo {
  teamId: number;
  token: string;
  amount: bigint;
  claimed: bigint;
}

export const useSponsorPrizes = (sponsorAddress: string, teamIds: bigint[]) => {
  const address = sponsorAddress as `0x${string}`;

  const raw = useReadContracts({
    contracts: teamIds
      .map((id) => [
        {
          ...SPONSOR_CONTRACT_CONFIG,
          address,
          functionName: "getPrizeAmount",
          args: [id, env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT],
        },
        {
          ...SPONSOR_CONTRACT_CONFIG,
          address,
          functionName: "getClaimedAmount",
          args: [id, env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT],
        },
      ])
      .flat(),
    query: {
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });

  const noErrors = useMemo(() => {
    if (
      raw.isLoading ||
      raw.error ||
      !raw.data ||
      raw.data.length !== teamIds.length * 2
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

    const ret: SponsorPrizeInfo[] = [];

    for (let i = 0; i < (teamIds.length * 2); i += 2) {
      ret.push({
        teamId: Number(teamIds[i]),
        token: env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT,
        amount: BigInt(raw.data![i]!.result!),
        claimed: BigInt(raw.data![i + 1]!.result!),
      });  
    }

    return ret;
  }, [noErrors, raw.data, teamIds]);

  return {
    ...raw,
    parsedData,
  }
};

export const useSponsorClaimablePrizeByWallet = (sponsorAddress: string, teamId: number, wallet: string) => {
  const address = sponsorAddress as `0x${string}`;

  return useReadContract({
    ...SPONSOR_CONTRACT_CONFIG,
    address,
    functionName: "getClaimablePrize",
    args: [BigInt(teamId), wallet as `0x${string}`, env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT as `0x${string}`],
    query: {
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });
}

const RESULT_LEN = _getContractCalls(zeroAddress).length;

export const useSponsors = (sponsorAddresses: string[]) => {
  const raw = useReadContracts({
    contracts: sponsorAddresses.map((a) => _getContractCalls(a as `0x${string}`)).flat(),
    query: {
      ...DEFAULT_CONTRACT_QUERY_OPTIONS,
    },
  });  

  const noErrors = useMemo(() => {
    if (
      raw.isLoading ||
      raw.error ||
      !raw.data ||
      raw.data.length !== sponsorAddresses.length * RESULT_LEN
    ) {
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

    for (let i = 0; i < sponsorAddresses.length; i++) {
      const idx = i * RESULT_LEN
      const d = _parseSponsorInfoFromResultArray(
        sponsorAddresses[i]!,
        raw.data!.slice(idx, idx + RESULT_LEN),
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
