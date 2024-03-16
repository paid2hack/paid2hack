import { env } from "~/env";
import { masterAbi, sponsorAbi, erc20Abi, sponsorBytecode } from "./exports";

export const MASTER_CONTRACT_CONFIG = {
  address: env.NEXT_PUBLIC_MASTER_CONTRACT as `0x${string}`,
  abi: masterAbi,
} as const;

export const PAYMENT_TOKEN_CONTRACT_CONFIG = {
  address: env.NEXT_PUBLIC_PAYMENT_TOKEN_CONTRACT as `0x${string}`,
  abi: erc20Abi,
} as const;

export const SPONSOR_CONTRACT_CONFIG = {
  abi: sponsorAbi,
} as const;

export const SPONSOR_CONTRACT_BYTECODE = sponsorBytecode;

export const DEFAULT_CONTRACT_QUERY_OPTIONS = {
  refetchInterval: 3000,
}