'use client'

import '@rainbow-me/rainbowkit/styles.css'

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'

import {
  type GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth'

import { SessionProvider } from 'next-auth/react'
import { WagmiProvider, http } from 'wagmi'
import * as wagmiChains from 'wagmi/chains'

import { type FC, type PropsWithChildren } from 'react'

import { env } from '~/env'

const metadata = {
  title: "Paid2Hack",
  description: "Paid2Hack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

import { ConnectWallet, Disclaimer } from '~/ui/connectWallet'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: `Sign in to ${metadata.title}`,
})

const chain = (wagmiChains as any)[env.NEXT_PUBLIC_CHAIN]

const config = getDefaultConfig({
  appName: metadata.title,
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [chain],
  transports: {
    [chain.id]: http(env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT),
  },
  ssr: true,
})

const queryClient = new QueryClient()

export const WagmiLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <SessionProvider refetchInterval={0}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
            <RainbowKitProvider
              theme={darkTheme()}
              initialChain={chain}
              appInfo={{
                appName: metadata.title,
                disclaimer: Disclaimer,
              }}
            >
              <main className="relative min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="absolute right-2 top-2">
                  <ConnectWallet />
                </div>
                <div className="relative top-10 p-4">
                  {children}
                </div>
              </main>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  )
}



