# FIGMA

Figma + Claude workflow. **Status: planned, not yet set up.** This file is the plan — follow it to get there.

---

## Why Figma

Right now the visual system lives in `src/styles/global.css`. It works, but:

- No visual preview of tokens in one place
- Designing layouts in your head and jumping straight to Svelte is slow
- Zorkow works in Figma natively — needs a shared surface
- New pages benefit from sketching before coding

Figma becomes the **design source of truth**. Code implements what the Figma file shows.

---

## Goal state

```
Figma file: Studio42 — Website
├── Design System
│   ├── Color tokens (mirrors --color-* variables)
│   ├── Typography scale (H1-H6, body, caption)
│   ├── Spacing scale (xs to 3xl)
│   ├── Components (Card, Button, NavLink, Input, ProductCard)
│   └── Patterns (dot, grid)
└── Pages
    ├── Home
    ├── Products (listing)
    ├── Product Detail (LIGHTING-V1)
    ├── About
    ├── Blog (listing + post template)
    └── Community
```

Claude reads the file via MCP. When Luka updates a frame, Claude can translate changes into Svelte components.

---

## Setup checklist

### Figma side — Luka or Zorkow
- [ ] Create Figma file: `Studio42 — Website` in a team/project
- [ ] Create two pages: `Design System`, `Pages`
- [ ] On `Design System`: build color swatches as Figma styles (named `color/dark`, `color/cyan`, etc. — one-to-one with CSS variables)
- [ ] Build text styles (`heading/h1`, `heading/h2`, `body/base`, `body/muted`, `caption`)
- [ ] Build spacing/layout grid (1200px container, 8pt base)
- [ ] Build the five core components as Figma components: `Card`, `Button/Primary`, `Button/Ghost`, `NavLink`, `ProductCard`
- [ ] On `Pages`: frame each route at 1440px desktop + 375px mobile, side by side
- [ ] Enable Figma Dev Mode (free for viewers, paid for editors)

### Claude side
- [ ] Install Figma Dev Mode MCP connector in Cowork / Claude Code
- [ ] Grant access to the Studio42 Figma file
- [ ] Test round-trip: paste a Figma frame link, Claude reads it, describes tokens used
- [ ] Document the MCP setup steps here once working

### Sync layer
- [ ] Decide token export strategy:
  - **Option A (manual):** Luka updates a color in Figma → edits `global.css` to match (or asks Claude to)
  - **Option B (script):** Export Figma styles to JSON → script updates CSS variables
  - **Option C (Tokens Studio plugin):** Figma plugin that syncs to a GitHub repo
  - **Recommendation:** Start with A, upgrade to C if token churn gets painful

---

## Naming conventions

**Figma component name = Svelte component name.** One-to-one.

| Figma | Svelte file |
|---|---|
| `ProductCard` | `src/lib/components/ProductCard.svelte` |
| `Header` | `src/lib/components/Header.svelte` |
| `Footer` | `src/lib/components/Footer.svelte` |
| `Button/Primary` | `src/lib/components/Button.svelte` with `variant="primary"` prop |
| `Button/Ghost` | same file, `variant="ghost"` |
| `NavLink` | inline in `Header.svelte` for now; extract if reused |

**Variants** use slashes (`Button/Primary`, `Card/Default`, `Card/Hover`). Pages use page names (`Home`, `Products`, `ProductDetail`).

**Frames on Pages page** named: `{route}/desktop` and `{route}/mobile`. Example: `home/desktop`, `products/mobile`.

---

## Workflow — weekly rhythm

1. **Monday:** Luka sketches what changes this week in Figma (new page, layout update, component variant).
2. **Tuesday:** Zorkow polishes, Zarja reviews copy placement.
3. **Wednesday:** Luka shares Figma frame links with Claude.
4. **Wed–Thu:** Claude implements in Svelte, pushes branch, preview deploys via Vercel.
5. **Friday:** Review on preview URL, merge to main, Vercel auto-deploys production.

---

## Token sync — manual version (Option A, start here)

When a color or spacing token changes in Figma:

1. Luka updates the Figma style
2. Luka (or Claude) updates the matching variable in `src/styles/global.css`
3. Commit: `design: update --color-X to match Figma`
4. Push, preview, verify

No automation yet. Keeps it simple. We add tooling only when manual hurts.

---

## MCP connector — notes

**Figma Dev Mode MCP Server** is the path. Anthropic's official guide covers setup. Rough outline:

1. In Figma: Settings → Dev Mode → enable MCP server
2. In Cowork: connect Figma MCP, authorize
3. In a Claude session: reference a frame URL, Claude fetches layers, text, styles

Claude can read:
- Layer tree
- Fills, strokes, effects (for tokens)
- Text content and text styles
- Auto-layout settings
- Component properties

Claude cannot (yet) write back to Figma. The arrow goes Figma → code, not code → Figma. If we want the reverse, Luka updates Figma by hand.

---

## What we don't do

- **No design-to-code tools** (Anima, Locofy, Builder.io). They generate messy, non-systematic code. We want code that uses our variables.
- **No auto-sync between Figma and CSS.** Manual sync is fine at this scale. Automate only if token churn becomes painful.
- **No Figma plugins that inject code.** Keep the code clean. Claude translates manually.

---

## When this file needs updating

- MCP connector successfully set up → document the exact steps that worked
- Naming convention shifts → update the table
- Token sync moves to Option B or C → rewrite that section
- New component added to Figma library → add to the naming table
