'use client'

import { ConnectButton, DisclaimerComponent } from '@rainbow-me/rainbowkit'
import { PropsWithClassName } from './utils';
import { FC } from 'react';

export const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the terms of service and privacy policy.
  </Text>
);


export const ConnectWallet: FC<PropsWithClassName> = ({ className }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready ? {
              'aria-hidden': true,
              className,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            } : {
              className,
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal}>
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal}>
                    Wrong network
                  </button>
                );
              }
              return (
                <button onClick={openAccountModal}>
                  {account.displayName}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}



