import { useReadContracts } from "wagmi";
import { SPONSOR_CONTRACT_CONFIG } from "~/contracts";
import { env } from "~/env";

export const useGetSponsorsAndPrizeMoney = (sponsorAddresses: string[]) => {
  return useReadContracts({
    contracts: sponsorAddresses.map(a => ([
      {
        ...SPONSOR_CONTRACT_CONFIG,
        address: a as `0x${string}`,
        functionName: "name",
      },
      {
        ...SPONSOR_CONTRACT_CONFIG,
        address: a as `0x${string}`,
        functionName: "totalTokenPrizeAmounts",
        args: [env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT]
      },
    ])).flat()
  });  
}
