# Saarthi UI

live-link:https://saarthi-ui-iota.vercel.app/

Adaptive output renderer for Crypto Prism's NL-to-SQL crypto analytics agent.

## Quick start

```bash
git clone https://github.com/VIJAYABASKARVB/saarthi-ui.git
cd saarthi-ui
npm install
npm run dev
```

Open `http://localhost:5173`. Type a query or click a chip.

## How to use

Type a natural language query in the terminal input, or click a quick-select chip. The frontend matches keywords to mock responses:

| Keyword | Response type | What you see |
|---------|---------------|-------------|
| `screener` | Screener | Sortable table of coins with sparklines |
| `signals` | ML Signals | Signal cards with probability bars |
| `regime` | Market Regime | Hero card with regime state |
| `news` | News | Compact article feed |
| `coin` | Coin Detail | Analytical dashboard with chart |
| `composite` | Composite | Aggregated multi-renderer view |
| `error` | Error | Rejected query error panel |

Any other keyword returns an empty state.

## Architecture

`OutputCanvas.tsx` is the smart dispatcher. It receives a `DashboardResponse`, narrows the type via a discriminated union, and delegates to the correct renderer. Each of the 6 renderers owns its layout, state, and edge cases independently.

`mockLoader.ts` intercepts fetch calls and returns mock JSON after an 800ms simulated delay, matching the real `DashboardResponse` contract exactly.

The `DashboardResponse` type is a strict TypeScript discriminated union — every renderer receives exactly the shape it expects, enforced at compile time. No `any`, no runtime type checks.

## Project structure

```
src/
  types/
    api.ts                  — Envelope types, data interfaces, discriminated union
  lib/
    mockLoader.ts           — Mock fetch with 800ms delay
  components/
    OutputCanvas.tsx         — Smart dispatcher
    QueryInput.tsx          — Terminal input + quick-select chips
    skeletons/
      SkeletonLoader.tsx    — Renderer-specific loading skeletons
    renderers/
      ScreenerRenderer.tsx   — Table with sorting + sparklines
      MlSignalsRenderer.tsx  — Signal cards with probability/feature bars
      MarketRegimeRenderer.tsx — Hero dashboard with dot timeline
      NewsRenderer.tsx       — Compact article feed
      CoinDetailRenderer.tsx — Analytical drill-down with chart
      CompositeRenderer.tsx  — Orchestration layer
      screener/...           — Sub-components per renderer
      ml-signals/...
      market-regime/...
      news/...
      coin-detail/...
      composite/...
public/
  mocks/                     — 15 mock JSON files, 2+ per type
docs/
  superpowers/
    specs/                   — Design specification documents
    plans/                   — Implementation plans
```

## How to swap mocks for a real backend

1. Open `src/lib/mockLoader.ts`
2. Replace the `fetch` call with a real API endpoint:

```ts
export async function loadMock(filename: string): Promise<DashboardResponse> {
  const res = await fetch(`https://api.saarthi.ai/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: filename }),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json() as Promise<DashboardResponse>
}
```

No component changes needed. The `DashboardResponse` type is already the contract — all 6 renderers consume it correctly.

## Mock data

`public/mocks/` contains 15 JSON files — at least 2 per response type covering happy path, empty states, and error responses. Each mock strictly matches the TypeScript schema in `src/types/api.ts`. Add new mocks by dropping a `.json` file and updating the keyword map in `App.tsx`.

## Tech stack

React 19, TypeScript 6, Vite 8, recharts 3 (price chart), plain CSS (no framework), ESLint 10 with typescript-eslint.
