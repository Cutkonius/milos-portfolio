# milosnovakovic.com — portfolio

Personal site of **Miloš Novaković** — AI-powered web design & marketing.
Dark, playful, mysterious. Built with Next.js 16, Tailwind CSS 4, Motion
(framer-motion) and a Cal.com booking embed.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll hit the **vault** (pre-launch login wall).
Credentials live in `.env.local` (not committed):

```
VAULT_USER=...      # login username
VAULT_PASS=...      # login password
VAULT_SECRET=...    # long random string used to sign the session cookie
```

Copy `.env.example` to `.env.local` and fill the values if starting fresh.
Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## How the login wall works

- `src/proxy.ts` (Next 16 proxy / middleware) blocks **everything** except
  `/vault`, `/api/login`, build assets, favicon and robots.txt. It also sends
  `X-Robots-Tag: noindex` on every response while the site is private.
- `/api/login` checks credentials server-side (constant-time compare, per-IP
  rate limiting, same-origin check) and sets a signed, HTTP-only, `SameSite=Lax`
  cookie that expires after 7 days. Credentials never appear in client code.
- `robots.txt` disallows all crawling pre-launch.
- The profile photo is imported from `src/images/` (not `public/`) so it is
  served under a content-hashed URL and can't be guessed pre-launch.

## Deploying (e.g. Vercel)

1. Push the repo and import it in Vercel.
2. Set the three `VAULT_*` environment variables in the project settings.
3. Deploy. The wall is active immediately; only people with the credentials
   get in. In production the cookie is also marked `Secure`.

## Going public at launch 🚀

1. Delete `src/proxy.ts`, `src/app/vault/`, `src/app/api/login/`,
   `src/app/api/logout/` and `src/components/vault-door.tsx`.
2. Remove the "Lock the door" button from `src/components/sections/footer.tsx`.
3. Replace `src/app/robots.ts` with a permissive one (or delete it) and remove
   `robots: { index: false … }` from `src/app/layout.tsx`.
4. Set a real `metadataBase` / OG image, then redeploy.

## Where things live

```
src/app/            routes, layout, global styles (design tokens in globals.css)
src/components/     sections/ (hero, about, services, …) + ui/ primitives
src/lib/            auth, confetti, cal.com constants
src/images/         statically imported images
```
