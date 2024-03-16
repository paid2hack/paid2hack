
'use client'

import { ConnectButton, DisclaimerComponent } from '@rainbow-me/rainbowkit'
import { PropsWithClassName } from '~/app/lib/utils';
import { FC } from 'react';
import { Button } from './Button';

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
                  <Button onClick={openConnectModal}>
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }
              return (
                <Button onClick={openAccountModal}>
                  {account.displayName}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}



