# UI/UX Refresh — Editorial Bento Portfolio

A complete visual overhaul of the single-page portfolio while preserving all current content and functionality.

## Design tokens (locked)

- **Palette (Forest & Moss):** `#1a3c2a` deep forest, `#2d5a3d` moss, `#5a8a5c` sage, `#a0c49d` mist, plus warm paper `#f7f5f0` background and ink `#141a16` text.
- **Type:** Instrument Serif for display/headings (large, generous tracking-tight), Work Sans for body, UI, captions.
- **Radius:** softer, asymmetric — `0.5rem` on small UI, `1.25rem` on bento cards.
- **Shadow:** ultra-soft, layered: `0 1px 2px rgba(20,26,22,.04), 0 12px 32px -16px rgba(26,60,42,.15)`.
- **Motion:** subtle — fade/translate on scroll, hover lifts of 2-4px, no flashy particles in the new look.

## Layout — Bento Grid Editorial

Replace the current stacked sections with a **bento grid** rhythm on desktop, single column on mobile. Section order stays the same (About → Education → Affiliations → Publications → Projects → Awards → Media → Contact), but visual treatment changes.

```text
HERO (full-bleed split)
├─ Left 60%: Name (huge serif), tagline, role, badges, CTAs
└─ Right 40%: portrait frame + quick-stat cards (years, pubs, awards)

ABOUT + EDUCATION (bento row)
├─ Wide card: About narrative
└─ 3 stacked degree chips

AFFILIATIONS (2-up large cards with org marks)

PUBLICATIONS (asymmetric bento)
├─ Featured pub (large)
└─ 6 compact pub cards in 2-col grid; year as oversized numeral

PROJECTS (bento, mixed sizes)
├─ 1 big "impact" card with oversized stat
└─ 3 medium cards

AWARDS · MEDIA (side-by-side bento)

CONTACT (full-bleed dark forest card with profile links)
```

## Component changes

- **Nav:** slimmer, glass effect kept but with forest tint; active-section pill in sage; add a subtle scroll-progress hairline (already in `ScrollProgress`, restyle).
- **Hero:** drop the gradient-ring avatar styling; use a sharp rounded-rectangle portrait frame with a thin moss border and a small "AVAILABLE FOR COLLABORATION" status chip.
- **Badges:** outline style in moss, monospace removed in favor of Work Sans small-caps.
- **Publication cards:** year as a giant serif numeral on the left, title in serif, journal in italic, open-access badge as a tiny sage dot + label.
- **Project cards:** oversized stat in Instrument Serif, label below in Work Sans uppercase tracking-wide.
- **Awards:** ribbon-less; just year + name + org in a clean 3-column bento row.
- **Contact:** dark forest section with sage hairline dividers and large serif "Get in touch" header.
- **Footer:** minimal — keywords as small-caps row, year, single hairline.

## Files to touch

- `src/index.css` — replace color tokens with Forest & Moss HSL values, retune radii/shadows, drop unused gradient utilities, add `.bento`, `.serif-display`, `.eyebrow` utilities.
- `tailwind.config.ts` — register `Instrument Serif` and `Work Sans` font families.
- `src/main.tsx` — import `@fontsource/instrument-serif` and `@fontsource/work-sans`.
- `src/pages/Index.tsx` — restructure sections into bento grids; update class names; remove `ParticleBackground` from hero (too busy for editorial direction) and lean on `ScrollProgress` + Framer Motion only.
- `src/components/ScrollProgress.tsx` — restyle hairline color.
- Keep `BackToTop`, `CountUp`, `TypeWriter`, `DarkModeToggle`, `NavLink` — minor style passes only.
- `src/data/portfolio.ts` — no content changes.

## Out of scope

- No new sections, no copy rewrites, no backend, no dark-mode redesign (existing dark variant retuned only to match new palette).
- No new dependencies beyond the two @fontsource packages.

## Technical notes

- Install fonts via `bun add @fontsource/instrument-serif @fontsource/work-sans`, import in `main.tsx`, register in `tailwind.config.ts` under `fontFamily.serif` and `fontFamily.sans`.
- All colors via HSL tokens in `index.css` — no hardcoded hex in components.
- Verify with a Playwright screenshot at desktop (1280) and mobile (390) after build.
