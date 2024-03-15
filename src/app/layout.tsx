import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { WagmiLayout } from "./wagmi-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
          {children}
        </WagmiLayout>
      </body>
    </html>
  );
}