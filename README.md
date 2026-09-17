# Agila Studios

Agila Studios is our marketing website for a Minecraft content studio,
covering builds, 3D modeling, development, video editing, scripting, and
animation work. It's a Next.js 16 (App Router, TypeScript) project, and
we've structured it so the three of us can work on separate pages in
parallel with minimal merge conflicts.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Forms | Resend + Zod (contact form → server action → email to studio inbox) |
| Hosting | Vercel |
| Package manager | pnpm |

## Running locally

```bash
pnpm install
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Our 3-way page split

We've split the site into three independently owned pages so each of us
can work without stepping on the others:

| Page | File | Owner |
| --- | --- | --- |
| Landing | `src/app/page.tsx` | Person A |
| About | `src/app/(site)/about/page.tsx` | Person B |
| Portfolio | `src/app/(site)/portfolio/page.tsx` | Person C |

Whoever owns a page builds its section components under
`src/components/sections/<page>/` (e.g. `src/components/sections/landing/Hero.tsx`)
and composes them into their `page.tsx`.

`(site)` is a route group, not a URL segment — `/about` and `/portfolio`
are unaffected. About and Portfolio sit in that group because their shared
layout (`src/app/(site)/layout.tsx`) renders the Navbar/Footer; the landing
page is intentionally outside the group and renders blank for now (no
Navbar/Footer) while it's being built from scratch. Once it's ready to
include the same chrome, it can move into `(site)` too — just give the
other two a heads-up first, since that touches shared layout files.

## Branch naming convention

- `feature/landing-page`
- `feature/about-page`
- `feature/portfolio-page`

## Shared files — heads-up before editing

These files are shared across all three pages, so if you're touching one,
give the other two a heads-up first since it affects everyone's page:

- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/lib/types.ts`
- `src/lib/constants.ts`

## Shared UI primitives

`src/components/ui/` is where we keep shared primitives (Button, Badge,
Card, etc.) that any of us might reuse. If you add something here,
mention it in your PR description so the other two know it exists.
