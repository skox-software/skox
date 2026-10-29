<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SKOX house rules for every agent (Claude, Codex, anyone)

These come first. If a task seems to need breaking one, stop and ask Josh or Reiss.

## Deploying this site

- **Ship through GitHub only.** The `skox` Vercel project builds production from `skox-software/skox` `main`. Branch, open a PR, merge.
- **Never run `vercel deploy --prod` (or `vercel --prod`, `vercel promote`, `vercel rollback`) for this site.** A CLI deploy uploads whatever local folder you're in and replaces the GitHub build. On 2026-10-21 a CLI deploy from a checkout 5 commits behind `main` took down a preview a lead had just been emailed, for 16 hours.
- Before building on `main` locally, `git pull`. Never deploy, merge or force-push from a checkout that's behind `origin/main`.

## Preview concepts (`app/concepts/`)

- **Don't edit, move, rename or delete another concept's route or its `public/concepts/<name>/` folder.** Each one may be open on a prospect's phone right now. Shared building blocks live in `app/concepts/_shared/`. Change them only with defaults that leave existing concepts unchanged.
- **Every new preview a prospect sees goes on `https://previews.gounbusy.com/<short-slug>`.** Links already sent on `previews.skoxsoftware.com` keep working (same project); never break them. Never send them a vercel.app link (PR previews are behind Vercel's login), a Vercel share link, or a `www.skoxsoftware.com/concepts/...` URL.
- How a preview gets there:
  1. Build the route at `app/concepts/<business-slug>-<8 hex>/` (playbook: `docs/prospects/preview-playbook.md`; master prompt: `scripts/lead-scan/preview-prompt.md`).
  2. Merge its PR to `main`.
  3. In `skox-software/prospect-previews`, add one rewrite to `vercel.json`: `{ "source": "/<short-slug>", "destination": "https://www.skoxsoftware.com/concepts/<business-slug>-<8 hex>" }`. Keep the shared `/_next`, `/concepts`, `/api/contact` and `/portal/api/lead-previews/open` rewrites, the `/` redirect and the build's `rm -f public/index.html`. Those keep the concept list private.
  4. Check the short link loads logged out. Then save it as the deal's `preview_url` through the portal API (`PATCH /portal/api/lead-previews/<dealId>`).
- Render `<Beacon slug={SLUG} dealId={DEAL_ID} />` so the portal alerts the team when the lead opens it. Open previews yourself with `?team` so your views don't count.
