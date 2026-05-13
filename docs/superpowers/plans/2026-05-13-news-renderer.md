# News Renderer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a compact terminal-feed renderer for the `news` response type with two-zone article cards, collapsible summaries, and restrained Bloomberg/newswire aesthetic.

**Architecture:** Main `NewsRenderer` renders meta header + maps `articles[]` to stacked `ArticleCard` components. Each card composes `SentimentDot`, `RelativeTime`, and `RelatedCoinTags`. Summaries collapsed by default, toggled via headline button click. No images. CSS BEM under `.news-*`.

**Tech Stack:** React 19, TypeScript 6, no external UI libraries.

---

### Task 1: CSS — news namespace
**Files:** Modify `src/index.css`

### Task 2: SentimentDot component
**Files:** Create `src/components/renderers/news/SentimentDot.tsx`

### Task 3: RelativeTime component
**Files:** Create `src/components/renderers/news/RelativeTime.tsx`

### Task 4: RelatedCoinTags component
**Files:** Create `src/components/renderers/news/RelatedCoinTags.tsx`

### Task 5: ArticleCard component
**Files:** Create `src/components/renderers/news/ArticleCard.tsx`

### Task 6: Main NewsRenderer component
**Files:** Create `src/components/renderers/NewsRenderer.tsx`

### Task 7: Wire into OutputCanvas
**Files:** Modify `src/components/OutputCanvas.tsx`

### Task 8: End-to-end verification
