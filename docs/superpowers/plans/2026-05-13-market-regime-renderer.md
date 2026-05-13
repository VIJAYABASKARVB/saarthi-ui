# Market Regime Renderer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hero-card renderer for the `market_regime` response type showing the current crypto market macro regime as a big centered state name with confidence bar, transition probabilities, and history dot strip.

**Architecture:** Main `MarketRegimeRenderer` receives the typed response and composes 4 sub-components vertically: `RegimeState` (big centered name + confidence bar), `TransitionProbabilities` (3 colored bars), `HistoryDotStrip` (colored dot timeline), plus inline metrics row and narrative block. CSS follows BEM under `regime` namespace in `src/index.css`.

**Tech Stack:** React 19, TypeScript 6, no external UI libraries.

---

### Task 1: CSS Styles — regime namespace

**Files:**
- Modify: `src/index.css`

- [ ] Append CSS classes to `src/index.css`
- [ ] Run `npm run build` to verify

### Task 2: RegimeState component

**Files:**
- Create: `src/components/renderers/market-regime/RegimeState.tsx`
- Create: `src/components/renderers/market-regime/ConfidenceBar.tsx`

RegimeState renders 32px centered state name + composes ConfidenceBar.

- [ ] Create `ConfidenceBar.tsx`
- [ ] Create `RegimeState.tsx`
- [ ] Run `npx tsc --noEmit`

### Task 3: TransitionProbabilities component

**Files:**
- Create: `src/components/renderers/market-regime/TransitionProbabilities.tsx`

Three rows with colored bars for to_risk_on, to_risk_off, to_choppy.

- [ ] Create `TransitionProbabilities.tsx`
- [ ] Run `npx tsc --noEmit`

### Task 4: HistoryDotStrip component

**Files:**
- Create: `src/components/renderers/market-regime/HistoryDotStrip.tsx`

Colored dots with date labels. Most recent on right.

- [ ] Create `HistoryDotStrip.tsx`
- [ ] Run `npx tsc --noEmit`

### Task 5: Main MarketRegimeRenderer component

**Files:**
- Create: `src/components/renderers/MarketRegimeRenderer.tsx`

Renders meta header, RegimeState, metrics row, TransitionProbabilities, HistoryDotStrip, narrative.

- [ ] Create `MarketRegimeRenderer.tsx`
- [ ] Run `npx tsc --noEmit`

### Task 6: Wire into OutputCanvas

**Files:**
- Modify: `src/components/OutputCanvas.tsx`

Add import and case branch for `market_regime`.

- [ ] Add import and case
- [ ] Run `npm run build`

### Task 7: End-to-end verification

- [ ] Run `npm run build` — exit 0
- [ ] Run `npx eslint src/components/renderers/` — 0 errors
- [ ] Verify no `any` in new files
