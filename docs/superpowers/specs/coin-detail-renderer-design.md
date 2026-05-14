# Coin Detail Renderer — Design Spec

## Overview

Analytical drill-down dashboard for the `coin_detail` response type. Dense terminal layout with price hero, two-column signal + metrics grid, and restrained price chart. Bloomberg terminal aesthetic: `#0a0a0a` background, `#00ff41` green, `#ff3131` red, `#ffb700` amber, `#2a2a2a` borders, monospace font throughout.

## Data Shape

```ts
interface CoinDetailData {
  slug: string
  name: string
  symbol: string
  price: number
  market_cap: number
  cmc_rank: number
  changes: { "1h": number; "24h": number; "7d": number; "30d": number }
  metrics: {
    distance_from_ath_pct: number
    distance_from_atl_pct: number
    turnover: number
    prism_score: number
  }
  on_chain: {
    active_addresses_24h: number
    tx_count_24h: number
    large_holder_change_7d_pct: number
  }
  price_history: Array<{ t: string; price: number }>
  latest_signal: { direction: "Buy" | "Sell" | "Hold"; confidence: number }
}
```

## Layout

Three sections stacked vertically:

```
┌──────────────────────────────────────────────────────────────────┐
│ BTC  #1                                                          │
│ Bitcoin                                                          │
│ $75,420.00                                                       │
│ 1h +0.32%  24h +1.84%  7d -2.15%  30d +8.47%                    │
│ Market Cap  $1.49T                                               │
├─────────────────┬────────────────────────────────────────────────┤
│ LATEST SIGNAL   │ METRICS                                       │
│ [ HOLD ]        │ Distance from ATH     12.4%                   │
│ ██████████░░ 63%│ Distance from ATL     ~100.0M%                │
│                 │ Turnover              0.038                    │
│                 │ Prism Score           76.2                     │
│                 │ ON-CHAIN                                       │
│                 │ Active Addresses      892K                     │
│                 │ TX Count              412K                     │
│                 │ Large Holder 7d       +1.24%                   │
├─────────────────┴────────────────────────────────────────────────┤
│ ╱╲    ╱╲   ╱╲                                                    │
│╱  ╲──╱  ╲─╱  ╲──╱╲──╱╲──╱╲──╱╲──╱╲──╱╲──                       │
└──────────────────────────────────────────────────────────────────┘
```

## Component Structure

### CoinDetailRenderer.tsx

Main component. Composes all 4 sub-components vertically. Receives `SuccessEnvelope<"coin_detail", CoinDetailData>`. Destructures all data fields and passes them to child components.

### CoinHero.tsx

Identity + pricing zone. Four visual tiers:
- **Row 1**: Symbol (16px bold) + rank pill (`#1` in 10px dim bordered pill)
- **Row 2**: Full name (11px dim, ellipsis for long names, max-width 300px)
- **Row 3**: Price (24px bold, white, `$75,420.00` format with comma separators)
- **Row 4**: Change strip — 4 periods inline: `1h +0.32%` — green for positive, red for negative, dim for zero
- **Row 5** (conditional): Market cap via `formatCompactCoin`, shown when `market_cap > 0`

### SignalCallout.tsx

Fixed-width left column (160px) containing:
- Header: `LATEST SIGNAL` in 9px uppercase dim
- Badge: `[ HOLD ]` in direction color (green/red/amber), border-only styling, no filled background
- Confidence bar: 6px inline bar with `var(--border)` track + direction-colored fill
- Label: `63% confidence` below bar
- Dimming: `opacity: 0.4` applied when `confidence < 0.3`

### MetricsGrid.tsx

Flex-fill right column containing two labeled sections:
- **Metrics**: distance_from_ath_pct, distance_from_atl_pct, turnover, prism_score
- **On-Chain**: active_addresses_24h, tx_count_24h, large_holder_change_7d_pct

Each row: label (dim, ellipsis-safe, 180px max-width) + value (right-aligned, tabular-nums).

### PriceChart.tsx

Full-width recharts line chart at the bottom. 140px height.
- No grid lines (YAxis hidden), no dots, no tooltips, no animation
- Green stroke if `last price >= first price`, red otherwise
- Stroke width 1.5px
- Zero chart margin
- Sparse data (< 2 points): renders `—` dim dash

## Number Formatting

Five formatters in `formatters.ts`:

| Function | Input | Output | Notes |
|---|---|---|---|
| `formatPrice` | 75420 | `$75,420.00` | locale-formatted, always 2 decimals |
| `formatPercent` | 1.84 | `+1.84%` | forced `+` sign on positive |
| `formatLargeNumber` | 892000 | `892K` | T/B/M/K suffixes, 1-2 decimals |
| `formatInfinitePercent` | 99999999.99 | `~100.0M%` | `~` prefix when > 10,000 |
| `formatCompactCoin` | 1492000000000 | `$1.5T` | `$` prefix, T/B/M |

## Edge Cases

| Scenario | Behavior |
|---|---|
| Sparse price_history (< 2) | Chart hidden, `—` rendered |
| Missing on-chain (value === 0) | Shows `--` in dim text |
| Low-confidence signal (< 0.3) | Badge dimmed to 0.4 opacity |
| Long coin name (> 30 chars) | `text-overflow: ellipsis`, 300px max-width |
| Extreme percent changes | `formatPercent` shows full value |
| distance_from_atl_pct > 10,000% | `~100.0M%` format |
| Price at extreme (> $1M) | `toLocaleString` handles comma separators |

## CSS Namespace

BEM convention under `.coin-detail-*`:

```
.coin-detail                       — wrapper
.coin-detail__hero                 — identity + price + changes zone
.coin-detail__identity             — symbol + rank row
.coin-detail__symbol               — symbol text (16px bold)
.coin-detail__rank                 — rank pill
.coin-detail__name                 — full name (11px dim)
.coin-detail__price                — price (24px bold)
.coin-detail__changes              — change strip
.coin-detail__change-period        — period label (dim)
.coin-detail__body                 — two-column flex container
.coin-detail__signal-column        — signal callout (160px fixed)
.coin-detail__signal-header        — LATEST SIGNAL label
.coin-detail__signal-badge         — direction badge
.coin-detail__signal-badge--buy    — green variant
.coin-detail__signal-badge--sell   — red variant
.coin-detail__signal-badge--hold   — amber variant
.coin-detail__signal-badge--dim    — low-confidence dimming
.coin-detail__confidence-label     — confidence percentage
.coin-detail__metrics-column       — metrics flex-fill column
.coin-detail__metrics-section      — grouped metric section
.coin-detail__metrics-header       — METRICS / ON-CHAIN label
.coin-detail__metric-row           — label-value pair row
.coin-detail__metric-label         — metric name (dim, ellipsis)
.coin-detail__metric-value         — formatted value
.coin-detail__chart                — price chart container (140px)
.coin-detail__chart-empty          — sparse data placeholder
```

## TypeScript Decisions

- **No `any`**: All formatters and components strictly typed
- **`as const` assertion** on `CHANGE_PERIODS` array to infer literal tuple type
- **`displayValue` pattern**: label-based dispatch with per-field formatting in `MetricsGrid`, avoiding complex generics
- **Zero-value convention**: `value === 0` treated as missing for on-chain metrics, showing `--`
- **All interfaces inline**: Props interfaces co-located with components, not extracted into shared types
