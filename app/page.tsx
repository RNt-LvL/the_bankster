"use client";

import { useEffect, useState } from "react";
import { TonConnectButton, useTonAddress, useTonWallet } from "@tonconnect/ui-react";

declare global {
  interface Window {
    Telegram?: { WebApp?: { ready: () => void; expand: () => void; colorScheme?: string } };
  }
}

export default function Home() {
  const address = useTonAddress();
  const wallet = useTonWallet();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.Telegram?.WebApp?.ready();
    window.Telegram?.WebApp?.expand();
  }, []);

  async function copyAddress() {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">b.</span><span>the bankster</span></div>
        <span className="network"><i /> TON NETWORK</span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR DIGITAL ASSETS</p>
        <h1>Money, <em>your</em> rules.</h1>
        <p className="sub">A simple self-custody wallet experience, built for Telegram.</p>
      </section>

      <section className="balance-card">
        <div className="card-head"><span>Total portfolio</span><span className="live-pill">● {wallet ? "WALLET CONNECTED" : "PREVIEW MODE"}</span></div>
        <div className="balance">$—<small> USD</small></div>
        <div className="balance-note">{wallet ? "Wallet linked. Live balances are the next integration step." : "Connect a wallet to get started."}</div>
        <div className="wallet-action"><TonConnectButton /></div>
        {address && <button className="address" onClick={copyAddress}>{address.slice(0, 8)}…{address.slice(-8)} <span>{copied ? "COPIED" : "COPY ADDRESS"}</span></button>}
      </section>

      <section className="actions">
        <button className="action" disabled={!address} title={!address ? "Connect your wallet first" : "Transfer flow is being added"}>
          <span className="action-icon">↗</span><b>Send</b><small>Transfer assets</small>
        </button>
        <button className="action" disabled={!address} title={!address ? "Connect your wallet first" : "Receive flow is being added"}>
          <span className="action-icon">↙</span><b>Receive</b><small>Get a payment</small>
        </button>
        <button className="action" disabled><span className="action-icon">⇄</span><b>Swap</b><small>Coming later</small></button>
      </section>

      <section className="assets">
        <div className="section-title"><h2>Your assets</h2><span>TON ECOSYSTEM</span></div>
        <div className="asset-row">
          <div className="coin ton">T</div><div className="asset-name"><b>Toncoin</b><small>TON</small></div>
          <div className="asset-value"><b>— TON</b><small>Balance pending</small></div>
        </div>
        <div className="asset-row">
          <div className="coin usdt">$</div><div className="asset-name"><b>Tether</b><small>USDT · TON</small></div>
          <div className="asset-value"><b>— USDT</b><small>Balance pending</small></div>
        </div>
      </section>

      <section className="activity">
        <div className="section-title"><h2>Activity</h2><span>RECENT TRANSACTIONS</span></div>
        <div className="empty"><span>⌁</span><b>No transactions yet</b><small>Your on-chain activity will appear here.</small></div>
      </section>

      <footer><span>THE BANKSTER</span><span>NON-CUSTODIAL · TON</span></footer>
      <p className="disclaimer">Prototype interface. Portfolio values and transaction history are not connected yet. Never share your seed phrase or private keys.</p>
    </main>
  );
}
