# the bankster — Telegram Mini App starter

Dark-theme, non-custodial TON wallet interface prototype.

## Included now
- Next.js app shell and responsive dark UI
- TON Connect wallet connection button (`@tonconnect/ui-react`)
- Connected wallet address display and copy
- Telegram Mini App `ready()` / `expand()` hooks
- Clearly marked placeholders for balances, USDT, transfers and activity

## Not implemented yet
- Live TON / USDT balance indexing
- Transaction history and verified transaction status
- Send/receive flows
- Backend, database, admin panel, analytics
- Authentication validation for Telegram `initData`
- Production monitoring, audit, legal/compliance review

Do not present placeholders as live financial data. This starter does not hold keys or custody user funds.

## Run locally
Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Connect Telegram
1. Create a bot using Telegram's official BotFather.
2. Deploy this web app to an HTTPS host.
3. Set `public/tonconnect-manifest.json` `url` and `iconUrl` to the deployed domain.
4. Set the same deployed URL in `app/providers.tsx` only if you want a fixed manifest URL; otherwise its current origin-based URL works.
5. Configure the bot's Mini App URL / menu button in BotFather.
6. Test from Telegram clients on iOS, Android and Desktop.

## Security requirements before real-money launch
- Use TON Connect for wallet connection and transaction signing. Never request or store seed phrases/private keys.
- Validate Telegram `initData` on the backend; never trust client-provided user IDs.
- Read balances and transaction state from a reputable TON indexer/API; handle stale data and rate limits.
- For USDT, verify the official TON jetton master address from authoritative Tether/TON sources before enabling display or transfers. Never trust a token ticker alone.
- Build transaction previews, destination/amount validation, network checks, fee disclosure and explicit wallet confirmation.
- Add rate limiting, secure headers, dependency scanning, logging without secrets, and an independent security review.
- Get legal advice before offering exchange, custody, fiat on/off ramps, cards or financial services in any country.

## Suggested next milestones
1. Add TON mainnet balance and verified USDT jetton balance.
2. Add receive QR/address and transaction history.
3. Add send flow with wallet-side confirmation and testnet QA.
4. Add authenticated backend + database only for non-secret app data.
5. Review Telegram financial-service declarations and relevant legal requirements before public release.

## Architecture
```text
Telegram client
  └─ Mini App (Next.js / React)
       ├─ TON Connect UI ── user's TON wallet (keys stay in wallet)
       ├─ Telegram WebApp SDK
       └─ Read-only API layer (planned)
             ├─ TON indexer / RPC provider
             └─ PostgreSQL (planned: app settings, audit metadata; no secrets)
```
