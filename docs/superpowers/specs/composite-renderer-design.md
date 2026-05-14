# Composite Renderer — Design Spec

## Overview

Orchestration-layer renderer for the `composite` response type. Maps `sections[]` to existing renderers via synthetic envelopes. No visualization logic — pure delegation. Bloomberg terminal aesthetic: `#0a0a0a` background, `#00ff41` green, `#ff3131` red, `#ffb700` amber, `#2a2a2a` borders, monospace font throughout.

## Data Shape

```ts
interface CompositeSection {
  response_type: "screener" | "ml_signals" | "market_regime" | "news" | "coin_detail"
  title: string
  data: unknown
}

interface CompositeData {
  sections: CompositeSection[]
}
```

## Architecture

The composite is not a visualization component. It is an orchestration layer with two responsibilities:

1. **Section wrapping** — Each section gets a compact 9px uppercase dim title header
2. **Renderer delegation** — A switch on `section.response_type` renders the corresponding existing renderer

All existing renderers are imported and reused. No renderer is modified. No visualization logic is duplicated.

## Synthetic Envelope Strategy

Each existing renderer expects `SuccessEnvelope<T, D>`. The composite builds minimal synthetic envelopes per section:

```ts
function buildEnvelope(type: "news", data: NewsData, rowCount: number): SuccessEnvelope<"news", NewsData>
// ... 5 typed overloads, one per response type
```

- `success: true`, `query: ""`, `explanation: ""`, `execution_time_ms: 0`
- `row_count` derived from section data array length where possible
- TypeScript overloads ensure each branch returns the exact envelope type the renderer expects
- One `data as Type` cast per branch at the dispatch boundary — controlled, no `any`

## Component Structure

### CompositeRenderer.tsx

Main component. Renders meta header + maps sections to CompositeSection wrappers.

- Meta header: `composite report · N sections` in 10px uppercase dim
- Empty state: `sections.length === 0` → centered `NO SECTIONS`
- Maps sections: `sections.map((s, i) => <CompositeSection key={s.response_type + i} section={s} />)`
- Unique keys via `response_type + index` handle repeated types

### CompositeSection.tsx

Per-section dispatcher. Switch on `section.response_type`:

| Case | Renderer | row_count source |
|---|---|---|
| `screener` | ScreenerRenderer | `data.rows.length` |
| `ml_signals` | MlSignalsRenderer | `data.signals.length` |
| `market_regime` | MarketRegimeRenderer | `1` (single state) |
| `news` | NewsRenderer | `data.articles.length` |
| `coin_detail` | CoinDetailRenderer | `1` (single coin) |
| `default` | UnknownSection | — |

### SectionHeader.tsx

- Renders `title.toUpperCase()` in 9px dim text, letter-spacing 1px
- Returns `null` for empty title string
- No border — keeps visual weight low

### UnknownSection.tsx

- Renders `[UNKNOWN] {responseType}` in dim text with border-top
- Safe fallback for unexpected or future response types

### buildEnvelope.ts

- 5 typed overload signatures + 1 broader implementation
- Implementation returns `as SuccessEnvelope<string, unknown>` — the single controlled cast in the composite

## OutputCanvas Integration

```tsx
case "composite":
  return <CompositeRenderer response={response} />
```

All 6 response types now have dedicated renderers. The OutputCanvas switch is exhaustive — no `default` branch. Adding a new type to `DashboardResponse` triggers a compile error on the switch.

## Edge Cases

| Scenario | Behavior |
|---|---|
| Empty sections[] | `NO SECTIONS` centered dim text |
| Unknown response_type | `[UNKNOWN] <type>` placeholder |
| Repeated renderer types | Each renders independently with unique `key` |
| Empty title string | Section header is omitted |
| Section data with empty arrays | Nested renderer handles its own empty state |
| Large composite (10+ sections) | Vertical stack, no virtualization — within project scope |
| Single section | Renders normally — one section wrapper + one delegated renderer |

## CSS Namespace

BEM convention under `.composite-*`:

```
.composite                    — wrapper
.composite__meta              — meta header
.composite__empty             — NO SECTIONS empty state
.composite-section__header    — section title (9px uppercase dim)
.composite-unknown            — unknown section placeholder
```

Each nested renderer preserves its own CSS namespace (`.screener`, `.ml-signals`, `.regime`, `.news`, `.coin-detail`). The composite does not override or wrap renderer borders — each renderer keeps its full visual identity.

## Responsive Behavior

- Sections stack vertically — no horizontal constraints
- Each delegated renderer handles its own overflow and text truncation
- No hard widths on the composite container
- Section headers are single-line text — no wrapping issues

## TypeScript Decisions

- **No `any`** — overloaded `buildEnvelope` provides typed returns per branch
- **Controlled cast boundary** — `data as ScreenerData` etc. in each switch branch, structurally equivalent to OutputCanvas narrowing
- **Exhaustive switch** — composite section types are a union literal; adding a new type to `CompositeSection.response_type` requires a new switch branch
- **Null Safety** — empty title returns null, empty sections check at renderer level
