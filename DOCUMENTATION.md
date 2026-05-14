# Saarthi UI — Project Documentation

## 1. Goal & constraints

Build a frontend for a crypto analytics NL-to-SQL agent (Saarthi AI). The backend returns 6 discriminated response shapes inside a uniform envelope. The frontend must render each shape with a distinct visual language — Bloomberg terminal aesthetic, not retail crypto app. All data is mock-based; the architecture must support swapping to a real API without component changes.

## 2. Plan

I did not have a complete plan upfront. I started with the type contract (`src/types/api.ts`, commit `0cbc112`) because that's the least-committed decision — everything else flows from it. Once the discriminated union was stable, I built one renderer at a time, each with its own spec document in `docs/superpowers/specs/`. Around renderer 3 I started writing implementation plans in `docs/superpowers/plans/` before coding. The pattern was: brainstorm → spec doc → plan → implement → verify → next. The coin detail renderer skipped the spec step (went straight brainstorm → plan) which left a documentation gap I only caught at the end.

The full commit sequence (24 commits) tells the story better than any plan would: types → mocks → shell → screener → ml_signals → market_regime → news → coin_detail → composite → edge-case fixes → skeleton loaders → cleanup → README.

## 3. Tooling

I used **Claude Code (opencode CLI)** for everything — brainstorming, planning, scaffolding, implementation, verification. No Cursor, no Copilot, no other tool. The entire project was built in a single Claude Code session across roughly 6-8 hours of wall time, spanning two calendar days (May 13-14). I chose it because the project required consistent architectural decisions across 6 renderers, and a single-session tool with context persistence was better than fragmented edits.

## 4. Skills / agent loops

The project used Claude Code's Superpowers skill system. Skills activated during the session:

- **brainstorming** — Before each renderer I used this to explore layout approaches (card vs table, hero vs list) and get user approval before writing code. The HARD-GATE prevented me from coding before the design was accepted.
- **writing-plans** — Generated task-level implementation plans saved to `docs/superpowers/plans/`. Each plan included exact file paths, component code, verification commands.
- **executing-plans** — Executed plans task-by-task, tracking progress with TodoWrite. This was the primary work loop.
- **verification-before-completion** — Ran at the end of each major deliverable. Forced me to run `npm run build` and `eslint` before claiming completion.

No MCP servers were used. No custom tools.

## 5. Context management

Single long session across 6-8 hours. I managed context degradation by:

1. **AGENTS.md** (`AGENTS.md`) — A project rules file I kept open. It recorded build commands, TypeScript strictures (`erasableSyntaxOnly`, `verbatimModuleSyntax`), CSS conventions, and gotchas. I referenced it regularly when the model forgot constraints.
2. **Checkpoint commits** — Every renderer was a separate commit. Between renderers, the completed commit effectively reset the "hot" context to just the current task.
3. **Verification commands** — `npm run build` and `npx eslint` were run after every major change. Build failures were the primary signal that context had degraded.

The single session never restarted; I worked continuously. I have no evidence of severe degradation, but the final skeleton loader changes show weaker coherence than earlier renderers (the `Math.random()` impure-function lint error suggests less careful code generation).

## 6. Verification loop

Manual verification through the TypeScript compiler and ESLint. No test runner in the project (this is a weakness, see section 11).

**Example 1 — sparkline color bug (commit `d59f021`):** The Screener's `SparklineCell.tsx` used `last >= first` for green, `else` for red. The user reported sparklines were "always red." The mock data had only downtrending coins, so the code was actually correct for the data — but the condition was wrong for financial convention (flat should be red, not green). Fixed by changing `>=` to `>`. Caught by the user's manual review, not automation.

**Example 2 — type drift in Screener interfaces (commit `4899c07`):** The AI initially wrote ScreenerData with `focus`, `filters`, `results` fields. The assignment brief specified `columns` and `rows`. The user caught this and corrected it. I had not read the brief carefully enough — I was designing from the AI's interpretation of it. The correction was applied across all mocks and components in a single fix commit.

## 7. Production-safe techniques

| Technique | Evidence | Notes |
|---|---|---|
| Discriminated union typing | `src/types/api.ts:172-179` — `DashboardResponse` is a strict union of 7 branches | No optional "maybe this field exists" patterns |
| Exhaustive switch | `src/components/OutputCanvas.tsx:55-67` — no `default` branch | Adding a new response type to the union produces a compile error |
| Zero `any` policy | Confirmed via `Select-String` across all 40 source files | Enforced by `@typescript-eslint/no-explicit-any` and `noUnusedLocals` |
| Envelope isolation | `ErrorEnvelope` and `SuccessEnvelope` are separate union branches | Impossible to accidentally read `data` on an error response |
| Compile-time type guards | `src/types/api.ts:181-199` — `isSuccess()`, `isError()`, `isResponseType()` | Runtime narrowing that the compiler validates |
| No runtime validation | Not present | No zod, no io-ts, no runtime contract enforcement |

**Not present:** error boundaries, accessibility attributes (`aria-*` only on news headlines), security hardening, performance instrumentation.

## 8. First-principles decisions

**Visual direction — Bloomberg terminal over retail crypto.** The AI's initial suggestion for the Market Regime renderer was a card with rounded corners, gradient backgrounds, and icon-based indicators. I overrode this with a pure-text hero card using 32px bold monospace, thin 1px borders, and no visual effects. The dot-history strip and transition bars are text-based patterns common in terminal UIs but absent from most crypto apps.

**State model — synthetic envelopes for Composite.** The AI proposed having the Composite renderer re-implement sub-components or use `any`-typed render registries. I designed a typed overloaded `buildEnvelope` function (`src/components/renderers/composite/buildEnvelope.ts:3-7`) with one overload per response type, so each branch returns exactly the type the delegated renderer expects. Zero `any`, zero visual duplication. The composite is 25 lines of orchestration code — not a new dashboard.

## 9. Where the tool failed

**1. Type drift in ScreenerData (commit `4899c07`).** The AI defined ScreenerData with `focus`, `filters`, `results` — fields that existed only in its approximation of the brief, not in the actual specification. I caught it when the user pointed out the mismatch. Recovery: one commit to correct all interfaces and mocks simultaneously.

**2. Impure `Math.random()` in skeleton loader (commit `eb5b4ef`).** The AI used `Math.random()` inside a React component to generate varied-width skeleton bars. The `react-hooks/purity` lint rule caught this, not me. Recovery: replaced random values with a deterministic array.

**3. Duplicate `formatCompact` logic.** The AI created a second compact-number formatter in the coin detail renderer (`formatters.ts`) when a functionally identical one already existed in the screener (`formatCompact.ts`). This was discovered during the final audit — neither I nor the tool noticed the duplication during implementation. Recovery: the duplicate still exists; it's minor (7 lines) but should have been a shared import.

## 10. Git discipline

24 commits. This is probably too many for a 2-day project, but each renderer landed as its own commit which makes the progression readable.

Strengths: Commit messages follow conventional-commits format (`feat:`, `fix:`, `docs:`, `chore:`). The order tells a coherent story — types → mocks → shell → renderers → fixes. No merge commits (solo project, single branch).

Weaknesses: All commits are on `main`. No feature branches, no PRs. Several "fix" commits should have been squashed before the renderer they fix (the sparkline fix `d59f021` could have been part of the screener commit `3a0552a`). The coin detail spec was committed (`6a39b45`) after the coin detail implementation (`79313a6`), which reflects the skipped-spec workflow — documentation trailed code.

Commit cadence: ~1 commit per 20-30 minutes during active work, longer gaps between renderers. This is fine for solo work.

## 11. What I'd do with another week

**No test runner.** The project has zero tests. TypeScript catches type errors but misses logic errors (sparkline color, sentinel values for missing data). I'd add vitest with component tests for the renderer state branches (loading, empty, error, edge case data).

**Shared formatting utilities.** The screener and coin-detail renderers each have their own compact-number formatter. I'd extract `formatCompact()` into `src/lib/format.ts` and import it everywhere.

**Responsive breakpoints.** Only the coin detail renderer has media queries. The other 5 renderers would overflow on small screens. I'd add consistent breakpoints at 480px and 640px.

**Accessibility.** Interactive elements (sort buttons, news toggles) are `<button>` elements but the news article cards have no keyboard-navigation pattern (arrow keys between articles, for example). I'd add a roving-tabindex pattern and test with a screen reader.

**Visual polish.** The skeleton loaders are functional but the bar proportions are guessed rather than measured from the real renderers. I'd tune them by inspecting layout widths.

## 12. Quick-start

```bash
git clone https://github.com/VIJAYABASKARVB/saarthi-ui.git
cd saarthi-ui
npm install
npm run dev
```

Open `http://localhost:5173`. Type `screener`, `signals`, `regime`, `news`, `coin`, `composite`, or `error` in the terminal input. Each keyword triggers a different response type with mock data.

Build verification:

```bash
npm run build    # tsc -b && vite build — 0 errors expected
npm run lint     # eslint . — 0 errors expected
```

---
