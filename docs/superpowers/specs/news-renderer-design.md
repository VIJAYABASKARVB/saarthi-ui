# News Renderer — Design Spec

## Overview

Compact terminal-feed renderer for the `news` response type. Bloomberg/newswire aesthetic: dense article cards, text-only (no images), restrained sentiment visualization. Each article is a two-zone compact card. Summaries are collapsed by default to preserve feed density.

## Data Shape

```ts
interface NewsArticle {
  id: string
  headline: string
  source: string
  url: string
  published_at: string
  sentiment: "positive" | "neutral" | "negative"
  sentiment_score: number
  related_coins: string[]
  summary: string
  image_url: string
}

interface NewsData {
  articles: NewsArticle[]
}
```

## File Structure

```
src/components/renderers/
  NewsRenderer.tsx                     — main component, meta header + article list

  news/
    ArticleCard.tsx                    — two-zone card, collapsible summary
    SentimentDot.tsx                   — 5px colored circle (green/amber/red)
    RelativeTime.tsx                   — compact relative timestamp
    RelatedCoinTags.tsx                — lightweight coin pills, max 3
```

## Component Specifications

### NewsRenderer.tsx

- Props: `{ response: SuccessEnvelope<"news", NewsData> }`
- Renders meta header: `news feed · 6 articles` in 10px uppercase dim text, matching ml-signals meta pattern
- Empty state: `articles.length === 0` → centered `NO ARTICLES` dim text, matching `NO SIGNALS` pattern
- Maps `articles[]` → `<ArticleCard key={article.id} article={article} />`

### ArticleCard.tsx

- Props: `{ article: NewsArticle }`
- Two-zone card layout:
  - Top zone: headline (left, bold, 13px) + sentiment dot (right, 5px)
  - Bottom zone: source + relative timestamp (left, 10px dim) + related coin tags (right)
- Headline is a `<button>` element for native keyboard accessibility (Enter/Space to toggle)
- Clicking toggles summary visibility
- Summary: rendered below the two zones when expanded, clamped to 3 lines via `-webkit-line-clamp`
- Card border: `1px solid var(--border)`, no bottom border on last card or separator between cards
- Padding: `10px 14px` per card
- Hover: subtle `background: rgba(255,255,255,0.03)` row highlight
- No transition on expansion — instant toggle

### SentimentDot.tsx

- Props: `{ sentiment: string; score: number }`
- 5px `border-radius: 50%` circle
- Color mapping: `positive` → `var(--green)`, `neutral` → `var(--amber)`, `negative` → `var(--red)`
- Scored threshold: score > 0.1 = positive, < -0.1 = negative, else neutral
- `display: inline-block`, `flex-shrink: 0`

### RelativeTime.tsx

- Props: `{ iso: string }`
- Returns compact relative timestamp string:
  - `< 1 min` → `now`
  - `< 60 min` → `Xm ago`
  - `< 24 hours` → `Xh ago`
  - `< 7 days` → `Xd ago`
  - `>= 7 days` → `May 13` format (month + day)
- `font-variant-numeric: tabular-nums`
- If `published_at` is in the future, returns `now`

### RelatedCoinTags.tsx

- Props: `{ coins: string[] }`
- Renders up to 3 pills, right-aligned
- Each pill: coin symbol uppercased, `border: 1px solid var(--border)`, `color: var(--text-dim)`, `font-size: 9px`, `padding: 0 4px`
- Empty array → renders nothing

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ BlackRock Spot Bitcoin ETF Records $1.2B Weekly Inflow...  [●]  │  ← headline (button, 13px bold) + sentiment dot (5px)
│ CoinDesk · 5m ago                         BTC                  │  ← source · time (left)        coin tags (right)
└──────────────────────────────────────────────────────────────────┘
```

Cards stacked vertically with no gaps between them. Each card separated by `1px solid var(--border)`.

## Edge Cases

- **Empty articles:** `NO ARTICLES` centered dim text
- **Empty related_coins:** tags section omitted entirely
- **Long headline:** single line, `text-overflow: ellipsis`, `white-space: nowrap`
- **Long summary:** clamped to 3 lines via `-webkit-line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical`
- **Single article:** renders as single card, no special handling
- **sentiment_score at threshold boundary:** 0.0 to 0.1 treated as neutral
- **Future published_at:** renders as `now`
- **Missing image_url:** not rendered — intentional (text-only feed)

## CSS Naming

BEM convention under the `news` namespace:

```
.news                        — wrapper
.news__meta                  — meta header
.news__empty                 — NO ARTICLES empty state
.news__card                  — article card
.news__card-top              — top zone (headline + dot)
.news__card-bottom           — bottom zone (source/age + tags)
.news__headline              — headline button
.news__source-age            — source + relative time
.news__separator             — dot separator between source and age
.news__summary               — expanded summary (3-line clamp)
.news__sentiment-dot         — 5px colored circle
.news__tag                   — coin pill
```
