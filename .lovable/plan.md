# Birthday Wish Page for Raha

A mobile-first, animation-rich romantic birthday page.

## Design direction
- Dreamy romantic palette: deep night sky (`oklch` deep indigo/plum) with rose-gold and soft pink accents, subtle glow gradients.
- Display font: elegant serif (Playfair Display) for "Happy Birthday Raha"; body in Inter.
- Layered depth: gradient background, floating hearts, twinkling stars, soft bokeh glow.

## Sections (single page, scroll-based)
1. **Hero** — Animated "Happy Birthday, Raha 💖" with letter-by-letter reveal, floating hearts rising from bottom, twinkling stars, pulsing glow behind name.
2. **Wish card** — Handwritten-style love note that fades/slides in, with a typewriter effect for a short heartfelt message.
3. **Cake moment** — Animated cake (CSS/SVG) with flickering candles; tap candles to "blow out" (toggle flame off) — small interactive delight.
4. **Memory hearts** — Row of pulsing heart cards with short sweet phrases ("You're my favorite", "Forever yours"…), each animates in on scroll.
5. **Confetti finale + signature** — Confetti burst on load and on tap of a "Make a wish" button; signed *"Created by Coder on Fall in Love"* with a subtle shimmer.

## Animations (framer-motion + CSS keyframes)
- Letter stagger reveal, floating hearts (infinite y-translate + fade), twinkling stars (opacity pulse), candle flame flicker, confetti burst, scroll-triggered fade-up, gradient background slow shift, button hover-scale + glow.

## Mobile-first
- Single column, large tap targets, fluid typography (`clamp()`), `100dvh` hero, reduced particle count on small screens for performance, `prefers-reduced-motion` respected.

## Technical notes
- New route: `src/routes/index.tsx` replaces placeholder (this IS the homepage).
- Components in `src/components/birthday/`: `Hero.tsx`, `WishCard.tsx`, `Cake.tsx`, `MemoryHearts.tsx`, `Confetti.tsx`, `FloatingHearts.tsx`, `Stars.tsx`.
- Add `framer-motion` via bun.
- Extend `src/styles.css` with romantic tokens: `--rose`, `--rose-glow`, `--night`, `--gold`, `--gradient-romance`, `--shadow-glow`, plus keyframes for float, twinkle, flicker, shimmer.
- SEO head: title "Happy Birthday Raha 💖", matching description, og tags.
