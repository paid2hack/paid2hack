'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';

import {
  type GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth';

import { SessionProvider } from 'next-auth/react';
import { WagmiProvider, http } from 'wagmi';
import * as wagmiChains from 'wagmi/chains';

import { type FC, type PropsWithChildren } from 'react';

import { env } from '~/env';

const metadata = {
  title: 'Paid2Hack',
  description: 'Paid2Hack',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

import { ConnectWallet, Disclaimer } from '~/app/Components/UI/ConnectWallet';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: `Sign in to ${metadata.title}`,
});

const chain = (wagmiChains as any)[env.NEXT_PUBLIC_CHAIN];

const config = getDefaultConfig({
  appName: metadata.title,
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [chain],
  transports: {
    [chain.id]: http(env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export const WagmiLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <SessionProvider refetchInterval={0} basePath="/api/auth">
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider
              theme={darkTheme()}
              initialChain={chain}
              appInfo={{
                appName: metadata.title,
                disclaimer: Disclaimer,
              }}
            >
              <nav className="flex items-center justify-between bg-black p-4">
                <div className="">
                  <Link href="/">Home</Link>
                </div>
                <div className="absolute right-2 top-2">
                  <ConnectWallet />
                </div>
              </nav>
              <main className="relative min-h-screen bg-black text-white">
                <div className="top-10 ">{children}</div>
              </main>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
};
