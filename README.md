# milosnovakovic.com — portfolio + CMS

Personal site of **Miloš Novaković** — AI-powered web design & marketing.
Dark, playful, mysterious. Built with Next.js 16, Tailwind CSS 4, Motion
(framer-motion) and a Cal.com booking embed. Deployed on **Netlify**.

All site content is editable from a self-hosted CMS at **hq.milosnovakovic.com**,
backed by **Netlify Blobs** — no external service, no database.

## Run locally

```bash
npm install
npm run dev
```

- Public site: http://localhost:3000 — you'll hit the **vault** (pre-launch
  login wall). Sign in with the `VAULT_*` credentials.
- CMS: http://hq.localhost:3000 — sign in with the `HQ_*` credentials. `*.localhost`
  resolves to your machine automatically in modern browsers.

Copy `.env.example` to `.env.local` and fill the values. Under a plain `next dev`
the CMS stores content on the **filesystem** (`.cms-data/`, git-ignored), so
everything works with zero setup. In production (and under `netlify dev`) it uses
Netlify Blobs automatically.

### Environment variables

```
# Public vault wall
VAULT_USER / VAULT_PASS / VAULT_SECRET

# CMS admin session (independent of the vault)
HQ_USER            # admin username
HQ_SECRET          # long random string signing the admin cookie
HQ_PASS_HASH       # scrypt hash of the admin password

NEXT_PUBLIC_SITE_URL=https://milosnovakovic.com   # metadataBase / "View site"
# ADMIN_HOST=hq.milosnovakovic.com                # optional; defaults to any hq.*
```

Generate a secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
Hash a password: `node scripts/hash-password.mjs "your-strong-password"`

## How the CMS works

- **One host, two surfaces.** `src/proxy.ts` routes by `Host`: `hq.*` serves the
  admin app (clean subdomain paths rewritten onto the internal `/hq/*` segment,
  gated by a signed admin cookie); every other host is the public site behind the
  vault. The admin app is never reachable from the public host (404).
- **Storage.** `src/lib/cms/` is a small storage adapter over Netlify Blobs: the
  whole site is one JSON document (`cms` store, key `content`), with a timestamped
  backup on every save; uploaded images live in the `cms-media` store, content-
  hashed and served from `/media/[key]`.
- **Editing → live.** Saving a section runs a Server Action that writes the doc
  and calls `revalidatePath('/')`; Netlify purges the public page across its
  network within seconds. The public site is statically rendered and reads the
  store (falling back to built-in defaults in `src/lib/cms/defaults.ts` if the
  store is empty — so it never breaks).
- **Auth.** Reuses the site's HMAC-cookie scheme (`src/lib/auth.ts`) with a
  separate cookie/secret; the password is verified server-side against a scrypt
  hash, with per-IP rate limiting and a same-origin check.
- **First run.** On an empty store the dashboard shows a "Publish defaults"
  button (POSTs `/hq/api/seed`) to write the initial content. Optional — the
  first edit seeds it anyway.

## Deploying to Netlify

1. Push the repo and import it in Netlify (the `@netlify/plugin-nextjs` runtime is
   auto-detected; keep it current — v5+ is required for on-demand revalidation and
   Cache Components).
2. **Domain:** add `hq.milosnovakovic.com` as a **domain alias on the same site**
   (Site config → Domain management). Add a DNS `CNAME` record `hq → <site>.netlify.app`.
   One deploy serves both the apex and the subdomain.
3. **Env vars:** set every `VAULT_*` and `HQ_*` variable plus `NEXT_PUBLIC_SITE_URL`
   in the Netlify dashboard. In production the cookies are also marked `Secure`.
4. **Blobs:** no config needed — the Blobs context is injected automatically at
   runtime; the CMS uses it as soon as it's deployed.

## Going public at launch 🚀

1. In the CMS **Settings**, turn on **Launched** (drops the `noindex` robots tag).
2. Remove the vault wall: delete `src/app/vault/`, `src/app/api/login/`,
   `src/app/api/logout/`, `src/components/vault-door.tsx`, and the public `vaultGate`
   half of `src/proxy.ts` (keep the `isAdminHost` admin routing). Remove the
   "Lock up behind you" link from `src/components/sections/contact.tsx`.
3. Replace `src/app/robots.ts` with a permissive one (or delete it).
4. Set a real OG image, then redeploy.

## Where things live

```
src/app/                routes, layout, global styles (design tokens in globals.css)
src/app/hq/             the CMS admin app (login, dashboard, section editors)
src/app/media/[key]/    serves uploaded images from Netlify Blobs
src/components/sections/ hero, work, services, about, process, contact, nav (prop-driven)
src/components/cms/      MediaImage + inline emphasis helpers
src/lib/cms/            content model, defaults, storage adapter, admin auth
src/images/             statically imported default art
scripts/hash-password.mjs  generate HQ_PASS_HASH
```

## Notes

- `next build` prints a benign Turbopack tracing warning for the dev-only
  filesystem backend (`src/lib/cms/store-fs.ts`) — it uses dynamic `fs` paths that
  the tracer flags. It never runs in production (Netlify uses Blobs) and the build
  succeeds.
- Image uploads are downscaled and re-encoded to WebP in the browser before upload
  to stay under the ~4.5 MB function request limit.
