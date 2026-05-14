# saarthi-ui — Agent Guide

## Quick start

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build (run before committing)
npm run lint     # ESLint 10 with typescript-eslint
```

Build order matters: **`lint` → `build`** (`build` already runs `tsc -b`). There are no tests.

## Stack

- React 19, TypeScript 6.0, Vite 8, Recharts 3 (one usage: `PriceChart.tsx`)
- `@vitejs/plugin-react` only
- Plain CSS (no modules, no CSS-in-JS, no Tailwind) — all in `src/index.css` (1004 lines) + some stale template styles in `src/App.css`

## TypeScript strictures

- `erasableSyntaxOnly: true` — **no enums, no namespaces, no parameter properties**
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `noUnusedLocals` / `noUnusedParameters` — treat as CI-blockers

## Architecture

- **Single page, no router.** `src/main.tsx` renders `<App />`.
- **All data is mock-based.** The app fetches JSON from `public/mocks/` via `src/lib/mockLoader.ts` (simulated 800ms delay). Mock keys in `App.tsx`: `screener`, `signals`, `regime`, `news`, `coin`, `composite`, `error`.
- **API types** (`src/types/api.ts`): discriminated union `DashboardResponse` → `SuccessEnvelope<T,D>` or `ErrorEnvelope`. Use `isSuccess()`, `isError()`, `isResponseType()` guards.
- **Renderers** dispatch on `response_type` in `OutputCanvas.tsx`. Supported: `screener`, `ml_signals`, `market_regime`, `news`, `coin_detail`. `composite` uses a placeholder.
- **No test runner** in dependencies. No CI pipeline.

## Conventions

- Component files: `PascalCase.tsx`. Supporting hooks/utils: `camelCase.ts`.
- Subcomponents per renderer go in `renderers/<name>/` subdirectories.
- CSS classes follow BEM-like naming: `.block__element--modifier`.
- Colours are CSS custom properties in `:root` (`--bg`, `--green`, `--red`, etc.).

## Gotchas

- `App.css` retains unused Vite starter template styles (`.counter`, `.hero`, `#center`, etc.) — don't rely on them.
- The `composite` response type has no renderer implementation yet.
- No `data-testid` or accessibility attributes exist.
