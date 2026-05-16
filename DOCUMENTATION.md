# Saarthi UI — Project Documentation

## 1. Goal & constraints

Build a frontend that renders 6 types of NL-to-SQL crypto analytics responses (screener, ML signals, market regime, news, coin detail, composite) from a single API envelope. All data is mock-based. The frontend must support swapping to a live API without component changes. TypeScript strict mode, zero `any`, no test runner.

## 2. Plan

I did not have a complete plan upfront. I started with the type contract (`src/types/api.ts`, commit `0cbc112`) because that's the least-committed decision — everything else flows from it. Once the discriminated union was stable, I built one renderer at a time, each with its own spec document in `docs/superpowers/specs/`. Around renderer 3 I started writing implementation plans in `docs/superpowers/plans/` before coding. The pattern was: brainstorm → spec doc → plan → implement → verify → next. The coin detail renderer skipped the spec step (went straight brainstorm → plan) which left a documentation gap I only caught at the end.

The full commit sequence (24 commits) tells the story better than any plan would: types → mocks → shell → screener → ml_signals → market_regime → news → coin_detail → composite → edge-case fixes → skeleton loaders → cleanup → README.

## 3. Tooling

100% **OpenCode CLI**. No Cursor, no Copilot, no Cline, no other AI tool. The `frontend-design` skill was invoked at the start of every session and before every code generation.The entire project was built in a single OpenCode session across roughly 6-8 hours of wall time, spanning two calendar days (May 13-14). The project was built across ~4 days (May 13–16) with session restarts between feature phases. Open Code handled brainstorming, spec writing, scaffolding, implementation, and verification — the tool generated everything from prompts and skill directives.

## 4. Skills / agent loops

Skills loaded from `.opencode/skills/` and `.agents/skills/`:

- **frontend-design** — Mandatory before every code write. Defined the glass ethereal theme, bezel architecture, color system. I added a hard rule in `AGENTS.md:4` that this skill must fire before every frontend change, even if other skills are active.
- **brainstorming** — Used before each renderer to explore layout approaches. The HARD-GATE in this skill prevented coding before the user signed off on the design direction.
- **writing-plans** — Generated structured implementation plans saved to `docs/superpowers/plans/`. Produced specific file paths, component responsibilities, and verification steps.
- **executing-plans** — Executed plans task-by-task with TodoWrite tracking.
- **verification-before-completion** — Ran `npm run build` and `npm run lint` at the end of each major deliverable.
- **writing-skills** — Used to author `AGENTS.md` and `DESIGN.md` as project-level rules files.
- **impeccable** — Used in a late session (`.impeccable/live/config.json` exists targeting `index.html`) for live browser refinement of the design.Skills like `/impeccable audit`,`/impeccable teach`,`/impeccable bolder`,`/impeccable document`.
- **stitch-MCP+Antigravity** — Used to implement the generated designs by converting Stitch outputs into functional code.


## 5. Context management

Three strategy layers:

1. **AGENTS.md** (`AGENTS.md`) — The primary rules file. Started minimal, grew to 73 lines across multiple commits (`4db7aa0`, `e8b0955`, `709abc0`). Locked in build commands, TypeScript strictures, design conventions, and gotchas. I updated it every time the model forgot a constraint.

2. **DESIGN.md** (`DESIGN.md`, 330 lines) — Formal design system document written mid-project after the initial glass theme was built. Locked the color palette, typography hierarchy, spacing, animation curves, component specs, and do/don't rules. Every subsequent session referenced this.

3. **PRODUCT.md** — Lighter-touch product brief defining brand personality and anti-references. Used to keep visual decisions consistent across sessions.

Evidence of degradation: the late skeleton loader commits (`ee6c31f`) show less structural coherence than the early ScreenerRenderer (`3a0552a`). The `DefaultSkeleton` variant (`SkeletonLoader.tsx:226-236`) is a generic placeholder with no relationship to real layout — it exists only because the rules said "never remove the default variant."

## 6. Verification loop

Manual + compiler. No test runner (no vitest, no Playwright, no Storybook). The only gates were `npm run build` (tsc -b + vite build) and `npm run lint` (eslint).

Concrete catches:
- **Impure `Math.random()`** — The AI put `Math.random()` in a skeleton component to vary bar widths. The `react-hooks/purity` lint rule caught it at build time. Fixed by replacing with a deterministic array.
- **Type drift on ScreenerData** — The AI defined `focus`, `filters`, `results` fields that didn't match the brief. Caught during user review, not automation. Fixed in a single commit (`4899c07`).
- **Sparkline color logic** — `SparklineCell.tsx` used `last >= first` for green, making flat trends green, which is wrong for financial convention (flat should be red). Caught by user noticing countersignals. Fixed in `d59f021`.

What I did NOT catch: duplicate `formatCompact` in screener and coin-detail (`formatCompact.ts` vs `formatters.ts`), missing responsive breakpoints on 5 of 6 renderers, no aria attributes on dynamic content.

## 7. Production-safe techniques

| Technique | Location | Notes |
|---|---|---|
| Discriminated union (7 branches) | `src/types/api.ts:172-179` | No optional fields on success envelopes |
| Exhaustive switch in OutputCanvas | `src/components/OutputCanvas.tsx:79-92` | No `default` — new union branches force compile error |
| Zero `any` | Confirmed across all `.tsx`/`.ts` source files | Enforced by `@typescript-eslint/no-explicit-any` |
| Type guards (isSuccess, isError) | `src/types/api.ts:183-199` | Compiler-validated runtime narrowing |
| Envelope isolation | `ErrorEnvelope` is separate from `SuccessEnvelope` | Impossible to read `data` on an error |
| buildEnvelope overloads | `src/components/renderers/composite/buildEnvelope.ts:3-7` | One typed overload per response type — no `any` in composite delegation |
| Structured skeleton variants | `SkeletonLoader.tsx:238-245` | Each renderer has a matching skeleton; fallback to default |
| Tailwind + shadcn with locked theme | `tailwind.config.js`, `index.css:1669-1691` | CSS custom properties kept in sync with Tailwind theme |

**Missing:** No runtime validation (no zod), no React error boundaries, no accessibility beyond basic `aria-label` and `<button>` semantics, no performance instrumentation, no responsive testing.

## 8. First-principles decisions

**The double-bezel container** (`bezel-shell` / `bezel-core` in `index.css:99-128`). The AI default was standard shadcn Card components with shadow elevation. I overrode this with a nested border architecture: a 1.5px-padded outer shell + a glass inner core with `backdrop-filter: blur(24px)`. Every major surface uses this pattern — it's the project's signature.

**"The Glass Atelier" north star** (DESIGN.md:131-146). The AI's crypto dashboard defaults were neon gradients and glowing orbs. I deliberately inverted this: OLED black `#050505` background, Vantablack glass cards, single accent (`#7c5cff`) at ≤30% density, no drop shadows at rest. Flat-by-default. Three named rules enforce design intent: The One Signal Rule (green/red only for direction), The Violet Threshold Rule (accent ≤30%), and The Mono-Only-For-Numbers Rule.

**Composite as orchestration, not renderer.** The AI wanted the composite to re-implement sub-components. I designed `buildEnvelope` with 5 typed overloads — each returns exactly the envelope shape the delegated renderer expects. The composite renderer is 33 lines of orchestration code. Zero rendering logic duplication.

**Screener density toggle.** The initial screener had fixed spacing. I added compact/comfortable modes (see `index.css:372-378` for the cell variants) because crypto traders scan tables at different attention levels. Most AI-generated screeners don't offer this.

## 9. Where the tool failed

**1. Hallucinated API shape (commit `4899c07`).** The AI invented `focus` and `filters` fields on ScreenerData that never existed in the spec. I didn't catch it because I trusted the tool — the user reviewing the frontend saw fields in mock JSON that didn't match the brief. Recovery: one commit to surgically correct all 6 interfaces and 10 mock JSON files simultaneously.

**2. `Math.random()` in React render (commit `eb5b4ef`).** The AI wrote `<div style={{ width: Math.random() * 100 + '%' }} />` inside a skeleton component. This violates React purity rules and produces unstable layouts that shift on every re-render. The eslint rule caught it; I wouldn't have noticed in manual review because the skeleton animation masks the jitter.

**3. Duplicate formatting logic (still unfixed).** `src/components/renderers/screener/formatCompact.ts` and `src/components/renderers/coin-detail/formatters.ts` both implement compact-number formatting with slightly different APIs. Neither the AI nor I caught this during the implementation phase — discovered only during final audit. The screeners `formatCompact` supports `formatCurrency` and `formatPercentText`; the coin-detail one has `formatPercent`, `formatLargeNumber`, `formatInfinitePercent`. These should merge into `src/lib/format.ts`.

**4. Stale spec for coin-detail.** The coin-detail spec (`docs/superpowers/specs/coin-detail-renderer-design.md`) was committed (`6a39b45`) after the implementation (`79313a6`) — documentation followed code. The spec describes a different data shape than what was actually built (the original spec had `all_time_high`, `volume_24h`, `circulating_supply`; the actual component uses `metrics`, `on_chain`, `changes`, `price_history`). The spec was never updated.

**5. Over-engineering in early skeleton variants.** The first skeleton for the screener used hardcoded table structures and nested `<table>` markup inside the skeleton. This made the skeleton fragile — if column count changed, the skeleton broke silently. Later skeletons switched to simpler bar layouts. The screener skeleton still uses the fragile approach.

## 10. Git discipline

150+ commits before the final push. The log shows 8 merged PR branches (all `neo-modern-redesign`), which means I was using feature branches and merging — contradicting the earlier documentation claim of "no merge commits, single branch." The branch strategy is clear: `main` as stable, `neo-modern-redesign` as the active development branch with periodic merges.

Commit messages follow conventional-commits format consistently (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`). The chronological progression tells a clean story: initial scaffold → 6 renderers → edge cases → Tailwind migration → redesign pass → narrative features → skeleton polish. Each renderer lands as its own commit, making bisect easy.

Weaknesses:
- **Over-merged.** 8 PR merges for what could have been 3-4. Each merge creates a diamond in the log, making `git log --oneline --graph` noisy.
- **Message quality drifts.** Early commits are tight (`"fix: sparkline colors, ATL formatting, and news sentiment labels"`). Late commits are vague (`"feat: refine neo-modern glassmorphism design system"` — refine what, specifically?). The `refactor: migrate project to Tailwind CSS and shadcn/ui framework` commit (`d53eb43`) should have been multiple granular commits given the scope.
- **Docs commits interspersed with code.** `709abc0` and `e8b0955` are docs-only changes to AGENTS.md that landed in the middle of feature work. These should have been a single commit at the end or squashed into the PR.

## 11. What I'd do with another week

**Test harness.** Zero tests is the biggest gap. I'd add vitest with React Testing Library for: (a) each renderer's loading/empty/error/edge-case states, (b) the OutputCanvas exhaustiveness dispatch, (c) the composite envelope delegation. The SparklineCell financial-convention bug would have been caught by a `last <= first` test.

**Responsive layout.** Only the coin-detail renderer has media queries. On a 375px phone, the screener table scrolls horizontally with no indication it's scrollable. I'd add systematic breakpoint handling across all renderers.

**Runtime validation.** Bird mock JSON is cast with `as Promise<DashboardResponse>` in `mockLoader.ts:9`. If the mock drifts from the interface (happened in commits `8be8f0f` → `962d6ef` where mock shapes changed across commits), there's no runtime signal. I'd add zod schemas for each response type.

**Accessibility audit.** The news article cards are `<div>` elements with `cursor: pointer` but no keyboard interaction pattern. The market regime chart has no `aria-label` describing the data. I'd add roving tabindex and screen-reader-visible descriptions.

**Shared utilities.** Extract `formatCompact.ts` and `formatters.ts` into a shared `src/lib/format.ts`. Currently both are private to their renderer directory.

**Visual tuning.** The skeleton loaders approximate renderer dimensions but are not pixel-matched. I'd measure real renderer output and back-fill accurate skeleton dimensions. The `DefaultSkeleton` variant exists only because rules say "never remove it" — I'd either make it useful or delete the rule.

## 12. Quick-start

```bash
git clone https://github.com/VIJAYABASKARVB/saarthi-ui.git
cd saarthi-ui
npm install
npm run dev
```

Open `http://localhost:5173`. Type any of these keywords into the search bar: `screener`, `signals`, `regime`, `news`, `coin`, `composite`, `error`. Each loads a different mock response.

Build verification:
```bash
npm run build    # tsc -b && vite build — must exit 0
npm run lint     # eslint . — must exit 0
```

---
