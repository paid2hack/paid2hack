import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PropsWithClassName<P = unknown> = P & { className?: string };

export const isSameEthereumAddress = (a?: string, b?: string) => a && b && a.toLowerCase() === b.toLowerCase()