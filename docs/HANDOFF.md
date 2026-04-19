# CLAUDE_HANDOFF.md — Studio42 Website
**For:** Claude Code (fresh session)  
**Date:** April 19, 2026  
**Deadline:** May 15, 2026 (LIGHTING-V1 launch, 26 days)  
**Status:** Site is LIVE, design in progress, content is placeholder

---

## THE PROJECT

Studio42 is Luka's handmade lighting brand (Ljubljana, Slovenia). This is the launch website for **LIGHTING-V1**, the first product. Goal: dark, minimal, material-focused aesthetic. Live by May 15.

**Live site:** https://studio42-website.vercel.app  
**GitHub:** https://github.com/studio42website/studio42-website  
**Local:** `/mnt/c/Users/User/Documents/studio42/`

---

## WHAT IS WORKING RIGHT NOW

### Deployment ✅
- **Vercel** is the host. Auto-deploys on `git push origin main`. Takes ~1-2 min.
- Build command: `npm run build` → outputs to `.svelte-kit/output`
- GitHub OAuth drives auto-deploy (no manual trigger needed)
- `git push origin main` = site updates

### Pages ✅ (all routing works, content is placeholder)
| Page | URL | Status |
|------|-----|--------|
| Home | `/` | ✅ Working, has hero + featured product |
| Products | `/products` | ✅ Grid with 3 products + images |
| Product Detail | `/products/[slug]` | ✅ Dynamic routing working |
| About | `/about` | ✅ Renders, placeholder copy |
| Blog | `/blog` | ✅ Renders, static placeholder posts |
| Community | `/community` | ✅ Renders, has Tawk.to chat widget |

### Components ✅
- `Header.svelte` — sticky nav, STUDIO42 logo, mobile hamburger
- `Footer.svelte` — links, socials, copyright
- `ProductCard.svelte` — reusable card (image, title, price, link)
- `ChatWidget.svelte` — Tawk.to live chat embed

### Product Images ✅
- `/static/images/products/lighting-v1.jpg` (placeholder, ~1.3MB)
- `/static/images/products/pen-holder.jpg` (placeholder, ~1.2MB)
- `/static/images/products/candle-stand.jpg` (placeholder, ~1.4MB)

### Chat ✅
- Tawk.to live chat on Community page
- Widget ID: `69e34e81a7ff261c327a9efc`
- Admin: s42contact@gmail.com → https://tawk.to

### Design System ✅ (CSS defined, NOT applied to components yet)
- `src/styles/global.css` — full color system, typography, spacing variables defined
- Colors: dark (#0a0a0a), cyan accent (#00D9FF), magenta hover (#FF006E), rust/terracotta earth tones
- Typography: bold (800 weight), uppercase, 0.05em letter-spacing
- Spacing: generous scale up to 5rem (--spacing-3xl)

---

## WHAT NEEDS TO BE DONE NEXT

### PRIORITY 1: Apply design system to components
The CSS variables are defined but components still use old hardcoded values (#aaa, #222, etc.).

**Files to update:**
- `src/lib/components/ProductCard.svelte` — card border/hover should use `--color-border`, `--color-cyan`
- `src/lib/components/Header.svelte` — nav links should use `--color-text-muted`, active = `--color-cyan`
- `src/lib/components/Footer.svelte` — same treatment
- `src/routes/+page.svelte` — hero CTA button should use `--color-cyan`/`--color-magenta`, not #fff/#000
- All page files — replace hardcoded color values with CSS variables

**Design intent:**
- Background: `--color-dark` (#0a0a0a)
- Cards: `--color-surface` (#1a1a1a) background, `--color-border` (#2a2a2a) border, left accent 3px `--color-rust`
- Buttons: `--color-cyan` bg, `--color-magenta` hover + glow (`text-shadow: 0 0 8px rgba(255,0,110,0.5)`)
- Links in nav: `--color-text-muted` default, `--color-cyan` active/hover
- Product price: `--color-cyan`
- Headers: ALL CAPS, 800 weight, `--color-text`
- No shadows, no heavy rounded corners (6px max)
- CSS geometric patterns only (dots/grid via `background` gradients) — no image textures

### PRIORITY 2: Write authentic content
All pages have placeholder copy. Luka needs to provide, but Claude Code can write a draft.

- **About page** — Studio42 philosophy, 6-step process, Luka/Zorkow/Zarja team
- **Community page** — FAQ content, contact info
- **Blog page** — First post about LIGHTING-V1 design process
- **Product detail (lighting-v1)** — Specs: €50, matte black steel + natural wood, handmade in Ljubljana, limited run

### PRIORITY 3: SEO metadata
- Each page needs `<svelte:head>` with title, description, OpenGraph
- Layout already has svelte-seo installed, just needs per-page values
- Priority pages: Home, Products, LIGHTING-V1 detail page

### PRIORITY 4: Real product images
- Current images are stock placeholders
- Luka will provide real LIGHTING-V1 photos
- Drop into `/static/images/products/` and update filenames in `src/lib/stores.js`

### PRIORITY 5: Custom domain
- `studio42.si` purchased at Domenca registrar (Slovenian)
- DNS NOT configured — currently points to dns-parking.com
- Fix: Login to Domenca → update nameservers to Vercel OR add CNAME `studio42.si → cname.vercel-dns.com`
- Not urgent — Vercel URL works fine for now

---

## WHAT WAS ABANDONED (DO NOT REVIVE)

### Netlify ❌
- Attempted deployment, persistent build failures (exit code 2)
- `netlify.toml` exists in repo — can delete it
- Vercel is the deployment platform, not Netlify

### ChatwootWidget.svelte ❌
- File exists at `src/lib/components/ChatwootWidget.svelte`
- Was a test for Chatwoot (required work email, rejected)
- Not used anywhere, safe to delete

### Test/automation scripts ❌ (junk, safe to delete)
- `autotest.js`
- `autotest.mjs`
- `quick-test.mjs`
- `test-live.mjs`
- `test-playwright.mjs`
- `test-playwright-system.mjs`
- `test-site.js`
- `test-vercel.mjs`
- `dev-watcher.mjs`
- `dev-server.log`
- `/test-logs/` folder
- `/test-screenshots/` folder
- `screenshot-latest.png`
- `vercel-screenshot.png`

### ella-chat.html / ella-backend.js ❌
- Experimental standalone voice chat app
- Calls OpenAI GPT-4o directly (not integrated with this site)
- Has OpenAI API key hardcoded (**security issue**)
- Lives in `/home/s42/.openclaw/workspace/` not in this project
- Not part of the website — ignore

### MDsveX ❌ (installed but not configured)
- `mdsvex` is in `package.json` dependencies
- Was intended for blog markdown posts, never set up
- Blog page currently uses static hardcoded posts
- Either set it up properly or remove from dependencies

### AOS (Animate on Scroll) ⚠️ (installed, barely used)
- `aos` in dependencies
- Only initialized on home page (`AOS.init()`)
- No `data-aos` attributes on any elements
- Either use it properly or remove it

### Rune Scroller ❌ (removed, don't bring back)
- Had SSR compatibility issues
- Replaced with native Svelte `fade`/`scale` transitions
- Not in package.json anymore

---

## FILE CLEANUP LIST

**Safe to delete from repo:**
```
netlify.toml
autotest.js
autotest.mjs
quick-test.mjs
test-live.mjs
test-playwright.mjs
test-playwright-system.mjs
test-site.js
test-vercel.mjs
dev-watcher.mjs
dev-server.log
screenshot-latest.png
vercel-screenshot.png
/test-logs/
/test-screenshots/
/assets/ (empty folder)
/public/ (empty folder, static/ is the correct one)
src/lib/components/ChatwootWidget.svelte
CHATWOOT_SETUP.md
BUILD_SUMMARY.md
GITHUB_INTEGRATIONS.md
```

**Keep:**
```
src/ (all routes, components, styles)
static/ (favicon, images)
package.json
svelte.config.js
vite.config.js
.gitignore
README.md (update it)
STRUCTURE.md (update or replace with this file)
TAWK_SETUP.md (reference for chat admin)
vercel.json (may be needed)
```

---

## CREDENTIALS (WHERE TO GET THEM — NO VALUES HERE)

| Service | What | Type | Where to get |
|---------|------|------|-------------|
| GitHub | Push access | SSH key | Machine's `~/.ssh/id_rsa.pub` → GitHub Settings → SSH keys |
| Vercel | Deploy API | API token | vercel.com → Settings → Tokens |
| OpenAI | GPT-4o | API key | platform.openai.com → API keys |
| Tawk.to | Chat admin | Email login | tawk.to → s42contact@gmail.com |
| Domenca | DNS | Registrar login | domenca.si (Luka has credentials) |

**Ask Luka for:** GitHub SSH confirmation, Vercel token (if needed beyond git push), Domenca access

---

## TECH STACK (QUICK REFERENCE)

```
SvelteKit 5 (Svelte 5 runes mode)
Vite 8.0.8
@sveltejs/adapter-auto (Vercel-compatible)
svelte-seo (SEO meta tags, layout)
aos (scroll animations, barely configured)
mdsvex (blog markdown, not configured)
Tawk.to (live chat, widget embed)
```

**Local dev:**
```bash
cd /mnt/c/Users/User/Documents/studio42
npm run dev -- --host    # starts localhost:5173
```

**Deploy:**
```bash
git add . && git commit -m "message" && git push origin main
# Vercel auto-builds in ~1-2 min → live at studio42-website.vercel.app
```

---

## BRAND VOICE

Dark. Minimal. Material-focused. Artisanal meets digital. Quiet precision. No fluff.

**Copy tone:** Short sentences. Declarative. Celebrate material imperfections. Not cold — warm but not soft.

**Example:**
- ✅ "Made by hand. Imperfect on purpose."
- ✅ "Material matters. Nothing else does."
- ❌ "We are passionate about creating beautiful handcrafted pieces that inspire joy."

---

## PRODUCT CONTEXT (LIGHTING-V1)

- **Price:** €50 (€19.70 cost, €30.30 margin)
- **Materials:** Matte black steel, natural wood, brushed aluminum
- **Made:** By hand in Ljubljana
- **Edition:** Limited run (number TBD)
- **Status:** Prototype phase → photos due May 5 → launch May 15
- **Team:** Luka (design/build), Zorkow (graphics), Zarja (PM/content)

---

## FIRST ACTIONS FOR CLAUDE CODE

1. **Clean the repo** — delete junk files listed above, commit "chore: cleanup"
2. **Verify site** — `npm run dev` → open localhost:5173 → confirm it looks right
3. **Apply design variables** — update ProductCard, Header, home page to use CSS variables
4. **Ask Luka** for: authentic copy drafts, real product images, confirmation on domain
5. **Push clean state** — `git push origin main` → verify Vercel auto-deploys

---

**Everything else is in the code. Read it directly. Don't overcomplicate.**
