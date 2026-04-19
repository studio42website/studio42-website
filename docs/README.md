# /docs

Everything Studio42 that isn't code. If you're starting fresh on this project, read in this order.

---

## Read order for a new session

1. **[HANDOFF.md](HANDOFF.md)** — current state, inherited context, priorities. The source of truth for "where are we now."
2. **[ROADMAP.md](ROADMAP.md)** — open tasks, deadlines, what's blocked.
3. **[DESIGN.md](DESIGN.md)** — visual system. Read before touching any CSS.
4. **[VOICE.md](VOICE.md)** — copy voice. Read before writing any user-facing text.
5. **[STRUCTURE.md](STRUCTURE.md)** — where things live in `src/`.
6. **[SERVICES.md](SERVICES.md)** — external services reference (Vercel, Tawk.to, Domenca, GitHub).
7. **[FIGMA.md](FIGMA.md)** — Figma + Claude workflow. Aspirational — not fully set up yet.

Also at the project root: **[/CLAUDE.md](../CLAUDE.md)** — AI assistant primer.

---

## What's what

| File | Purpose | Update when |
|---|---|---|
| `HANDOFF.md` | Snapshot of project state for next session | End of every significant working session |
| `ROADMAP.md` | Live TODO list | Any time a task is added, finished, or re-scoped |
| `STRUCTURE.md` | Folder/file map | New top-level folders or major moves |
| `DESIGN.md` | Visual rules | New color/type/spacing tokens, new component patterns |
| `VOICE.md` | Copy rules | New voice decisions, good/bad examples surface |
| `FIGMA.md` | Design workflow | Figma setup progresses, naming conventions evolve |
| `SERVICES.md` | External services | New service added, credential moved, DNS change |

---

## /docs/archive

Obsolete plans. Kept because they document decisions (especially what was tried and abandoned). Do not follow as active guidance.

- `BUILD_SUMMARY.md` — initial build plan, April 18
- `CHATWOOT_SETUP.md` — Chatwoot integration plan, abandoned for Tawk.to
- `GITHUB_INTEGRATIONS.md` — library shopping list, most items never installed

## /docs/reference

Mood boards, inspiration, research.

- `pinterest-board.pdf` — aesthetic reference

---

## Conventions for new docs

- **Keep it tight.** Brand voice applies to docs too. Declarative, specific.
- **Date anything time-sensitive.** Use ISO format: `2026-04-19`.
- **Link, don't duplicate.** If info belongs in another doc, link to it.
- **Archive, don't delete.** If a plan is abandoned, move to `archive/` with a one-line note at the top explaining why.
