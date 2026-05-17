# Saarthi UI — Agent Instructions

## Stack
React 19, TypeScript 6.0, Vite 8, Tailwind CSS 3, shadcn/ui (Radix UI + Base UI), Recharts 3 (price chart only), class-variance-authority, clsx, tailwind-merge, lucide-react.

# Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:5173`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot + Reference Comparison Workflow

### Screenshot Environment

- Puppeteer browser cache:

```txt
C:/Users/ELCOT/.cache/puppeteer/
```

- Verify Puppeteer and browser availability before capturing screenshots:

```bash
npm list puppeteer
npx puppeteer browsers list
```

Expected output should include:

```txt
puppeteer@...
chrome@... installed
```

If browser is missing, install it:

```bash
npx puppeteer browsers install chrome
```

### Reference Images

Store target screenshots inside:

```txt
/reference/
```

Example:

```txt
reference/
 ├── coin-page.png
 ├── screener-page.png
 ├── news-page.png
 └── regime-page.png
```

Reference images are the visual source of truth.

If a reference image exists:

- Match layout exactly
- Match spacing exactly
- Match typography exactly
- Match colors/shadows/blur exactly
- Do NOT redesign
- Do NOT improve aesthetics
- Do NOT add new sections

---

### Capture Current Implementation

Always screenshot localhost:

```bash
node screenshot.mjs http://localhost:5173
```

Save screenshots inside:

```txt
/temporary screenshots/
```

---

### Screenshot Naming Convention (Mandatory)

Generated screenshots MUST inherit the reference filename.

Reference:

```txt
reference/
 └── coin-page.png
```

Iterations:

```txt
temporary screenshots/
 ├── coin-page-1.png
 ├── coin-page-2.png
 ├── coin-page-3.png
```

Rules:

First capture:

```txt
<reference-name>-1.png
```

Next captures:

```txt
<reference-name>-2.png
<reference-name>-3.png
...
```

Never overwrite older screenshots.

Keep full iteration history.

---

### Latest Screenshot Rule (Mandatory)

When multiple screenshots exist for the same page:

Example:

```txt
temporary screenshots/
 ├── coin-page-1.png
 ├── coin-page-2.png
 └── coin-page-3.png
```

ALWAYS compare against the newest screenshot only.

Meaning:

Compare:

```txt
reference/coin-page.png
```

against:

```txt
temporary screenshots/coin-page-3.png
```

NOT:

```txt
coin-page-1.png
coin-page-2.png
```

The screenshot with the highest iteration number becomes the active implementation state.

Older screenshots are history only.

---

### Mandatory Comparison Process

After EVERY UI modification:

1. Capture a new localhost screenshot.

2. Identify the newest iteration:

Example:

```txt
coin-page-4.png
```

3. Read BOTH:

Reference:

```txt
/reference/<page>.png
```

Latest implementation:

```txt
/temporary screenshots/<page>-latest.png
```

4. Compare visually.

Check:

- spacing
- margins
- padding
- typography size
- font weight
- line height
- colors
- shadows
- blur intensity
- glass opacity
- gradients
- border radius
- chart dimensions
- table spacing
- alignment
- responsive behavior
- hover states
- shell depth
- image sizing

---

### Comparison Reporting Rules

Never say:

❌ "Looks close"

❌ "Seems similar"

❌ "Almost done"

Always report measurable mismatches:

✅ "Header ≈72px; reference ≈56px"

✅ "Card gap 12px; should be ~24px"

✅ "Glass blur stronger than reference"

✅ "Accent purple too saturated"

✅ "Border radius ~16px; reference ~10px"

---

### Iteration Loop (Required)

Workflow:

```txt
Edit UI
↓
Capture screenshot
↓
Save:
<reference-name>-N.png
↓
Compare:
reference image
VS
latest screenshot only
↓
List mismatches
↓
Fix implementation
↓
Capture new screenshot
↓
Repeat
```

Minimum requirement:

```txt
2 compare → fix cycles
```

Stop only when:

- visible mismatches ≈ zero
OR
- user explicitly approves

Never stop after a single comparison pass.

### Hard Rule

If a reference image exists:

- Match it as closely as possible.
- Do NOT redesign.
- Do NOT add sections.
- Do NOT improve aesthetics.
- Reproduce spacing, hierarchy, and visual behavior faithfully.

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color

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
