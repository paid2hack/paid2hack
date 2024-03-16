import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useWalletClient, useAccount } from "wagmi";

export const useWallet = () => {
  const { chain, address } = useAccount();
  const { data: client } = useWalletClient();
  const session = useSession();

  const wallet = useMemo(() => {
    if (address && client) {
      return {
        client,
        isAuthenticated: session.status === "authenticated",
        address: address,
      };
    }
    return undefined;
  }, [address, client, session.status]);

  return wallet
}

