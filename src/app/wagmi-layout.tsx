'use client';

import '@rainbow-me/rainbowkit/styles.css';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';

import {
  RainbowKitSiweNextAuthProvider,
  type GetSiweMessageOptions,
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
import { cn } from './lib/utils';

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
      <SessionProvider refetchInterval={0}>
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
              <main className="relative min-h-screen bg-black text-white">
                <nav className="sticky top-0 z-50 flex items-center justify-around border-b-4 bg-black/90   px-4 backdrop-blur-sm ">
                  <Navbar className=" " />

                  <ConnectWallet />
                </nav>

                <div className="top-10 ">{children}</div>
              </main>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
};

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="hover:opacity-[0.9]text-white cursor-pointer"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute left-1/2 top-[calc(100%_+_1.7rem)] -translate-x-1/2 transform">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="overflow-hidden rounded-2xl border   border-white/[0.2]  shadow-xl backdrop-blur-sm"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="h-full w-max p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="boder relative flex space-x-4 rounded-full border-white/[0.2]   px-8 py-6 shadow-input "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="mb-1 text-xl font-bold  text-white">{title}</h4>
        <p className="max-w-[10rem] text-sm text-neutral-300">{description}</p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link {...rest} className=" text-neutral-200 hover:text-black ">
      {children}
    </Link>
  );
};

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn('z-50 mx-auto w-full  ', className)}>
      <Menu setActive={setActive}>
        <Link className="text-xl font-bold" href="/">
          Home
        </Link>
      </Menu>
    </div>
  );
}
