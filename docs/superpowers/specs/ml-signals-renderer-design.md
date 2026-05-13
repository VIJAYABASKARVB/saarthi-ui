# ML Signals Renderer — Design Spec

## Overview

Card-based renderer for the `ml_signals` response type in Saarthi UI. Each signal gets a dense visual card showing direction, confidence, probability distribution, and feature contributions. Bloomberg terminal aesthetic: `#0a0a0a` background, `#00ff41` green, `#ff3131` red, `#ffb700` amber, `#2a2a2a` borders, monospace font throughout.

## Data Shape

```ts
interface MLSignal {
  slug: string
  name: string
  symbol: string
  direction: "Buy" | "Sell" | "Hold"
  signal_score: number     // 0-100
  confidence: number       // 0-1
  prob_buy: number         // 0-1, sums with prob_hold + prob_sell to 1.0
  prob_hold: number
  prob_sell: number
  top_features: Array<{ name: string; contribution: number }>  // 5 entries
  price: number
  percent_change24h: number
}

interface MlSignalsData {
  as_of: string
  model_version: string
  signals: MLSignal[]
}
```

## Layout

Cards stacked vertically in the output panel. No grid — Bloomberg terminals use vertical density for data like this. Each card is full-width with three horizontal zones.

### Card Structure

```
┌────────────────────────────────────────────────────────┐
│ SOL   $142.56   +3.21%                    [ BUY ]      │  ← Zone 1: Identity + Badge
│────────────────────────────────────────────────────────│
│ Score: 78.4   ████████████████████████░░░░  72%         │  ← Zone 2: Confidence bar
│ Prob: [████████████████████████░░░░░░░░████]            │
│       72% B                    21% H        7% S        │  ← Zone 2: Stacked probability
│────────────────────────────────────────────────────────│
│ Top Features:                                           │  ← Zone 3: Contributions
│ active_addresses_7d_ma     ████████████████████  0.184  │
│ staked_supply_pct          ██████████████████    0.152  │
│ dex_volume_24h_usd         ██████████████        0.131  │
│ price_momentum_30d         ███████████            0.098  │
│ funding_rate_perp          █████████              0.087  │
└────────────────────────────────────────────────────────┘
```

### Zone 1 — Identity

- Left: `SOL` (symbol) in bold, `$142.56` (price), `+3.21%` (change). All on one line separated by two spaces.
- Price change: green `+3.21%` / red `-4.67%` / dim `0.00%`. Same formatting as ScreenerRenderer.
- Right: direction badge. `border: 1px solid <color>`, text in matching color. No filled background.
  - Buy: green `var(--green)`
  - Sell: red `var(--red)`  
  - Hold: amber `var(--amber)`

### Zone 2 — Scores

**Confidence bar:** Full-width thin horizontal bar, 6px height.
- Track: `var(--border)`
- Fill: direction color at full opacity
- Width = `confidence * 100` percent
- Label right-aligned: `72%`

**Probability bar:** Single stacked segmented bar, 8px height.
- Three contiguous segments: green (prob_buy), amber (prob_hold), red (prob_sell)
- Segment widths proportional to each probability
- Labels below: `72% B · 21% H · 7% S` in `font-size: 10px`, tabular-nums

**Signal score:** Numeric label only. `Score: 78.4` in dim text. No bar — the confidence bar already gives visual weight.

### Zone 3 — Feature Contributions

List of 5 rows, each with:
- Feature name: left-aligned, truncated with ellipsis (`max-width: 200px`), dim text
- Contribution bar: inline horizontal bar, height 4px, width proportional to `Math.abs(contribution)` scaled to the max contribution in the set
- Bar color: green if contribution > 0, red if contribution < 0, dim if 0
- Numeric value: right-aligned, `font-variant-numeric: tabular-nums`, sign shown

## Color Rules

- No filled backgrounds on any element except thin bars (6px max height)
- Direction badge uses border + text only
- All bars render against `var(--border)` track
- Price change uses opacity bands (not full brightness) for differentiation
- Feature contribution bars at 70% opacity to reduce visual noise

## File Structure

```
src/components/renderers/
  MlSignalsRenderer.tsx          — Main component. Renders header (as_of, model_version), meta bar, maps signals[] → SignalCard stack.

  ml-signals/
    SignalCard.tsx               — Single card. Composes all 3 zones. Props: signal: MLSignal
    ConfidenceBar.tsx            — Horizontal progress bar. Props: value: number (0-1), color: string
    ProbabilityBar.tsx           — Stacked segmented bar. Props: prob_buy, prob_hold, prob_sell: number
    FeatureContributions.tsx     — List of contribution rows. Props: features: MLSignalFeature[]
```

## Edge Cases

- **Direction = Hold (mid probabilities):** Stacked bar shows three roughly equal segments. Confidence bar is amber with moderate fill. No special handling needed — the visual naturally represents the uncertainty.
- **High confidence (≥0.9):** Confidence bar nearly full. Green for Buy, red for Sell. Bar cap should visually distinguish 95% from 100% (don't clip).
- **Low confidence (< 0.3):** Short confidence bar, split probability segments. Consider dimming the direction badge opacity to indicate uncertainty.
- **Zero in any probability:** Stacked bar shows zero-width segment. The corresponding label is omitted from the legend to avoid clutter.
- **Empty signals array:** Render "NO SIGNALS" empty state matching the existing OutputCanvas pattern.
- **Feature contribution sign:** Negative contributions render red bars extending from center. Positive render green from left. Zero contributions render as a dot.

## Wired to OutputCanvas

Add `case "ml_signals"` to the switch in `OutputCanvas.tsx`:

```tsx
case "ml_signals":
  return <MlSignalsRenderer response={response} />
```

## CSS Naming

Blocks follow BEM convention under the `ml-signals` namespace:

```
.ml-signals                    — wrapper
.ml-signals__meta              — as_of, model_version header
.ml-signals__card              — individual card
.ml-signals__identity          — zone 1
.ml-signals__badge             — direction badge
.ml-signals__confidence        — zone 2 confidence bar wrapper
.ml-signals__confidence-track  — bar track
.ml-signals__confidence-fill   — bar fill
.ml-signals__probability       — zone 2 probability wrapper
.ml-signals__probability-bar   — segmented bar
.ml-signals__probability-label — legend row
.ml-signals__features          — zone 3 list
.ml-signals__feature-row       — single feature row
.ml-signals__feature-bar       — contribution bar
.ml-signals__feature-value     — numeric value
```
