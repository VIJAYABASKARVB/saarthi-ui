---
name: Saarthi UI
description: NL-to-SQL crypto intelligence agent frontend
colors:
  bg: "#050505"
  bg-elevated: "#0a0a0f"
  bg-card: "#0d0d12"
  border: "rgba(255, 255, 255, 0.06)"
  border-hover: "rgba(255, 255, 255, 0.12)"
  accent: "#7c5cff"
  accent-glow: "rgba(124, 92, 255, 0.15)"
  accent-2: "#00d4a8"
  green: "#00d4a8"
  red: "#ff6b6b"
  amber: "#ffb547"
  text: "#e7ecf3"
  text-dim: "#9aa3b2"
  text-mute: "#6b7385"
  ease-spring: "cubic-bezier(0.32, 0.72, 0, 1)"
  ease-smooth: "cubic-bezier(0.4, 0, 0.2, 1)"
typography:
  display-xl:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: 61px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-lg:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-md:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: 42px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: 0
  heading:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  body:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  label:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.1em
    textTransform: uppercase
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
    fontVariantNumeric: tabular-nums
  mono-sm:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
    fontVariantNumeric: tabular-nums
rounded:
  glass: 24px
  bezel: 20px
  bezel-sm: 14px
  pill: 9999px
  card: 16px
  sm: 8px
spacing:
  section: 48px
  stack: 24px
  gutter: 16px
  snug: 12px
  tight: 8px
  micro: 4px
components:
  bezel-shell:
    backgroundColor: "rgba(255, 255, 255, 0.02)"
    border: "1px solid {colors.border}"
    rounded: "{rounded.bezel}"
    padding: 1.5px
  bezel-core:
    backgroundColor: "rgba(13, 13, 18, 0.85)"
    rounded: "calc(1.25rem - 1.5px)"
    backdropFilter: "blur(24px)"
  glass-card:
    backgroundColor: "rgba(13, 13, 18, 0.85)"
    border: "1px solid {colors.border}"
    rounded: "{rounded.card}"
    backdropFilter: "blur(24px)"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: 8px 16px
    height: 36px
  chip:
    backgroundColor: "rgba(13, 13, 18, 0.5)"
    textColor: "{colors.text-dim}"
    rounded: "{rounded.pill}"
    padding: 6px 12px
    border: "1px solid {colors.border}"
  skeleton-bar:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    rounded: "{rounded.pill}"
    height: 12px
---

# Design System: Saarthi UI

## 1. Overview

**Creative North Star: "The Glass Atelier"**

Saarthi UI is a crypto intelligence surface designed like a dark, refined workshop where data is
crafted into market insight. OLED black `#050505` forms the deep workbench surface. Content lives
inside glass enclosures -- Vantablack cards with soft `24px` blur and hairline borders
(`rgba(255, 255, 255, 0.06)`) that feel machined rather than painted on. The single accent --
Violet Surge `#7c5cff` -- is used with precision: it signals active state, primary actions, and
data that demands attention. Jade Stream `#00d4a8` carries positive direction, Coral `#ff6b6b`
negative, and Amber `#ffb547` neutral or cautionary states.

The system rejects the generic crypto dashboard: no neon gradients, no glowing orb backgrounds,
no busy indicator overload. Every surface is restrained until the data earns a color. Geist
Variable carries all text roles in a single weight hierarchy (400/500/600); JetBrains Mono is
reserved strictly for numerical data and price displays. The result is an interface that feels
like a glass-topped workshop desk: you see the tools and the work clearly, through a polished,
quiet surface.

**Key Characteristics:**
- OLED black `#050505` workbench background with radial mesh gradient orbs for atmospheric depth
- Vantablack glass cards (`rgba(13, 13, 18, 0.85)` + `backdrop-filter: blur(24px)`)
- Single accent (Violet Surge `#7c5cff`) used in ≤30% of any surface; its rarity is intentional
- All interactive elements use `rounded-full` (pill) shape; all containers use `16px` or `20px` squircle radii
- CSS custom property `--ease-spring` (`cubic-bezier(0.32, 0.72, 0, 1)`) as the universal motion curve
- Entry animations via `opacity` + `transform` only; no layout-animating properties
- 6 response types (screener, ML signals, market regime, news, coin detail, composite) share a common glass vocabulary but have distinct renderer-specific layouts

## 2. Colors

The palette lives on a dark-field OLED canvas. Every neutral is tinted with a subtle violet
undertone (chroma ~0.008 in OKLCH) to harmonize with the accent. High-chroma extremes are
avoided -- even the red and green signals stay in a calm mid-saturation range.

### Primary
- **Violet Surge** (`#7c5cff`): The single accent. Used for primary CTAs, active selection,
  loading indicators, and focus rings. Never decorative. Always purposeful.

### Secondary
- **Jade Stream** (`#00d4a8`): Positive direction. Price increases, buy signals, upward trends,
  risk-on regimes.
- **Coral** (`#ff6b6b`): Negative direction. Price decreases, sell signals, downward trends,
  risk-off regimes.
- **Amber Ember** (`#ffb547`): Caution or neutral. Hold signals, choppy regimes, warning states.

### Neutral
- **Obsidian** (`#050505`): Body background. OLED-ready deep black.
- **Dark Ash** (`#0a0a0f`): Elevated surfaces, secondary panels.
- **Deep Glass** (`#0d0d12`): Glass card surfaces, container fills.
- **Hairline** (`rgba(255, 255, 255, 0.06)`): Border and divider rules.
- **White Smoke** (`#e7ecf3`): Primary text on dark surfaces.
- **Mist** (`#9aa3b2`): Diminished text, secondary labels.
- **Fog** (`#6b7385`): Muted text, placeholder, disabled states.

### Named Rules

**The One Signal Rule.** Green and red are never used for decoration. They carry direction
and nothing else. A green element that does not indicate "up / positive / buy" is wrong.

**The Violet Threshold Rule.** Violet Surge occupies ≤30% of any given surface. Its
scarcity is the mechanism by which it communicates importance. If a screen is more than
30% violet, the accent has lost its meaning.

## 3. Typography

**Display Font:** Geist Variable (with system-ui, sans-serif fallback)
**Body Font:** Geist Variable (same family -- single-font system)
**Label/Mono Font:** JetBrains Mono (for numerical data and prices only)

**Character:** A single sans family carries every text role, from 61px hero headlines to
10px uppercase labels. The hierarchy comes entirely from size and weight contrast (Geist
at 400/500/600). JetBrains Mono enters only where tabular-nums precision matters: prices,
percentages, market caps. The result is clean and unfussy -- no display face, no serif,
no italic. The data speaks through weight and scale, not typographic variety.

### Hierarchy
- **Display XL** (600, 61px, 1.1): Idle screen hero headline. Only appears once per page.
- **Display LG** (600, 48px, 1.1): Large state names (market regime). One per response.
- **Display MD** (600, 42px, 1.15): Regime hero state name, secondary hero text.
- **Heading** (600, 20px, 1.2): Renderer section titles (e.g. "ML Signals", "Market Regime").
- **Body** (400, 14px, 1.6): Default text. All paragraph content. Cap line length at 65-75ch.
- **Body Sm** (400, 12px, 1.5): Secondary description, metric labels, explanation text.
- **Mono** (500, 14px, 1.4): Prices, percentages, market cap values. Tabular-nums for alignment.
- **Mono Sm** (500, 11px, 1.4): Compact numeric data in tables and dense metrics.
- **Label** (600, 10px, 1.4, 0.1em letter-spacing, uppercase): Eyebrow badges, column headers, section meta.

### Named Rules
**The Mono-Only-For-Numbers Rule.** JetBrains Mono is forbidden for prose. Headlines,
labels, buttons, paragraphs: all Geist. Only prices, percentages, and tabular data earn
the mono face.

## 4. Elevation

The system uses tonal layering, not shadows, to convey depth. An 8-step neutral scale moves
from `#050505` (body background) through `#0a0a0f` (elevated surfaces) to `#0d0d12` (glass
card core). The only "lift" effect comes from subtle glass borders (`1px solid rgba(255,
255, 255, 0.06)`) and `backdrop-filter: blur(24px)` on active content panels. Nothing ever
floats or casts a shadow.

### Shadow Vocabulary
- **None at rest.** All surfaces are flat by default.
- **Hover state:** `box-shadow: 0 0 0 1px rgba(124, 92, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)` -- used exclusively on interactive glass cards during hover, never at rest.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. No drop shadows, no elevation
at rest. Shadows appear only as a response to hover state on interactive cards. A surface
that looks "lifted" when it should be at rest is wrong.

## 5. Components

### Bezel Container (Signature)
The Double-Bezel nested architecture is the project's signature container pattern. Every major
renderer and input surface uses it.

- **Outer Shell** (`bezel-shell`): `rgba(255, 255, 255, 0.02)` background, `1px solid
  rgba(255, 255, 255, 0.06)` border, `rounded-[20px]`, `padding: 1.5px`. Transitions border
  to `rgba(255, 255, 255, 0.1)` on hover.
- **Inner Core** (`bezel-core`): `rgba(13, 13, 18, 0.85)` background, `backdrop-filter:
  blur(24px)`, `calc(1.25rem - 1.5px)` computed radius for concentric curvature. Box shadow
  `inset 0 1px 1px rgba(255, 255, 255, 0.04)` for a subtle inner highlight.
- **Compact variant** (`bezel-shell--sm` / `bezel-core--sm`): `14px` outer radius with `1px`
  padding. Used inside nested layouts like ML signal cards.

### Input / Search
- **Style:** Flush-mounted input inside a Bezel Container. Search icon at left (`Search`,
  `18px`, `--text-mute`), text field in Geist Body (14px), magnetic submit button as a
  pill at far right.
- **Focus:** The bezel-shell border transitions to `rgba(124, 92, 255, 0.4)` with spring
  easing.
- **States:** Default with placeholder text. Focus with accent glow.

### Chips (Quick-Query Pills)
- **Style:** Rounded-full (`9999px`), `rgba(13, 13, 18, 0.5)` core with `backdrop-filter:
  blur(12px)`, `1px solid rgba(255, 255, 255, 0.08)` border, Geist Body Sm (12px) text.
- **Default:** Text in `--text-dim`.
- **Hover:** Border transitions to `--accent`, text transitions to `--accent`. Duration
  500ms with spring easing. Lucide icons at `13px` with `strokeWidth={1.5}`.

### Buttons
- **Shape:** Rounded-full (`9999px`). No exceptions.
- **Primary:** Violet Surge `#7c5cff` fill, white text, `8px 16px` padding. Used for submit
  actions and CTAs. Hover brightens to `#8d6fff`.
- **Magnetic variant** (`.magnetic-btn`): On hover, the button transitions `transform:
  scale(1)`. On `:active`, `scale(0.98)` simulates physical pressing. A nested icon
  (`.magnetic-icon`) translates diagonally on hover.

### Eyebrow Badge
- **Style:** Rounded-full pill, `rgba(124, 92, 255, 0.1)` background, `1px solid
  rgba(124, 92, 255, 0.2)` border, Geist Label (10px, uppercase, 0.15em tracking),
  Violet Surge text. Used as section pre-headers and status labels.

### Skeleton Loader
- **Style:** `height: 12px` bars with `rgba(255, 255, 255, 0.04)` fill, `rounded-full`,
  and a `skeleton-pulse` keyframe animation (opacity 0.3 to 0.6, 1.5s, ease-smooth).
  Each renderer has a skeleton variant that mirrors its real content layout.

### Cards / Containers
- **Corner Style:** `16px` radius for standalone glass cards. `20px` for bezel-shell
  containers.
- **Background:** `rgba(13, 13, 18, 0.85)` with `backdrop-filter: blur(24px)`.
- **Shadow Strategy:** None at rest. Hover cards get `0 0 0 1px rgba(124, 92, 255, 0.1),
  0 8px 32px rgba(0, 0, 0, 0.4)`.
- **Border:** `1px solid rgba(255, 255, 255, 0.06)`.
- **Internal Padding:** `16px` standard, `12px` compact, `24px` generous.

## 6. Do's and Don'ts

### Do:
- **Do** use Violet Surge `#7c5cff` for primary actions, active selection, loading indicators,
  and focus rings. Use it on ≤30% of any surface.
- **Do** wrap major content blocks in the Bezel Container pattern (outer shell + inner core)
  for a machined-hardware feel.
- **Do** use JetBrains Mono for all price, percentage, and tabular data. Everywhere else:
  Geist Variable.
- **Do** use `rounded-full` (9999px) for all interactive elements (buttons, chips, badges,
  pagination pills).
- **Do** use `--ease-spring` (`cubic-bezier(0.32, 0.72, 0, 1)`) as the universal transition
  curve. No `linear`, no `ease-in-out`.
- **Do** animate entry via `opacity` + `transform` only. Use the predefined classes
  `.animate-fade-up`, `.animate-fade-in`, `.animate-scale-in`.
- **Do** use Jade Stream `#00d4a8` for positive direction, Coral `#ff6b6b` for negative,
  Amber Ember `#ffb547` for neutral or cautionary.

### Don't:
- **Don't** use gradient text (`background-clip: text` with gradient). Use solid color with
  weight/size for emphasis.
- **Don't** use side-stripe borders (border-left greater than 1px as colored accent). Use
  full borders, background tints, or text color instead.
- **Don't** use glassmorphism decoratively. The glass card pattern is the content surface;
  don't layer glass on glass.
- **Don't** use drop shadows at rest. Surfaces are flat by default.
- **Don't** use any sans-serif fallback that is not Geist Variable or Inter (no Roboto,
  Arial, Helvetica).
- **Don't** use default shadcn appearance. Every shadcn component must be restyled to
  match this design system.
- **Don't** use neon gradients, glowing orb backgrounds, or busy indicator overload. This
  is not a generic crypto dashboard.
- **Don't** animate CSS layout properties. Only `transform` and `opacity`.
- **Don't** use generic horizontal progress bars for confidence or probability. Use the
  radial gauge pattern or thin spring-animated bars.
- **Don't** use em dashes in copy. Use commas, colons, semicolons, or periods.
