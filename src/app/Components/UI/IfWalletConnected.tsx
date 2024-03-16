"use client"

import { FC, PropsWithChildren, ReactNode } from "react"
import { ConnectWallet } from "./ConnectWallet"
import { useWallet } from "~/app/hooks/wallet"

/*
  This component prevents its children from rendering if the user's wallet is not connected.
*/
export const IfWalletConnected: FC<PropsWithChildren<{ connectButton?: ReactNode }>> = ({ children, connectButton = <ConnectWallet /> }) => {
  const wallet = useWallet()

  return wallet?.isAuthenticated ? children : connectButton
}

