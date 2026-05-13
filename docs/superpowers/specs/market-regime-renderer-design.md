# Market Regime Renderer — Design Spec

## Overview

Hero-card renderer for the `market_regime` response type. A single-state dashboard card showing the current crypto market macro regime. Bloomberg terminal aesthetic: `#0a0a0a` background, `#00ff41` green, `#ff3131` red, `#ffb700` amber, `#2a2a2a` borders, monospace font throughout.

## Data Shape

```ts
interface MarketRegimeData {
  as_of: string
  regime_state: "Risk-on" | "Risk-off" | "Choppy" | "Transition"
  confidence: number           // 0-1
  duration_days: number
  transitions: {
    to_risk_on: number         // 0-1
    to_risk_off: number
    to_choppy: number
  }
  history: Array<{ date: string; state: string }>
  narrative: string
}
```

## Layout

Single hero card, vertically stacked sections. The regime state name is the dominant visual element — centered, large, bold.

### Card Structure

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│                    RISK-ON                              │  ← 32px, bold, green
│                    ████████████████████░░  82%          │  ← confidence bar
│                                                        │
│  Duration: 47 days        As of: 2026-05-13            │  ← metrics row
│                                                        │
│  Transition Probabilities:                              │
│  → Risk-on   ████████████████████████████████  82%      │  ← 3 transition bars
│  → Risk-off  ██████░░░░░░░░░░░░░░░░░░░░░░░░░░   8%     │     colored by target
│  → Choppy    ████████░░░░░░░░░░░░░░░░░░░░░░░░  10%     │
│                                                        │
│  Regime History:  ●●●●●●●●●○                           │  ← colored dot strip
│                   5/7  5/8  5/9  5/10 5/11 5/12 5/13   │     10 days
│                                                        │
│  The market has been in a sustained Risk-on regime      │  ← narrative
│  for 47 days...                                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Section 1 — State Name

- Text: `regime_state` value uppercased
- Font: 32px, bold, letter-spacing 6px
- Text alignment: centered
- Color mapping:
  - `Risk-on` → `var(--green)`
  - `Risk-off` → `var(--red)`
  - `Choppy` → `var(--amber)`
  - `Transition` → `var(--text)` (white)

### Section 2 — Confidence Bar

- Full-width horizontal bar, 8px height
- Track: `var(--border)`
- Fill: regime state color
- Width = `confidence * 100` percent
- Label right-aligned below the bar: `82%` in same color, 13px, tabular-nums

### Section 3 — Metrics Row

- One line: `Duration: 47 days` · `As of: 2026-05-13`
- Dim text, 11px, tabular-nums
- Items separated by two spaces

### Section 4 — Transition Probabilities

- Header: `Transition Probabilities` in 10px uppercase dim text
- Three rows, one per target state:
  - To Risk-on: green bar
  - To Risk-off: red bar
  - To Choppy: amber bar
- Each row: target state name (left, dim, 11px) + bar (4px high, 0.7 opacity) + percentage (right, tabular-nums)
- Bar width proportional to the transition probability
- Zero-probability transitions show empty track with `0%` label

### Section 5 — History Dot Strip

- A row of 10 colored dots (10px diameter, 4px gap)
- Each dot colored by the state on that date (green/red/amber/white)
- Most recent date on the right
- Date labels below each dot: compact format `5/7`, `5/8`, etc.
- Scrollable horizontally if more than 10 entries (overflow-x: auto)

### Section 6 — Narrative

- Full-width text block
- Font: 12px, `var(--text-dim)`
- Line-height: 1.6
- Not truncated — full text displayed
- Separated from history by a thin `1px solid var(--border)` divider

### Section 7 — Meta Header

- Top of card: `as_of` timestamp and `market_regime` label
- 10px uppercase dim text, letter-spacing 1px

## Color Rules

- Only the state name, confidence bar, history dots, and transition bars carry color
- All supporting text (metrics, labels, narrative) is `var(--text-dim)`
- No filled backgrounds except thin bars and dots
- Transition bars at 70% opacity to reduce visual weight vs the hero elements

## File Structure

```
src/components/renderers/
  MarketRegimeRenderer.tsx           — Main component. Renders hero card.

  market-regime/
    RegimeHero.tsx                   — State name (32px centered) + confidence bar
    TransitionBars.tsx               — Three transition probability rows
    HistoryStrip.tsx                  — Colored dot timeline
    MetricsRow.tsx                   — Duration + as_of line
    NarrativeBlock.tsx               — Full narrative text
```

## Edge Cases

- **Transition probability = 0:** Transition bar shows empty track with `0%` label. No special handling needed — the bar has zero width.
- **Confidence = 0 or 1:** Bar at 0% (empty) or 100% (full). Cap `Math.min(Math.max(...))` handles clamping.
- **History fewer than 10 entries:** Renders whatever is available. Dots left-aligned (or right-aligned if told "today" is rightmost).
- **History with mixed states across 10 days:** Each dot colored independently. Strip shows regime transitions clearly as color changes.
- **Empty narrative string:** Narrative section omitted entirely.
- **Duration formatting:** `47 days` — numeric only, no localization needed.

## CSS Naming

BEM convention under the `regime` namespace:

```
.regime                        — wrapper
.regime__meta                  — as_of header
.regime__hero                  — state name container
.regime__hero-text             — the 32px state name
.regime__confidence            — confidence bar wrapper
.regime__confidence-track      — bar track
.regime__confidence-fill       — bar fill
.regime__confidence-label      — percentage label
.regime__metrics               — metrics row
.regime__transitions           — transition section wrapper
.regime__transitions-header    — transition header
.regime__transition-row        — single transition row
.regime__transition-bar        — bar track
.regime__transition-fill       — bar fill
.regime__history               — dot strip wrapper
.regime__history-dot           — single colored dot
.regime__history-date          — date label under dot
.regime__narrative             — narrative text block
```
