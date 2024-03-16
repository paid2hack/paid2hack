import { env } from "~/env";
import { MasterABi } from "./abi";

export const MASTER_CONTRACT_CONFIG = {
  address: env.NEXT_PUBLIC_MASTER_CONTRACT as `0x${string}`,
  abi: MasterABi,
} as const;
