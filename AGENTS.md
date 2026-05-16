# Saarthi UI — Agent Instructions

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.even though when user uses some other frontend skills dont skip the frontend-design skill.consider both with priority


## Stack
React 19, TypeScript 6.0, Vite 8, Tailwind CSS 3, shadcn/ui (Radix UI + Base UI), Recharts 3 (price chart only), class-variance-authority, clsx, tailwind-merge, lucide-react.

**Design:** Dark ethereal glass theme. `#050505` bg, `#7c5cff` purple accent, `#22c55e` green, `#ff6b6b` red, `#ffb547` amber, `#e7ecf3` text. Nested `bezel-shell`/`bezel-core` border architecture. Mesh gradient orbs, `backdrop-filter: blur()`, spring animations. No rounded corners only on legacy BEM renderers — shadcn components use `rounded-xl` (`0.75rem`).

## Architecture

```
src/
  types/api.ts               — Discriminated union (7 branches), type guards
  lib/
    mockLoader.ts             — 800ms delay, fetches from /mocks/
    utils.ts                  — cn() helper (clsx + tailwind-merge)
  components/
    App.tsx                   — Maps query keywords → mock filenames
    OutputCanvas.tsx          — Exhaustive dispatch: loading → error → rejected → empty → success
    IdleScreen.tsx            — Landing state before first query
    renderers/                — 6 renderers + sub-component dirs
    skeletons/                — SkeletonLoader.tsx (6 variants + default)
    ui/                       — shadcn/ui primitives (button, card, badge, tooltip, separator)
```

## Critical Rules

- **`never use any`.** Enforced by `tseslint.configs.recommended`. Use `as Type` casts only at controlled dispatch boundaries (see OutputCanvas.tsx).
- **Mock data lives in `public/mocks/`**, loaded only through `mockLoader.ts`. Never import mock data directly.
- **Preserve the `DashboardResponse` discriminated union** (`api.ts:172-179`). Adding a new response type requires a union branch + renderer + OutputCanvas switch case.
- **Composite renderer is orchestration-only** — delegates via `buildEnvelope` synthetic envelopes. No duplicate rendering logic.
- **All 4 output states:** loading (FETCHING + skeleton), error (EXECUTION_ERROR red panel), rejected (AGENT_REJECTED amber panel), empty (`row_count === 0` explanation panel).
- **Never remove the `default` skeleton variant** in `SkeletonLoader.tsx`.
- **OutputCanvas has no `default` branch** — switch is exhaustive. Adding a `DashboardResponse` branch produces a compile-time error.

## Design Conventions

- **Two visual layers coexist:** 1) Legacy BEM renderers (`screener-`, `ml-signals-`, `regime-`, `news-`, `coin-detail-`, `composite-`) with flat styles in `src/index.css`. 2) Tailwind/shadcn shell (App.tsx, OutputCanvas states, IdleScreen). Use `className` with Tailwind for new layout; extend CSS with BEM for renderer internals.
- Colors via CSS custom properties (`--bg`, `--text`, `--green`, `--red`, `--amber`, `--accent`) AND Tailwind theme colors. Both must be kept in sync.
- UI primitives in `src/components/ui/` follow shadcn pattern: `cn()` from `@/lib/utils`. Extend these, don't duplicate.
- Interactive elements must be semantic `<button>` with `:focus-visible` outlines.
- Skeleton loaders use `.skeleton-bar` with `skeleton-pulse` animation — not shimmer/gradient.

## TypeScript

- `erasableSyntaxOnly: true` — no enums/no namespaces/no parameter properties. Use `type` or const objects.
- `verbatimModuleSyntax: true` — always `import type` for type-only imports.
- `noUnusedLocals / noUnusedParameters: true` — build fails on unused declarations.
- `noFallthroughCasesInSwitch: true`.
- `jsx: "react-jsx"` — no `import React`.
- Prefer discriminated unions over optional fields. Exhaustive switches over `default` branches.
- Path alias: `@/` → `./src/`.

## Commands

```bash
npm run dev      # vite dev server (port 5173)
npm run lint     # eslint . — must exit 0
npm run build    # tsc -b && vite build — must exit 0
```

No test runner is configured. TypeScript + ESLint are the only verification gates.

## Known Gotchas

- `SparklineCell.tsx` uses `last > first` for green (uptrend), `else` for red (flat or down). Financial convention — flat is not green.
- `buildEnvelope.ts` has 5 TypeScript overloads + 1 implementation. Adding a response type needs a new overload.
- `distance_from_atl_pct` in `MetricsGrid.tsx` is plain signed percentage. `distance_from_ath_pct` uses `formatInfinitePercent` with compact suffixes for values > 10,000. Intentionally different.
- `mockLoader.ts` casts JSON via `as Promise<DashboardResponse>`. Adding a field to a type interface but not the mock JSON won't produce a compile error — mocks must be maintained manually.
- Composite mock files contain full nested data structures matching per-type schemas. Both composite wrapper and nested renderer data must be valid.
