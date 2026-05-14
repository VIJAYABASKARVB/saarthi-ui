# Composite Renderer Implementation Plan

**Goal:** Build an orchestration-layer renderer for the `composite` response type that delegates to existing renderers via synthetic envelopes.

**Architecture:** `CompositeRenderer` maps `sections[]` to `CompositeSection` wrappers. Each wrapper renders a section header + delegates to the appropriate existing renderer via switch dispatch. Overloaded `buildEnvelope` provides typed return values.

**Tech Stack:** React 19, TypeScript 6, no external UI libraries.

---

### Task 1: CSS — composite namespace
**Files:** Modify `src/index.css`

### Task 2: `buildEnvelope` with overloads
**Files:** Create `src/components/renderers/composite/buildEnvelope.ts`

### Task 3: `SectionHeader` component
**Files:** Create `src/components/renderers/composite/SectionHeader.tsx`

### Task 4: `UnknownSection` component
**Files:** Create `src/components/renderers/composite/UnknownSection.tsx`

### Task 5: `CompositeSection` dispatcher
**Files:** Create `src/components/renderers/composite/CompositeSection.tsx`

### Task 6: Main `CompositeRenderer`
**Files:** Create `src/components/renderers/CompositeRenderer.tsx`

### Task 7: Wire into OutputCanvas
**Files:** Modify `src/components/OutputCanvas.tsx`

### Task 8: End-to-end verification
