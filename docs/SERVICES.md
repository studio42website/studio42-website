# SERVICES

External services Studio42 relies on. Who they are, what they do, where credentials live, how to admin them.

**Credential rule:** No secret values in this file. Only where to find them.

---

## Vercel — hosting

**Role:** Hosts the production site. Builds on every push to `main`, serves via their CDN.

**URL:** https://studio42-website.vercel.app
**Dashboard:** https://vercel.com/dashboard
**Login:** GitHub OAuth

### Setup (already done)
- Repo `studio42website/studio42-website` linked to a Vercel project
- Build command: `npm run build`
- Output directory: `.svelte-kit/output` (handled by `@sveltejs/adapter-auto`)
- Framework preset: SvelteKit

### Day-to-day
- `git push origin main` → auto-deploys in ~1-2 minutes
- Preview deploys on PR branches
- Logs: Vercel dashboard → project → Deployments → click a deploy

### When to log in manually
- Adding custom domain (`studio42.si`)
- Checking build failures
- Rotating env variables
- Managing team members

### Credentials
- Vercel account: Luka's GitHub OAuth
- API token (if needed for CLI): `vercel.com → Settings → Tokens`

---

## GitHub — source control

**Repo:** https://github.com/studio42website/studio42-website
**Account:** `studio42website`
**Access:** Luka's SSH key on the dev machine

### Setup
- SSH key in `~/.ssh/id_rsa` (user home, **not** in project folder — see roadmap security note)
- Public key registered at GitHub: Settings → SSH and GPG keys

### Day-to-day
- `git push origin main` deploys
- Branch naming: `feat/`, `fix/`, `content/`, `chore/`
- PRs auto-generate Vercel preview deploys

---

## Tawk.to — live chat

**Role:** Chat widget on `/community` page. Free tier, unlimited.

**URL:** https://tawk.to
**Admin login:** s42contact@gmail.com
**Widget ID:** `69e34e81a7ff261c327a9efc`
**Embed:** `src/lib/components/ChatWidget.svelte`

### Setup
1. Account was created at s42contact@gmail.com
2. A "Studio42" property was created in Tawk.to
3. Widget ID pasted into `ChatWidget.svelte`
4. Widget renders on the Community page

### Embed snippet (reference)
```javascript
// in ChatWidget.svelte
s1.src = 'https://embed.tawk.to/69e34e81a7ff261c327a9efc/1234567890';
```

### Customizing
In the Tawk.to dashboard:
- **Appearance** → colors, position (we use bottom-right)
- **Greetings** → auto-message for new visitors
- **Hours** → when we're online
- **Agents** → add Zarja if she's handling chat

### Receiving messages
- Dashboard at tawk.to
- Email notifications to s42contact@gmail.com
- Mobile app available (Tawk)

---

## Domenca — domain registrar

**Role:** Holds the `studio42.si` domain registration.

**URL:** https://domenca.si
**Status:** Domain purchased, DNS **not configured** (currently points to `dns-parking.com`)

### DNS cutover plan (see roadmap week 4)
**Option A — use Vercel nameservers:**
1. Log into Domenca
2. Change nameservers to Vercel's (Vercel shows you the exact NS values)
3. Wait for propagation (~few hours)

**Option B — keep Domenca DNS, add CNAME:**
1. In Domenca, add DNS record: `CNAME studio42.si → cname.vercel-dns.com`
2. In Vercel, add the domain in project settings
3. Vercel issues SSL automatically

### Credentials
- Domenca login: Luka has them
- Not stored anywhere else — if lost, use Domenca's recovery flow

---

## OpenAI — (optional, not currently integrated)

**Role:** Was used in a separate voice chat experiment (`ella-chat.html`) that is **not part of this project**. Listed here only so it's clear it's out of scope.

If we ever integrate GPT-4o into Studio42 (e.g., for a product Q&A bot):
- Get an API key at https://platform.openai.com
- Store in Vercel env vars, not in code
- Use server-side only (SvelteKit endpoint), never expose to browser

---

## Credential map

Where to find what. No values here — only the location.

| What | Where | Who has access |
|---|---|---|
| GitHub SSH key | `~/.ssh/id_rsa` on Luka's dev machine | Luka |
| Vercel access | vercel.com via GitHub OAuth | Luka |
| Vercel API token (if needed) | vercel.com → Settings → Tokens | Luka |
| Tawk.to admin | tawk.to, login s42contact@gmail.com | Luka, Zarja (can add) |
| Domenca registrar | domenca.si | Luka |
| `s42contact@gmail.com` | Gmail | Luka |

---

## Emergency runbook

**Site is down:**
1. Check Vercel dashboard → Deployments → is the latest one failed?
2. If yes: check the build log, find the error, fix locally, push again
3. If Vercel itself is down: check https://www.vercel-status.com
4. Worst case: revert to last working deploy in Vercel UI

**Chat widget broken:**
1. Check `src/lib/components/ChatWidget.svelte` for Widget ID typos
2. Check Tawk.to dashboard: is the property active?
3. Browser console on /community for script errors

**Custom domain broken (post-launch):**
1. Check DNS propagation: `dig studio42.si` or dnschecker.org
2. Vercel dashboard → Domains → any config errors?
3. If SSL cert issue, remove and re-add domain in Vercel to reissue

**Lost access to something:**
- GitHub: Luka's recovery email + 2FA
- Vercel: OAuth via GitHub (so same recovery)
- Tawk.to: password reset to s42contact@gmail.com
- Domenca: their support flow

---

## When to update this file

- New service added
- Credential location changes
- Setup steps drift from reality
- Admin handover to another team member
