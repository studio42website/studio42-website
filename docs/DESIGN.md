# DESIGN

Visual system for Studio42. Source of truth: `src/styles/global.css`. This file explains it.

Dark. Minimal. Material-focused. No shadows, no heavy radii, no image textures.

---

## Colors

All colors are CSS variables. Never hardcode.

### Core
| Variable | Hex | Use |
|---|---|---|
| `--color-dark` | `#0a0a0a` | Page background |
| `--color-bg` | `#0f0f0f` | Secondary backgrounds |
| `--color-surface` | `#1a1a1a` | Cards, panels |
| `--color-border` | `#2a2a2a` | Borders, dividers |
| `--color-text` | `#f5f5f5` | Primary text, headers |
| `--color-text-muted` | `#999` | Body copy, inactive nav |
| `--color-text-light` | `#666` | Captions, metadata |

### Earth tones — material focus
| Variable | Hex | Use |
|---|---|---|
| `--color-rust` | `#8B4513` | 3px left accent on cards |
| `--color-terracotta` | `#C1440E` | Warm highlight, product tags |
| `--color-warm-gray` | `#A89968` | Subtle material accents |
| `--color-natural-wood` | `#6B5B4A` | Wood-themed contexts |

### Neon accents — edgy contrast
| Variable | Hex | Use |
|---|---|---|
| `--color-cyan` | `#00D9FF` | Primary accent, prices, active nav, CTA bg |
| `--color-magenta` | `#FF006E` | Hover state, glow |
| `--color-electric-blue` | `#0066FF` | Reserved (not currently used) |
| `--color-accent` | → cyan | Semantic alias |

### Usage rules
- **Buttons:** `--color-cyan` bg, dark text. On hover: switch to `--color-magenta`, add `text-shadow: 0 0 8px rgba(255, 0, 110, 0.5)` glow.
- **Links:** `--color-accent` (cyan), 2px bottom border in same color. Hover → magenta + glow.
- **Nav:** `--color-text-muted` default, `--color-cyan` on active/hover.
- **Cards:** `--color-surface` bg, `--color-border` 1px all sides, **3px left accent in `--color-rust`**.
- **Price:** `--color-cyan`, uppercase.
- **Headers:** `--color-text` only.

---

## Typography

### Family
- **UI:** `--font-family` — system stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', ...`)
- **Mono:** `--font-mono` — `'Courier New', monospace`

Custom fonts are fine to add if they match "bold, geometric, modern." Candidates to consider: Inter, Space Grotesk, Neue Haas Grotesk, Söhne. Decide with Zorkow.

### Scale
| Variable | Size | Use |
|---|---|---|
| `--font-size-sm` | 0.875rem | Captions, metadata |
| `--font-size-base` | 1rem | Body |
| `--font-size-lg` | 1.125rem | Emphasis |
| `--font-size-xl` | 1.5rem | Small headers |
| `--font-size-2xl` | 2rem | H3 |
| `--font-size-3xl` | 2.5rem | H2 |
| `--font-size-4xl` | 3.5rem | H1, hero |

### Weights
- `--font-bold: 700` — emphasized body
- `--font-extrabold: 800` — all headers

### Rules
- **All headers uppercase.** `text-transform: uppercase`.
- **Letter-spacing on headers:** `0.05em` for H1, `0.03em` for H2-H6.
- **Word-spacing on headers:** `0.1em`.
- **Body line-height:** `1.8`.
- **Body letter-spacing:** `0.01em`.

---

## Spacing

Generous whitespace. No cramped layouts.

| Variable | Value |
|---|---|
| `--spacing-xs` | 0.5rem |
| `--spacing-sm` | 1rem |
| `--spacing-md` | 1.5rem |
| `--spacing-lg` | 2rem |
| `--spacing-xl` | 3rem |
| `--spacing-2xl` | 4rem |
| `--spacing-3xl` | 5rem |

Sections pad `--spacing-2xl` top/bottom. Container max-width: `1200px`, padded `--spacing-lg` sides.

---

## Radii, shadows, motion

### Radii
- Max `6px`. Usually `0` or `4px`. Never pill shapes unless it's an intentional icon/pattern.

### Shadows
- **Banned for layout.** No `box-shadow` on cards, buttons, nav.
- Allowed only as **accent glow** for hover states via `text-shadow` (magenta 0 0 8px) or rare `filter: drop-shadow` on SVG.

### Transitions
| Variable | Duration | Use |
|---|---|---|
| `--transition-fast` | 0.15s | Hover color changes |
| `--transition-base` | 0.3s | Default — borders, transforms |
| `--transition-slow` | 0.5s | Entrance animations |

All ease. Never bounce. Never elastic.

---

## Patterns

Only two, both geometric, both CSS-only. **No image textures.**

### Dot pattern
```css
background: var(--pattern-dot);
/* radial cyan dot, 4px radius */
```

### Grid pattern
```css
background: var(--pattern-grid);
background-size: var(--pattern-grid-size) var(--pattern-grid-size);
/* 1px border-color grid, 20px cells */
```

Use sparingly — on hero sections, empty states, 404s. Not on every section.

---

## Components — rules

### Card
- `--color-surface` bg
- `--color-border` 1px all sides
- **3px left accent** in `--color-rust`
- Image aspect-ratio 1:1, object-fit cover
- Hover: border → `--color-cyan`, `transform: translateY(-4px)`

### Button — primary
- `--color-cyan` bg, `--color-dark` text
- `--spacing-sm` `--spacing-lg` padding
- Uppercase, 800 weight, 0.05em letter-spacing
- Hover: bg → `--color-magenta`, add magenta glow

### Button — ghost
- Transparent bg, `--color-cyan` text, 1px `--color-cyan` border
- Hover: bg → `--color-cyan`, text → `--color-dark`

### Nav link
- `--color-text-muted` default
- `--color-cyan` on hover/active
- No underline (border-bottom is for inline `<a>` only)

### Inline link
- `--color-accent` text
- 2px bottom border same color
- Hover: magenta + glow

### Input
- `--color-bg` bg
- `--color-border` 1px
- `--color-text` text
- `--color-cyan` focus ring (2px outline offset)

---

## What's banned

- Image textures (wood grain PNGs, paper textures, etc.)
- `box-shadow` on layout elements
- Gradients other than the two defined patterns
- Rounded corners > 6px
- Pastels, warm whites, off-whites (we have true white `#f5f5f5` and true dark `#0a0a0a`)
- Tailwind utility classes (we don't run Tailwind — pure CSS + variables)
- Inline styles except for dynamic one-offs
- `!important` — ever

---

## When to update this file

- New CSS variable added to `global.css` → add to tables here
- New component pattern emerges → add a rules block
- Design debate resolved → document the outcome
