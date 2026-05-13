# Saarthi UI — API Response Type Architecture

## Overview

TypeScript type architecture for a crypto analytics frontend that renders 6 different API response shapes from a backend that returns a uniform envelope with a `response_type` discriminator.

## API Envelope

All successful responses share this envelope:

```ts
interface SuccessEnvelope<T extends string, D> {
  success: true
  query: string
  response_type: T
  generated_sql: string
  execution_time_ms: number
  row_count: number
  explanation: string
  data: D
}
```

Error responses are a completely separate shape:

```ts
interface ErrorEnvelope {
  success: false
  error_code: "AGENT_REJECTED" | "EXECUTION_ERROR"
  reason: string
}
```

`success` is the single gate — if `false`, `response_type` and `data` are absent. No optional fields on success, no partial envelopes.

## Data Payload Types

### ScreenerData
```ts
interface ScreenerData {
  focus: string
  filters: Record<string, unknown>
  results: Array<{
    symbol: string
    name: string
    price: number
    percent_change_7d: number
    market_cap: number
    ml_signal: "Buy" | "Sell" | "Neutral"
  }>
}
```

### MlSignalsData
```ts
interface MlSignalsData {
  symbol: string
  signal: "Buy" | "Sell" | "Neutral" | "Strong Buy" | "Strong Sell"
  confidence: number
  model_version: string
  features: Record<string, unknown>
  timestamp: string
}
```

### MarketRegimeData
```ts
interface MarketRegimeData {
  regime: "bull" | "bear" | "sideways" | "volatile"
  confidence: number
  indicators: Array<{
    name: string
    value: number
    signal: "bullish" | "bearish" | "neutral"
  }>
}
```

### NewsData
```ts
interface NewsData {
  articles: Array<{
    title: string
    url: string
    source: string
    published_at: string
    sentiment: "positive" | "negative" | "neutral"
    summary: string
    related_coins: string[]
  }>
}
```

### CoinDetailData
```ts
interface CoinDetailData {
  symbol: string
  name: string
  price: number
  market_cap: number
  volume_24h: number
  circulating_supply: number
  max_supply: number | null
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  all_time_high: number
  all_time_high_date: string
  description: string
  links: {
    website: string
    explorer: string
    whitepaper: string | null
  }
}
```

### CompositeData
```ts
interface CompositeData {
  query: string
  sections: Array<{
    label: string
    response_type: "screener" | "ml_signals" | "market_regime" | "news" | "coin_detail"
    data: unknown
  }>
}
```

Composite sections delegate to mini renderers. Each section's `data` is narrowed at the component boundary.

## Discriminated Union

```ts
type ResponseTypeMap = {
  screener: ScreenerData
  ml_signals: MlSignalsData
  market_regime: MarketRegimeData
  news: NewsData
  coin_detail: CoinDetailData
  composite: CompositeData
}

type DashboardResponse =
  | SuccessEnvelope<"screener", ScreenerData>
  | SuccessEnvelope<"ml_signals", MlSignalsData>
  | SuccessEnvelope<"market_regime", MarketRegimeData>
  | SuccessEnvelope<"news", NewsData>
  | SuccessEnvelope<"coin_detail", CoinDetailData>
  | SuccessEnvelope<"composite", CompositeData>
  | ErrorEnvelope
```

Adding a new response type: add interface → add to `ResponseTypeMap` → add union branch. Switch exhaustiveness is compiler-enforced.

## Renderer Strategy

Top-level dispatch via object lookup, not a switch:

```ts
const renderers: Record<string, React.ComponentType<{ response: any }>> = {
  screener: ScreenerRenderer,
  ml_signals: MlSignalsRenderer,
  market_regime: MarketRegimeRenderer,
  news: NewsRenderer,
  coin_detail: CoinDetailRenderer,
  composite: CompositeRenderer,
}

function ResponseCard({ response }: { response: DashboardResponse }) {
  if (!response.success) return <ErrorCard error={response} />
  const Renderer = renderers[response.response_type]
  return <Renderer response={response} />
}
```

Each renderer receives the full typed envelope. Composite sections use mini renderers that receive only `{ data: unknown }` narrowed at entry.

## Edge Cases

### Composite responses
Composite renderer maps `response_type` per section to a mini renderer. Mini renderers are distinct components from full-page renderers — no component reuse, no conditional props.

### Error responses
Exhaustive check on `success` before accessing `response_type`/`data`. ErrorEnvelope is a separate union branch — no optional fields on success.

## Strictness Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Envelope fields | All required | No partials — API is deterministic |
| Dynamic fields | `Record<string, unknown>` | `filters` and `features` vary per response |
| Renderer props | No `any` | One controlled cast at dispatch boundary |
| Array access | Default strict | Consider `noUncheckedIndexedAccess` |
| Component reuse | None between full and mini | Separate concerns, separate components |

## Pitfalls to Avoid

1. **Don't make `response_type` optional on success.** Union branches enforce presence + match.
2. **Don't unwrap the envelope at the API layer.** Renderers need `query`, `explanation`, etc.
3. **Don't reuse renderer components for composite sections.** Mini renderers are separate.
4. **Don't use `any` in the renderer record pattern.** Use `unknown` + thin assertion.
5. **Add new types in one place.** Interface → `ResponseTypeMap` → union branch → done.

## File Structure

```
src/types/
  api.ts          — Envelope, ResponseTypeMap, DashboardResponse, ErrorEnvelope
  data.ts         — All 6 data payload interfaces

src/components/
  ResponseCard.tsx        — Dispatcher component
  renderers/
    ScreenerRenderer.tsx
    MlSignalsRenderer.tsx
    MarketRegimeRenderer.tsx
    NewsRenderer.tsx
    CoinDetailRenderer.tsx
    CompositeRenderer.tsx
    ErrorCard.tsx
```

## Future Considerations

- If response types grow past ~15, consider codegen from OpenAPI schema
- If composite becomes heterogeneous, define a typed section union per composite type
- WebSocket streaming would reuse same types — envelope doesn't change
