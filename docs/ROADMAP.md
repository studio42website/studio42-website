# ROADMAP

Living task list. 26 days to LIGHTING-V1 launch on **May 15, 2026**.

Check boxes when done. Add items as they come up. Archive completed sections at the bottom when they bloat the top.

---

## This week (Apr 19 – Apr 26)

### Cleanup — DONE ✅
- [x] Archive obsolete docs (`BUILD_SUMMARY`, `CHATWOOT_SETUP`, `GITHUB_INTEGRATIONS`) to `docs/archive/`
- [x] Delete test automation junk (`autotest.*`, `test-*.mjs`, `dev-watcher.mjs`, `quick-test.mjs`, screenshots, `test-logs/`, `test-screenshots/`)
- [x] Delete abandoned configs (`netlify.toml`, empty `assets/`, empty `public/`)
- [x] Delete `ChatwootWidget.svelte`
- [x] Restructure canonical docs into `/docs`
- [x] Move Pinterest reference into `docs/reference/`
- [x] Write `CLAUDE.md`, `docs/ROADMAP.md`, `docs/DESIGN.md`, `docs/VOICE.md`, `docs/FIGMA.md`, `docs/SERVICES.md`

### Security — URGENT 🔒
- [ ] **Move `.ssh/` out of the project folder.** Private SSH keys (`id_rsa`, `id_rsa.pub`) are sitting inside `studio42/`. Move to `~/.ssh/` (user home). Check `.gitignore` to ensure `.ssh/` is ignored (it is). Verify keys were never committed: `git log --all --full-history -- .ssh/`.
- [ ] Audit any other potentially-committed secrets (grep for `sk-`, `API_KEY`, `TOKEN`).

### Priority 1 — Apply design system
Components still use hardcoded colors (`#222`, `#aaa`, `#1a1a1a`, `#fff`). Replace with CSS variables from `global.css`. See `docs/DESIGN.md` for the mapping.

- [ ] `src/lib/components/ProductCard.svelte` — card border → `--color-border`, hover → `--color-cyan`, price → `--color-cyan`, add 3px left rust accent
- [ ] `src/lib/components/Header.svelte` — nav links → `--color-text-muted` default, `--color-cyan` active
- [ ] `src/lib/components/Footer.svelte` — same treatment as header
- [ ] `src/routes/+page.svelte` — hero CTA button → cyan bg, magenta hover + glow (replace current `#fff`/`#000`)
- [ ] `src/routes/products/+page.svelte` — product grid spacing via `--spacing-*`
- [ ] `src/routes/products/[slug]/+page.svelte` — detail page colors and type
- [ ] `src/routes/about/+page.svelte` — type scale, spacing
- [ ] `src/routes/blog/+page.svelte` — same
- [ ] `src/routes/community/+page.svelte` — same

### Dev cleanup
- [ ] Remove `puppeteer` and `playwright` from `package.json` devDependencies (unused, ~200MB on disk)
- [ ] Decide on `aos`: use it with `data-aos` attributes on sections, or remove
- [ ] Decide on `mdsvex`: configure properly for blog, or remove

---

## Next week (Apr 27 – May 3)

### Priority 2 — Authentic content

All pages currently have placeholder copy. Draft with real voice (`docs/VOICE.md`), Luka reviews.

- [ ] About page — Studio42 philosophy, 6-step process, team (Luka, Zorkow, Zarja)
- [ ] Community page — FAQ, contact info, chat hours
- [ ] Blog — first post on LIGHTING-V1 design process
- [ ] Product detail (LIGHTING-V1) — €50, materials, origin, edition, specs
- [ ] Product stubs (pen-holder, candle-stand) — decide: ship now as "coming soon" or hide

### Priority 3 — SEO metadata

`svelte-seo` is installed. Needs per-page values.

- [ ] Home — title, description, OG image
- [ ] Products — title, description, OG
- [ ] LIGHTING-V1 detail — full product schema
- [ ] About — title, description
- [ ] Generate a proper OG image (1200×630, dark bg, LIGHTING-V1 wordmark)
- [ ] Favicon audit — current is Svelte default

### Figma + Claude setup

See `docs/FIGMA.md` for full plan. This week's slice:

- [ ] Luka creates Figma file: `Studio42 — Website`
- [ ] Set up two pages: `Design System` (tokens + components), `Pages` (per-route frames)
- [ ] Agree on naming conventions (Figma component name = Svelte component name)
- [ ] Install Figma Desktop + Dev Mode access
- [ ] Test the Figma Dev Mode MCP connector with Claude
- [ ] Export current `global.css` tokens into a Figma style library

---

## Week 3 (May 4 – May 10)

### Priority 4 — Real product images
- [ ] Luka delivers LIGHTING-V1 photos (due May 5)
- [ ] Replace `/static/images/products/lighting-v1.jpg` with real shots
- [ ] Optimize: export at 1600px wide, ~200KB, webp + jpg fallback
- [ ] Consider: lazy-loading via native `loading="lazy"` (no library needed)

### Polish
- [ ] Check every page on mobile (real device, not just devtools)
- [ ] Lighthouse audit — target 90+ on performance, accessibility, SEO
- [ ] Fix any contrast issues (cyan on dark should pass AA for body text if used that way)
- [ ] 404 page — custom, on-brand

---

## Week 4 (May 11 – May 15)

### Priority 5 — Custom domain
- [ ] Log in to Domenca
- [ ] Option A: update nameservers to Vercel DNS
- [ ] Option B: add CNAME `studio42.si → cname.vercel-dns.com`
- [ ] Add domain in Vercel dashboard, let it issue SSL
- [ ] Verify www + apex both resolve

### Launch
- [ ] Content freeze May 13
- [ ] Final QA — every link, every image, every CTA
- [ ] Analytics check — is Plausible in yet? (decision needed)
- [ ] Announce on socials (Luka drafts, Zorkow visual)
- [ ] Monitor Tawk.to for first visitor messages

---

## Unscheduled / backlog

- [ ] Newsletter signup (Buttondown? ConvertKit? — decide)
- [ ] Wishlist/favorites (Phase 2, not for launch)
- [ ] Product filters/search (Phase 2)
- [ ] User accounts (Phase 2, only if Stripe checkout ships)
- [ ] Stripe checkout (Phase 2, target June)
- [ ] Internationalization SL/EN (Phase 2)
- [ ] PWA + offline mode (Phase 3, only if warranted)
- [ ] Image CDN (ImageKit) if bandwidth becomes an issue

---

## Notes

**Deadline is hard.** May 15. Everything below "Priority 5" can slip. Priorities 1-5 cannot.

**If a task isn't here, it isn't happening.** Add it or don't do it.
