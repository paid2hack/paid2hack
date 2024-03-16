import '~/styles/globals.css';

import { Inter, Montserrat } from 'next/font/google';
import { WagmiLayout } from './wagmi-layout';

const inter = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <WagmiLayout>
          <div className="mx-auto max-w-screen-lg">{children}</div>
        </WagmiLayout>
      </body>
    </html>
  );
}
