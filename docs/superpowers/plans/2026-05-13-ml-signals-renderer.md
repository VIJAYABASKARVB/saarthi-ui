# ML Signals Renderer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build card-based renderer for `ml_signals` response type with confidence bar, stacked probability bar, and feature contribution bars.

**Architecture:** Main `MlSignalsRenderer` receives the typed response, renders a header row (`as_of`, `model_version`), then maps `signals[]` to vertically stacked `SignalCard` components. Each card composes three sub-components: `ConfidenceBar`, `ProbabilityBar`, and `FeatureContributions`. CSS follows BEM under `ml-signals` namespace in `src/index.css`.

**Tech Stack:** React 19, TypeScript 6, no external UI libraries.

---

### Task 1: CSS Styles — ml-signals namespace

**Files:**
- Modify: `src/index.css`

Append after the screener block. Every CSS class the components use must exist here.

- [ ] Append CSS classes to `src/index.css`
- [ ] Run `npm run build` to verify

### Task 2: ConfidenceBar component

**Files:**
- Create: `src/components/renderers/ml-signals/ConfidenceBar.tsx`

Renders a thin (6px) horizontal progress bar. Props: `{ value: number; color: string; max?: number }`.

- [ ] Create `ConfidenceBar.tsx`
- [ ] Run `npx tsc --noEmit`

### Task 3: ProbabilityBar component

**Files:**
- Create: `src/components/renderers/ml-signals/ProbabilityBar.tsx`

Renders a single stacked segmented bar (8px) with green/amber/red segments and legend row.

- [ ] Create `ProbabilityBar.tsx`
- [ ] Run `npx tsc --noEmit`

### Task 4: FeatureContributions component

**Files:**
- Create: `src/components/renderers/ml-signals/FeatureContributions.tsx`

Renders up to 5 rows with feature name, contribution bar, and numeric value.

- [ ] Create `FeatureContributions.tsx`
- [ ] Run `npx tsc --noEmit`

### Task 5: SignalCard component

**Files:**
- Create: `src/components/renderers/ml-signals/SignalCard.tsx`

Composes all three zones for a single signal. Handles direction color, price formatting, badge dimming for low confidence.

- [ ] Create `SignalCard.tsx`
- [ ] Run `npx tsc --noEmit`

### Task 6: Main MlSignalsRenderer component

**Files:**
- Create: `src/components/renderers/MlSignalsRenderer.tsx`

Receives `SuccessEnvelope<"ml_signals", MlSignalsData>`, renders meta header + signal cards. Handles empty signals array.

- [ ] Create `MlSignalsRenderer.tsx`
- [ ] Run `npx tsc --noEmit`

### Task 7: Wire into OutputCanvas

**Files:**
- Modify: `src/components/OutputCanvas.tsx`

Add import and case branch for `ml_signals`.

- [ ] Add import and case
- [ ] Run `npm run build`

### Task 8: End-to-end verification

- [ ] Run `npm run build` — exit 0
- [ ] Run `npx eslint src/components/renderers/` — 0 errors
- [ ] Verify no `any` in new files
