# Coin Detail Renderer Implementation Plan

**Goal:** Build a dense analytical dashboard renderer for the `coin_detail` response type.

**Architecture:** Main `CoinDetailRenderer` composes `CoinHero` + two-column `SignalCallout`/`MetricsGrid` + full-width `PriceChart`. CSS BEM under `.coin-detail-*`.

**Tech Stack:** React 19, TypeScript 6, recharts (line chart).

---

### Task 1: CSS — coin-detail namespace
**Files:** Modify `src/index.css`

### Task 2: Formatters utility
**Files:** Create `src/components/renderers/coin-detail/formatters.ts`

### Task 3: CoinHero component
**Files:** Create `src/components/renderers/coin-detail/CoinHero.tsx`

### Task 4: SignalCallout component
**Files:** Create `src/components/renderers/coin-detail/SignalCallout.tsx`

### Task 5: MetricsGrid component
**Files:** Create `src/components/renderers/coin-detail/MetricsGrid.tsx`

### Task 6: PriceChart component
**Files:** Create `src/components/renderers/coin-detail/PriceChart.tsx`

### Task 7: Main CoinDetailRenderer
**Files:** Create `src/components/renderers/CoinDetailRenderer.tsx`

### Task 8: Wire into OutputCanvas
**Files:** Modify `src/components/OutputCanvas.tsx`

### Task 9: End-to-end verification
