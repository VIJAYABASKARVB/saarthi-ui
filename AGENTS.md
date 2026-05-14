# Saarthi UI — Agent Instructions

## Project Overview

Frontend for an NL-to-SQL crypto analytics agent (Saarthi AI). Renders 6 discriminated response types from a uniform envelope. All data is mock-based — swap `mockLoader.ts` for a real fetch to connect to production.

**Stack:** React 19, TypeScript 6.0, Vite 8, Recharts 3 (price chart only), plain CSS (no modules, no Tailwind). ESLint 10 with typescript-eslint.

**Visual direction:** Bloomberg terminal aesthetic. `#0a0a0a` background, `#00ff41` green, `#ff3131` red, `#ffb700` amber, `#2a2a2a` borders. Monospace throughout (JetBrains Mono). No rounded corners, no shadows, no gradients. Dense information hierarchy.

## Critical Rules

- **Never use `any`.** Zero tolerance — enforced by `@typescript-eslint/no-explicit-any`. Use `as Type` casts only at controlled dispatch boundaries (see OutputCanvas.tsx pattern).
- **Never hardcode mock data in components.** All mock data lives in `public/mocks/`. Components receive data through typed props only.
- **Preserve the `DashboardResponse` discriminated union** (`src/types/api.ts:172-179`). Adding a new response type requires a new union branch, a new renderer, and a new case in OutputCanvas's exhaustive switch.
- **Preserve renderer semantics.** Each renderer has a unique visual identity — do not collapse them into generic tables or cards.
- **Composite renderer is orchestration-only.** No visualization logic. Reuses existing renderers via `buildEnvelope` synthetic envelopes. Never duplicate rendering code in the composite.
- **Preserve all 4 output states:** loading (FETCHING... + skeleton loader), error (EXECUTION_ERROR red panel), rejected (AGENT_REJECTED amber panel), empty (row_count === 0 explanation panel).
- **Never remove the `default` skeleton variant** in `SkeletonLoader.tsx`. Unknown query keywords must always produce a visible loading state.
- **Never import mock data directly.** Use `mockLoader.ts` which fetches from `public/mocks/` with an 800ms simulated delay.

## Project Structure

```
src/
  types/api.ts                    — All interfaces, discriminated union, type guards
  lib/mockLoader.ts               — Mock fetch with 800ms delay, returns DashboardResponse
  components/
    App.tsx                       — Root. Maps query keywords to mock filenames
    OutputCanvas.tsx              — Smart dispatcher: loading → error → rejected → empty → success
    QueryInput.tsx                — Terminal input with "> " prefix and quick-select chips
    skeletons/SkeletonLoader.tsx  — 6 renderer-specific skeleton variants
    renderers/
      ScreenerRenderer.tsx        — Table with sortable columns, density toggle, sparklines
      MlSignalsRenderer.tsx       — Signal cards with confidence/probability/feature bars
      MarketRegimeRenderer.tsx    — Hero card, 32px state name, dot timeline, transitions
      NewsRenderer.tsx            — Compact article feed, collapsible summaries, sentiment labels
      CoinDetailRenderer.tsx      — Price hero + two-column metrics grid + price chart
      CompositeRenderer.tsx       — Orchestration layer, delegates to all 5 renderers
      screener/                   — 5 sub-components (SparklineCell, ScreenerHeader, etc.)
      ml-signals/                 — 4 sub-components (SignalCard, ConfidenceBar, etc.)
      market-regime/              — 4 sub-components (RegimeState, HistoryDotStrip, etc.)
      news/                       — 4 sub-components (ArticleCard, SentimentDot, etc.)
      coin-detail/               — 5 sub-components (CoinHero, MetricsGrid, PriceChart, etc.)
      composite/                  — 4 sub-components (CompositeSection, buildEnvelope, etc.)
public/mocks/                     — 15 JSON files, 2+ per response type
docs/superpowers/specs/           — 7 design spec documents
docs/superpowers/plans/           — 6 implementation plan documents
```

## Response Types

| response_type | Renderer | Layout | Empty state |
|---|---|---|---|
| `screener` | ScreenerRenderer | Sortable table with sparkline cells | Empty rows array |
| `ml_signals` | MlSignalsRenderer | Stacked signal cards with probability bars | `NO SIGNALS` |
| `market_regime` | MarketRegimeRenderer | Single hero card, 32px state name | N/A (single state) |
| `news` | NewsRenderer | Two-zone compact cards, collapsible summary | `NO ARTICLES` |
| `coin_detail` | CoinDetailRenderer | Price hero + two-column metrics + chart | N/A (single coin) |
| `composite` | CompositeRenderer | Section wrappers delegating to above 5 renderers | `NO SECTIONS` |

**Error envelope** (any response_type): `EXECUTION_ERROR` → red panel. `AGENT_REJECTED` → amber panel. Both render `reason` text.

**Dispatch pattern** (`OutputCanvas.tsx:69-92`): `isLoading` → skeleton loader. `!response` → null. `!isSuccess()` → error/rejected. `row_count === 0` → empty. Otherwise → SuccessState with exhaustive switch.

## TypeScript Rules

- `erasableSyntaxOnly: true` — **no enums, no namespaces, no parameter properties.** Use `type` or const objects.
- `verbatimModuleSyntax: true` — use `import type` for type-only imports (e.g., `import type { DashboardResponse } from '...'`).
- `noUnusedLocals / noUnusedParameters: true` — build fails on unused declarations.
- `noFallthroughCasesInSwitch: true` — each switch case must `return` or `break`.
- `jsx: "react-jsx"` — automatic JSX runtime, no need to `import React`.
- Use discriminated unions over optional fields. Never make a field optional to handle "sometimes present" data — use separate union branches instead.
- Exhaustive switches preferred over `default` branches. A switch without `default` will fail at compile time when a new union member is added.

## UI Rules

- All colors must use CSS custom properties from `:root` (`--bg`, `--text`, `--green`, `--red`, `--amber`, `--border`, `--text-dim`).
- CSS follows BEM convention: `.block__element--modifier`. Each renderer has its own namespace (`screener-`, `ml-signals-`, `regime-`, `news-`, `coin-detail-`, `composite-`).
- No component library defaults. No Tailwind. No CSS-in-JS. All styles in `src/index.css`.
- Responsive breakpoint for mobile: 640px (currently only implemented for coin-detail; other renderers may overflow below 480px).
- Skeleton loaders must use the `.skeleton-bar` class with `skeleton-pulse` animation — not shimmer/gradient animations.
- Interactive elements must be semantic `<button>` elements with `:focus-visible` outlines.
- Formatters for compact numbers: `formatCompact` (screener) and `formatCompactCoin` (coin-detail) — consider consolidating into `src/lib/format.ts` if adding a new renderer.

## Verification Requirements

```bash
npm run lint     # eslint . — must exit 0
npm run build    # tsc -b && vite build — must exit 0
```

No test runner is configured. TypeScript + ESLint are the only verification gates.

## Known Gotchas

- `src/components/renderers/screener/SparklineCell.tsx` uses `last > first` for green (uptrend), `else` for red (flat or down). This is a deliberate financial convention — flat is not green.
- `src/components/renderers/composite/buildEnvelope.ts` has 5 TypeScript overloads + 1 implementation signature. If a new response type is added, add a corresponding overload here.
- `distance_from_atl_pct` in `MetricsGrid.tsx:12-14` is formatted as plain signed percentage (no compact suffixes). `distance_from_ath_pct` uses `formatInfinitePercent` which has compact suffixes for values > 10,000. These are intentionally different.
- `OutputCanvas.tsx` has no `default` branch — the switch is exhaustive. Adding a new response type to `DashboardResponse` will produce a compile-time error on this switch. This is the correct behavior.
- The `composite` mock files (`composite-happy.json`, `composite-single-section.json`) contain full nested data structures that must match per-type schemas. Adding a new mock to `composite` data requires both the composite wrapper and the nested renderer data to be valid.
- `mockLoader.ts` converts JSON via `as Promise<DashboardResponse>`. Adding a field to a type interface but not to the corresponding mock JSON will not produce a compile error — mocks must be maintained manually.
