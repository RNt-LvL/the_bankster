"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // Replace with the production HTTPS URL after deployment.
  const manifestUrl = typeof window !== "undefined"
    ? `${window.location.origin}/tonconnect-manifest.json`
    : "https://example.com/tonconnect-manifest.json";

  return <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>;
}
