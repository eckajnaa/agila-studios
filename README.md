# Agila Studios

Agila Studios is the marketing website for a Minecraft content studio,
covering builds, 3D modeling, development, video editing, scripting, and
animation work. This repo is a Next.js 16 (App Router, TypeScript)
project built to support three developers working on separate pages in
parallel with minimal merge conflicts.

## Running locally

```bash
pnpm install
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## The 3-way page split

The site is split into three independently owned pages so each developer
can work without stepping on the others:

| Page | File | Owner |
| --- | --- | --- |
| Landing | `src/app/page.tsx` | Person A |
| About | `src/app/(site)/about/page.tsx` | Person B |
| Portfolio | `src/app/(site)/portfolio/page.tsx` | Person C |

Each owner builds their page's section components under
`src/components/sections/<page>/` (e.g. `src/components/sections/landing/Hero.tsx`)
and composes them into their `page.tsx`.

`(site)` is a route group, not a URL segment — `/about` and `/portfolio`
are unaffected. About and Portfolio sit in that group because their shared
layout (`src/app/(site)/layout.tsx`) renders the Navbar/Footer; the landing
page is intentionally outside the group and renders blank for now (no
Navbar/Footer) while Person A builds it from scratch. Once landing is
ready to include the same chrome, it can move into `(site)` too — flag
that move to the other two first since it changes shared layout files.

## Branch naming convention

- `feature/landing-page`
- `feature/about-page`
- `feature/portfolio-page`

## Shared files — coordinate before editing

These files are shared across all three pages. Changes here affect
everyone, so give the other two developers a heads-up before editing:

- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/lib/types.ts`
- `src/lib/constants.ts`

## Shared UI primitives

`src/components/ui/` holds shared primitives (Button, Badge, Card, etc.)
that any of the three pages might reuse. If you add something here,
mention it in your PR description so the other two know it exists.
