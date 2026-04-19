# STRUCTURE

Where things live in the Studio42 repo. Updated 2026-04-19.

---

## Tree

```
studio42/
├── CLAUDE.md                 # AI assistant primer (personality + rules)
├── README.md                 # Project readme (top-level)
│
├── docs/
│   ├── README.md             # Docs index and read order
│   ├── HANDOFF.md            # Project state snapshot
│   ├── ROADMAP.md            # Live TODO list
│   ├── STRUCTURE.md          # This file
│   ├── DESIGN.md             # Visual system reference
│   ├── VOICE.md              # Copy voice rules
│   ├── FIGMA.md              # Figma + Claude workflow
│   ├── SERVICES.md           # External services reference
│   ├── archive/              # Obsolete docs, kept for history
│   │   ├── BUILD_SUMMARY.md
│   │   ├── CHATWOOT_SETUP.md
│   │   └── GITHUB_INTEGRATIONS.md
│   └── reference/            # Mood boards, inspiration
│       └── pinterest-board.pdf
│
├── src/
│   ├── app.html              # Root HTML shell
│   ├── lib/
│   │   ├── assets/
│   │   │   └── favicon.svg   # (duplicate of static/favicon.svg — pick one)
│   │   ├── components/
│   │   │   ├── ChatWidget.svelte      # Tawk.to embed
│   │   │   ├── Footer.svelte
│   │   │   ├── Header.svelte
│   │   │   └── ProductCard.svelte
│   │   ├── stores/           # (currently empty — room for future stores)
│   │   ├── utils/            # (currently empty — room for future utils)
│   │   ├── stores.js         # Cart, products, theme stores
│   │   └── index.js          # Lib barrel
│   ├── routes/
│   │   ├── +layout.svelte    # Root layout, nav, footer
│   │   ├── +page.svelte      # Home
│   │   ├── about/
│   │   │   └── +page.svelte
│   │   ├── blog/
│   │   │   └── +page.svelte
│   │   ├── community/
│   │   │   └── +page.svelte
│   │   └── products/
│   │       ├── +page.svelte           # Listing
│   │       └── [slug]/+page.svelte    # Dynamic product detail
│   └── styles/
│       └── global.css        # CSS variables + base styles
│
├── static/                   # Static assets served as-is
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/products/
│       ├── lighting-v1.jpg   # Placeholder, awaiting real photos
│       ├── pen-holder.jpg    # Placeholder
│       └── candle-stand.jpg  # Placeholder
│
├── .gitignore
├── .prettierrc, .prettierignore
├── .npmrc
├── .vercelignore
├── .vscode/extensions.json
├── jsconfig.json
├── package.json
├── package-lock.json
├── svelte.config.js
├── vite.config.js
└── vercel.json
```

---

## What goes where

### New Svelte component
`src/lib/components/{Name}.svelte`. Export from `src/lib/index.js` if reused across pages.

### New page / route
`src/routes/{path}/+page.svelte`. For dynamic segments use `[slug]`.

### New CSS variable
`src/styles/global.css` in the `:root` block. Add a row to `docs/DESIGN.md`.

### New static asset
`static/{category}/{file}`. Referenced from components as `/category/file.ext` (leading slash).

### Product image
`static/images/products/{product-id}.jpg`. Update `src/lib/stores.js` products array.

### New doc
`docs/{NAME}.md`. Add a row to `docs/README.md` index. Follow voice rules.

### Reference material (inspiration, PDFs)
`docs/reference/`. Nothing executable here.

### Store (cart, theme, cross-component state)
`src/lib/stores.js` for now. Split into `src/lib/stores/{name}.js` only when the file gets past ~150 lines.

### Utility function
`src/lib/utils/{name}.js`. One file per domain (e.g., `format.js`, `dates.js`).

---

## What shouldn't be in the repo

- `.ssh/` (currently present — roadmap item to move out)
- Test automation scripts (removed)
- Screenshots (removed)
- Log files (removed)
- `.env*` files with secrets (never commit; Vercel env vars instead)

---

## Build outputs (gitignored)

- `.svelte-kit/` — SvelteKit cache and generated code
- `.vercel/` — Vercel local cache
- `node_modules/` — dependencies
- `build/`, `.output/` — production build artifacts

---

## When this file needs updating

- New top-level folder
- Significant `src/` reorganization
- New file category or naming convention
