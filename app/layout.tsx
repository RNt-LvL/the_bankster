import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "./providers";

export const metadata: Metadata = {
  title: "the bankster",
  description: "A TON wallet experience inside Telegram"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><WalletProvider>{children}</WalletProvider></body></html>;
}
