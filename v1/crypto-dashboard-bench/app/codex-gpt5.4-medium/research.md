# Research: Stablecoin Treasury Risk Dashboard

Access date for all links: July 16, 2026.

## Wedge decision

I chose a **stablecoin treasury risk cockpit** for crypto-native finance teams, controllers, and treasury operators rather than a generic portfolio dashboard.

Why this wedge won:

- It serves a recurring, high-value decision loop: "Can we safely hold, move, redeem, and rebalance treasury cash-equivalents right now?"
- It fits current market demand better than a retail watchlist. Institutional buyers are emphasizing governance, compliance, liquidity, and operational controls rather than pure market discovery.
- It creates a product surface where crypto-native trust and risk communication matter: reserve transparency, venue concentration, chain fragmentation, wallet permissions, and incident response.

## Segment and buyer research

### 1. Institutional crypto adoption is becoming more risk-disciplined

Source:
- Coinbase Institutional + EY-Parthenon, "2026 Institutional Investor Digital Assets Survey"
  URL: https://www.coinbase.com/institutional/research-insights/research/insights-reports/2026-institutional-investor-survey-e-and-y

Findings:
- Coinbase says its January 2026 survey of 351 institutional decision-makers showed a shift toward stronger governance, regulated products, and risk management.
- The page highlights that 49% of institutions strengthened emphasis on risk management, liquidity, and position sizing.
- It also says 85% of respondents either use or are interested in using stablecoins for internal cash management and money movement.
- Security/key-signing protocols and regulatory compliance are described as major custodian-selection factors in 2026.

Decision changed:
- This pushed the product away from "investor performance analytics" and toward **operational treasury controls** for teams already using stablecoins for cash management.

### 2. Stablecoins are moving into financial infrastructure, not just trading

Sources:
- Chainalysis, "The $100 Trillion Wealth Shift: Stablecoin Utility and the Future of Payments"
  URL: https://www.chainalysis.com/blog/stablecoin-utility-future-of-payments/
- Visa, "Stablecoin strategy: How financial institutions can create better value propositions for customers"
  URL: https://corporate.visa.com/en/services/visa-consulting-analytics/insights/vca-stablecoin-strategy.html
- Visa, "Making sense of stablecoins"
  URL: https://corporate.visa.com/en/sites/visa-perspectives/trends-insights/making-sense-of-stablecoins.html

Findings:
- Chainalysis frames stablecoins as payment infrastructure and highlights direct competition with legacy rails over time.
- Visa says stablecoin supply grew over 50% in 2025, from $186B in December 2024 to $274B in December 2025.
- Visa also argues that on-chain analytics are necessary because raw volume overstates economically meaningful activity.

Decision changed:
- The dashboard should not present raw balances alone. It should emphasize **usable liquidity**, **confidence bands**, and **adjusted operational risk** rather than vanity numbers.

## Category and product convention research

### 3. Treasury incumbents sell security, policy control, and workflow connectivity

Sources:
- Fireblocks, "Treasury management for digital assets"
  URL: https://www.fireblocks.com/products/treasury-management
- Fireblocks, "What Is Treasury Management? Traditional Finance vs Digital Assets"
  URL: https://www.fireblocks.com/glossary/treasury-management

Findings:
- Fireblocks positions digital-asset treasury around policy controls, approval workflows, wallet security, automation, and connectivity to exchanges and protocols.
- The glossary page explicitly contrasts traditional treasury with crypto treasury: 24/7 markets, irreversible settlement, wallet-based custody, and on-chain reconciliation.
- Fireblocks also stresses that reporting and governance are foundational, not optional.

Decision changed:
- The frontend demo should feel like a **risk desk**, not a chart gallery.
- Core UI objects should be policies, exceptions, counterparties, wallets, and actions.

### 4. Retail/on-chain intelligence products are broader and signal-heavy

Sources:
- Nansen, "Crypto Portfolio Tracker"
  URL: https://nansen.ai/crypto-portfolio-tracker
- Nansen Academy, "About Nansen 2"
  URL: https://academy.nansen.ai/en/help/articles/9625466-nansen-superapp

Findings:
- Nansen emphasizes wallet tracking, token insights, multichain portfolio views, and smart-money signals.
- The positioning is more exploratory and research-oriented than treasury-control-oriented.

Decision changed:
- I avoided a "superapp" dashboard. The product should instead have a **narrower promise**: keep treasury cash-equivalents inside defined risk limits and surface what to do next.

## Data model research

### 5. Crypto treasury data needs issuer, chain, venue, and wallet dimensions

Sources:
- Fireblocks treasury glossary
  URL: https://www.fireblocks.com/glossary/treasury-management
- DefiLlama, "Data Definitions"
  URL: https://defillama.com/data-definitions
- DefiLlama, "Stablecoins by Chain"
  URL: https://defillama.com/stablecoins/chains

Findings:
- Fireblocks confirms that digital-asset treasury differs because assets live across wallets, exchanges, and protocols rather than bank accounts.
- DefiLlama's definitions and chain pages reinforce that stablecoin supply, chain distribution, and liquidity context are core analysis dimensions.
- DefiLlama treats stablecoin market cap by chain as a proxy for liquidity and trust/adoption.

Decision changed:
- The entity model for the PRD should include:
  - issuer
  - asset
  - chain
  - wallet/account
  - venue/counterparty
  - policy threshold
  - flow event
  - reserve/provenance source

### 6. ERC-20 approvals are part of the real risk surface

Sources:
- Ethereum EIP-20
  URL: https://eips.ethereum.org/EIPS/eip-20
- Ethereum EIP-2612
  URL: https://eips.ethereum.org/EIPS/eip-2612
- MetaMask, "What is a token approval?"
  URL: https://support.metamask.io/stay-safe/safety-in-web3/what-is-a-token-approval
- MetaMask, "How to revoke smart contract allowances/token approvals"
  URL: https://support.metamask.io/more-web3/learn/how-to-revoke-smart-contract-allowances-token-approvals/

Findings:
- ERC-20 explicitly includes `approve` and `transferFrom`, which means token spending permissions are fundamental to how many crypto workflows operate.
- EIP-2612 adds signed approvals (`permit`), reducing friction but expanding the importance of signature understanding and replay protection.
- MetaMask distinguishes wallet connection from token approvals and warns that approvals can persist after disconnecting a dapp.

Decision changed:
- The product must communicate **trust boundaries** clearly.
- "Wallet connected" and "tokens spendable by a contract" should never be conflated.
- Risk copy in the product should reflect that permissions and custody are separate concepts.

## Risk, trust, and compliance research

### 7. Reserve transparency and redeemability are first-order stablecoin risk signals

Source:
- Circle, "Transparency & Stability"
  URL: https://www.circle.com/transparency

Findings:
- Circle publicly exposes reserve composition, circulation, reserve balances, and issuance/redemption changes, with dated updates.
- The page states USDC reserve holdings are fully disclosed weekly and receive monthly third-party assurance.

Decision changed:
- The product should treat **reserve transparency** and **redeemability path** as explicit fields, not buried metadata.
- Issuer comparison in the UI should not be reduced to price or market cap.

### 8. Sanctions/AML expectations increasingly extend through the stablecoin lifecycle

Sources:
- FATF, "Targeted report on Stablecoins and Unhosted Wallets - Peer-to-Peer Transactions"
  URL: https://www.fatf-gafi.org/en/publications/Virtualassets/targeted-report-stablecoins-unhosted-wallets.html
- FinCEN, "Treasury Proposes Rule to Implement the GENIUS Act's Requirements to Counter Illicit Finance" (April 8, 2026)
  URL: https://www.fincen.gov/news/news-releases/treasury-proposes-rule-implement-genius-acts-requirements-counter-illicit
- OFAC FAQ 1021
  URL: https://ofac.treasury.gov/faqs/1021

Findings:
- FATF's March 3, 2026 report highlights illicit-finance risks around stablecoins and unhosted-wallet P2P activity.
- FinCEN's April 8, 2026 release says Treasury proposed a rule implementing GENIUS Act AML and sanctions compliance requirements for permitted payment stablecoin issuers.
- OFAC states sanctions obligations apply to virtual currency activity and firms must take risk-based steps to avoid prohibited transactions.

Decision changed:
- Compliance requirements in the PRD need to include:
  - sanctions-aware counterparty screening assumptions
  - policy/audit logs
  - role-based permissions
  - incident recordkeeping
- The dashboard should support buyer messaging for finance, legal, and compliance stakeholders, not only treasury ops.

### 9. Wallet safety patterns depend on transaction clarity, not just custody brand

Sources:
- Ledger, "Crypto Security 2026: How To Avoid Scams and Hacks in 2026"
  URL: https://www.ledger.com/academy/topics/security/crypto-security-2026-how-to-avoid-scams-and-hacks-in-2026
- Ledger, "What Is Clear Signing?"
  URL: https://www.ledger.com/academy/topics/ledgersolutions/what-is-clear-signing
- MetaMask, "How to manage security alerts to protect your wallet"
  URL: https://support.metamask.io/configure/wallet/how-to-enable-automatic-security-checks-mobile

Findings:
- Ledger emphasizes blind signing and malicious approvals as major loss vectors.
- MetaMask positions verified badges, warnings, malicious-site classifications, and transaction simulation as trust signals, while explicitly saying they are not guarantees.

Decision changed:
- The product should communicate **confidence**, **warning**, and **not guaranteed** semantics.
- Alerts need to explain what they mean operationally instead of pretending to be perfect truth.

## Visualization research

### 10. Good dashboards focus on a few decisions and show uncertainty explicitly

Sources:
- Observable, "Seven essential tips for designing better dashboards"
  URL: https://observablehq.com/blog/seven-ways-design-better-dashboards
- Datawrapper Academy, "How to show confidence intervals in Datawrapper line charts"
  URL: https://www.datawrapper.de/academy/how-to-show-confidence-intervals-in-datawrapper-line-charts

Findings:
- Observable argues for visual hierarchy, a small set of key numbers, and coordinated views instead of clutter.
- Datawrapper's guidance reinforces that uncertainty should be shown, not hidden.

Decision changed:
- The product should use:
  - a top-line command layer with only a handful of metrics
  - explicit confidence/risk labels
  - drill-down composition views
  - event tape instead of a cluttered chart wall

## GTM and monetization research

### 11. The selected wedge is sold like enterprise infrastructure, not like a retail subscription

Sources:
- Fireblocks treasury product page
  URL: https://www.fireblocks.com/products/treasury-management
- CoinTracker home page and support pricing pages
  URL: https://www.cointracker.io/
  URL: https://support.cointracker.io/hc/en-us/articles/4413049695249-CoinTracker-Personal-plan-pricing

Findings:
- Fireblocks uses demo-led enterprise GTM around security, governance, and infrastructure outcomes.
- CoinTracker uses self-serve subscription pricing tied to user transaction volume and tax workflows.

Decision changed:
- This product should be positioned as **B2B SaaS sold to treasury, finance, and ops teams**.
- Monetization should be seat- and entity-based, not ad-supported or purely AUM-based.

## Final product choice

### Chosen wedge

**Sentinel Treasury**: a stablecoin treasury risk cockpit for crypto-native finance teams and controllers.

### Primary user

Treasury operator or finance controller at a crypto company, DAO foundation, exchange-adjacent business, market maker, or stablecoin-heavy fintech.

### Core recurring decision

"Do we still have reliable, policy-compliant digital cash across issuers, chains, and venues, and what action should we take before conditions worsen?"

### Why this is defensible

- It is focused on a real operational loop rather than a broad "see everything" promise.
- It translates crypto-specific risk into finance-readable controls.
- It sits between custody tooling, portfolio tooling, and compliance tooling without needing to replace all of them.
- It is demo-friendly because the most valuable UX is **decision framing and trust communication**, not live trading.

## Source inventory

1. Coinbase Institutional + EY-Parthenon, 2026 Institutional Investor Digital Assets Survey
   https://www.coinbase.com/institutional/research-insights/research/insights-reports/2026-institutional-investor-survey-e-and-y
2. Chainalysis, Stablecoin Utility and the Future of Payments
   https://www.chainalysis.com/blog/stablecoin-utility-future-of-payments/
3. Visa, Stablecoin strategy
   https://corporate.visa.com/en/services/visa-consulting-analytics/insights/vca-stablecoin-strategy.html
4. Visa, Making sense of stablecoins
   https://corporate.visa.com/en/sites/visa-perspectives/trends-insights/making-sense-of-stablecoins.html
5. Fireblocks, Treasury management for digital assets
   https://www.fireblocks.com/products/treasury-management
6. Fireblocks, What Is Treasury Management?
   https://www.fireblocks.com/glossary/treasury-management
7. DefiLlama, Data Definitions
   https://defillama.com/data-definitions
8. DefiLlama, Stablecoins by Chain
   https://defillama.com/stablecoins/chains
9. EIP-20
   https://eips.ethereum.org/EIPS/eip-20
10. EIP-2612
    https://eips.ethereum.org/EIPS/eip-2612
11. Circle, Transparency & Stability
    https://www.circle.com/transparency
12. FATF, Targeted report on Stablecoins and Unhosted Wallets
    https://www.fatf-gafi.org/en/publications/Virtualassets/targeted-report-stablecoins-unhosted-wallets.html
13. FinCEN, Treasury Proposes Rule to Implement the GENIUS Act's Requirements to Counter Illicit Finance
    https://www.fincen.gov/news/news-releases/treasury-proposes-rule-implement-genius-acts-requirements-counter-illicit
14. OFAC FAQ 1021
    https://ofac.treasury.gov/faqs/1021
15. Ledger, Crypto Security 2026
    https://www.ledger.com/academy/topics/security/crypto-security-2026-how-to-avoid-scams-and-hacks-in-2026
16. Ledger, What Is Clear Signing?
    https://www.ledger.com/academy/topics/ledgersolutions/what-is-clear-signing
17. MetaMask, security alerts
    https://support.metamask.io/configure/wallet/how-to-enable-automatic-security-checks-mobile
18. MetaMask, token approvals
    https://support.metamask.io/stay-safe/safety-in-web3/what-is-a-token-approval
19. MetaMask, revoke approvals
    https://support.metamask.io/more-web3/learn/how-to-revoke-smart-contract-allowances-token-approvals/
20. Observable, dashboard design tips
    https://observablehq.com/blog/seven-ways-design-better-dashboards
21. Datawrapper Academy, confidence intervals in line charts
    https://www.datawrapper.de/academy/how-to-show-confidence-intervals-in-datawrapper-line-charts
