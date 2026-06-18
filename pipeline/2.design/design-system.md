# Design System — Sliding Puzzle

## Goals
1. Unified visual language across every component in the app.
2. Reusable tokens and patterns — never repeat a raw colour or radius value.
3. Modern dark palette with clear hierarchy and vibrant accents.

---

## Colour Palette

The app runs permanently in dark mode (`color-scheme: dark`). All tokens below are
Tailwind class aliases; no custom CSS variables are needed beyond what Tailwind ships.

### Background layers (depth model)

| Role            | Tailwind token   | Hex       | Usage |
|-----------------|------------------|-----------|-------|
| Canvas (deepest)| `bg-slate-950`   | `#020617` | `<body>`, modal backdrops, empty tile |
| Surface         | `bg-slate-900`   | `#0f172a` | Cards, buttons, board wrapper |
| Surface raised  | `bg-slate-800`   | `#1e293b` | Hover states, inner panels |
| Overlay         | `bg-black/60`    | —         | Modal scrim |

> Rule: every visual layer must be at least one step darker or lighter than the layer
> below it. Never place two identical surface colours directly on top of each other.

### Text

| Role            | Tailwind token   | Usage |
|-----------------|------------------|-------|
| Primary         | `text-slate-100` | Headings, labels |
| Secondary       | `text-slate-300` | Body copy, captions |
| Muted           | `text-slate-400` | Meta, timestamps, placeholders |
| On-accent       | `text-slate-950` | Text on sky-500 buttons |

### Accent — Sky (primary interactive)

| Role              | Tailwind token     | Usage |
|-------------------|--------------------|-------|
| Solid CTA         | `bg-sky-500`       | Primary button fill, active pill |
| Hover CTA         | `bg-sky-400`       | Primary button hover |
| Tinted background | `bg-sky-500/15`    | Step badges, icon wells |
| Border highlight  | `border-sky-400`   | Active key in arrow illustration |
| Text highlight    | `text-sky-200`     | Step numbers, highlighted labels |

### Accent — Emerald (positive / success)

| Role              | Tailwind token      | Usage |
|-------------------|---------------------|-------|
| Tinted background | `bg-emerald-500/15` | Reference icon well, win state |
| Solid             | `bg-emerald-500`    | (future: win badge) |

### Borders

All borders use `border-slate-700` at default opacity. Never use a border that is
brighter than the surface it sits on.

---

## Typography

Font stack: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
(already set in `globals.css`; do not override).

| Role            | Classes                                     |
|-----------------|---------------------------------------------|
| Display/Heading | `text-2xl font-semibold text-slate-100`     |
| Section title   | `text-base font-semibold text-slate-100`    |
| Body            | `text-sm text-slate-300`                    |
| Caption / meta  | `text-xs font-medium text-slate-400`        |
| Label uppercase | `text-xs font-medium uppercase tracking-wide text-slate-400` |

---

## Spacing & Sizing

| Token     | Value  | Usage |
|-----------|--------|-------|
| `p-4`     | 1 rem  | Default card padding |
| `p-5`     | 1.25rem| Modal inner padding |
| `p-6`     | 1.5rem | Win modal padding |
| `gap-2`   | 0.5rem | Tight sibling spacing |
| `gap-3`   | 0.75rem| Standard sibling spacing |
| `mt-2`    | 0.5rem | Paragraph after heading |
| `mt-3`    | 0.75rem| Content after section header |
| `mt-5`    | 1.25rem| Section separation |

---

## Border Radius

| Token        | Usage |
|--------------|-------|
| `rounded-xl` | Puzzle tiles |
| `rounded-2xl`| Inner cards, illustration boxes |
| `rounded-3xl`| Modal containers, board wrapper |
| `rounded-full`| Buttons (pill), icon buttons, step badges |

Radius scales with visual weight: the outermost container always uses the largest
radius, inner elements step down one level.

---

## Shadow

| Token                            | Usage |
|----------------------------------|-------|
| `shadow-2xl shadow-black/40`     | Modals |
| `shadow-2xl shadow-black/30`     | Board wrapper |

---

## Component Catalogue

### Button

Two variants only. Do not create new variants without updating this document.

**Primary** — sky pill, used for every affirmative CTA (Start, Replay, Next):
```
rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950
transition hover:bg-sky-400
```

**Secondary** — ghost pill, used for dismissive actions (Skip, Close):
```
rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm
font-semibold text-slate-200 transition hover:bg-slate-800
```

> **Fix**: the current secondary variant uses `p-3` (square pad) which matches
> `IconButton`, not a text button. Change to `px-5 py-2` for text buttons to match primary.

### IconButton

Square → round icon trigger. The icon is an emoji or SVG child:
```
rounded-full border border-slate-700 bg-slate-900 p-3 text-slate-200
transition hover:bg-slate-800
```

### Modal

Backdrop + centred card. Rules:
- Backdrop: `fixed inset-0 z-{n} flex items-center justify-center bg-black/60 px-4`
- Card: `w-full max-w-{x} rounded-3xl border border-slate-700 bg-slate-950
  p-5 shadow-2xl shadow-black/40`
- A transparent `<button>` covers the backdrop so click-outside dismisses the modal.
- `zIndexClass` prop allows stacking multiple modals (`z-20` default, `z-30` for
  priority modals like instructions and win).

### Card (inner content block)

Used inside modals for step cards and info sections:
```
rounded-2xl border border-slate-700 bg-slate-900/60 p-4
```

### Step Badge

Numbered circle used for ordered steps:
```
flex h-8 w-8 items-center justify-center rounded-full
bg-sky-500/15 text-sm font-semibold text-sky-200
```

### PuzzleDifficultySelector pill

Active state mirrors primary Button. Inactive mirrors secondary Button without
the explicit `px-5` — keep `px-4 py-2` because these are compact filter chips:
```
Active:   rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950
Inactive: rounded-full border border-slate-700 bg-slate-900 px-4 py-2
          text-sm font-semibold text-slate-200 hover:bg-slate-800
```

### PuzzleBoard wrapper

```
mx-auto rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-black/30
```
Width rule: `min(100%, calc((100dvh - 9rem) * cols / rows))` — preserves aspect
ratio on every screen size.

### Puzzle tile (active)

```
relative overflow-hidden rounded-xl border border-slate-700 bg-slate-900
hover:scale-[0.99] active:scale-[0.98] transition duration-200
```

### Puzzle tile (empty slot)

```
border-dashed border-slate-700 bg-slate-950/80
```

---

## Motion & Animation

| Use case                          | Approach |
|-----------------------------------|----------|
| Tile tap feedback                 | `scale` via Tailwind (`hover:scale-[0.99] active:scale-[0.98]`) with `transition duration-200` |
| Button hover                      | `transition` on `bg-*` colour, no duration needed (Tailwind default 150 ms) |
| Swipe illustration (instructions) | CSS keyframe animation on the finger/arrow element; keep under 600 ms, `ease-in-out`, `infinite` loop |
| Modal enter/exit                  | No animation currently. Future: `fade + scale` via `transition` classes |

### Animated swipe illustration spec

```css
@keyframes swipe-up-down {
  0%,100% { transform: translateY(0);   opacity: 1; }
  40%      { transform: translateY(-8px); opacity: 0.7; }
  60%      { transform: translateY(8px);  opacity: 0.7; }
}
```
Apply with Tailwind arbitrary: `animate-[swipe-up-down_1.2s_ease-in-out_infinite]`
or extract to `globals.css` as a named utility.

---

## Layout

The app is a single-screen experience (`h-dvh`, `overflow: hidden`).

```
<main>                           ← bg-slate-950, flex col, px-4 pt-4 pb-2
  <header>                       ← centered, stats row + controls row
    stats row                    ← text-sm text-slate-300
    controls row                 ← IconButton | Button(primary) | IconButton
  </header>
  <DifficultySelector>           ← flex-wrap justify-center gap-2
  <section flex-1>               ← items-center justify-center, board lives here
    <PuzzleBoard>
    modals (portal/overlay)
  </section>
</main>
```

Max-width constraint on the controls row: `max-w-[28rem]` centred with `mx-auto`.

---

## Accessibility

- Every interactive element has an `aria-label`.
- Modals have a visually hidden close path (backdrop button + explicit action button).
- Step badges use numeric text content, not purely colour, to convey order.
- Empty puzzle slot uses `aria-label="Empty slot"`.
- Tiles use `aria-label="Tile {n}"`.

---

## Consistency Checklist

Before shipping any UI change, verify:

- [ ] Colours come from the palette table above — no raw hex except `#020617` / `#0f172a` in `globals.css`.
- [ ] Radius follows the depth rule: outermost = `rounded-3xl`, cards = `rounded-2xl`, tiles = `rounded-xl`, pills = `rounded-full`.
- [ ] Text hierarchy: heading → `slate-100 font-semibold`, body → `slate-300`, meta → `slate-400`.
- [ ] Primary action = sky-500 pill. Secondary = slate-900 ghost pill.
- [ ] Borders = `border-slate-700`; no brighter borders unless it is an active/focus state.
- [ ] Every new modal reuses the `Modal` component — no raw `fixed inset-0` outside of it.
- [ ] Shadows only on floating elements (modals, board); flat surfaces are shadow-free.
- [ ] No new box/card added unless it passes the Box Restraint decision rule.

---

## What to Avoid

| Anti-pattern | Reason |
|---|---|
| Raw hex colours in JSX | Breaks theming and makes future palette updates painful |
| Multiple shades of blue without purpose | Confuses hierarchy — sky is the only interactive accent |
| Borders brighter than surface | Fights the depth model |
| New radius values (`rounded-lg`, `rounded-sm`) on cards | Inconsistent; stick to the catalogue |
| `shadow-md` or `shadow-lg` on flat/inline elements | Shadows are reserved for truly elevated surfaces |
| Inline `style` for colours | Can't be overridden by Tailwind utilities |
| Wrapping every text group in a box/card | Creates visual noise and cramped layouts — see Box Restraint rules below |

---

## Box Restraint

AI-generated UI tends to wrap every piece of content in a bordered card. This app uses
boxes sparingly. Follow these rules before adding any `rounded-* border bg-*` container.

### When a box IS justified

- The content is a **self-contained interactive region** (modal, board, tile).
- The content needs **visual separation from a complex background** (illustration panels
  inside the instructions modal).
- The element is **truly floating** above the page (modals, dropdowns).

### When a box is NOT justified

- A simple label + value pair (e.g. "Time: 00:12 · Moves: 7" — plain text, no card).
- A list of buttons that already have their own shape (pill buttons stand alone).
- A section heading with a paragraph below it — use spacing (`mt-*`, `gap-*`) instead.
- An icon next to a description — use `flex gap-*`, not a card wrapper.
- Any grouping whose only purpose is "to look organised" — spacing achieves that for free.

### Decision rule

> Ask: *would removing the box break the layout or lose meaning?*
> If no → remove the box. If yes → keep it and document why in a comment.

### Nesting limit

**Maximum 2 levels of box nesting** in any single view:

```
Modal card (level 1)
  └── Step card (level 2)         ← stop here
        └── ~~illustration box~~  ← remove; use spacing instead
```

Illustrations and icon-wells inside a step card must use spacing and colour tints
(`bg-sky-500/15`, `rounded-full`) on the icon itself — not another bordered container.
