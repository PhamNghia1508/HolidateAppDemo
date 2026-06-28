---
title: Apply the warm palette to all Tailwind utility classes across the app
---
# Sweep Tailwind utility classes to match Warm Ink palette

  ## What & Why
  The custom CSS variables and inline styles have been updated to the Warm Ink system, but Tailwind utility classes like `bg-white`, `text-slate-500`, `border-gray-200`, `text-gray-400` are still used in several components and override the palette in subtle places (e.g. shadcn UI components, wrapper divs).

  ## Done looks like
  - `tailwind.config.ts` extended with warm-ink color aliases (bg-surface, text-t1, text-t2, etc.)
  - Instances of `bg-white`, `bg-slate-50`, `text-slate-`, `text-gray-`, `border-gray-` in pages replaced with warm equivalents
  - No visible cold-white or cold-grey patches remain on any of the 10 screens

  ## Relevant files
  - `tailwind.config.ts`
  - `client/src/index.css`
  - All 10 page files in `client/src/pages/`