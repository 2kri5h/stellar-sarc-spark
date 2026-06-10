
## Goal

Produce one self-contained `sarc.html` (placed at `public/sarc.html` so it's served as a static file alongside the TanStack app) containing the entire redesigned SARC site. No build step — React 18, Three.js, Framer Motion, and Tailwind all loaded from CDN, JSX transpiled in-browser via Babel standalone.

Note: this is intentionally a standalone artifact, not wired into the TanStack route tree. Open at `/sarc.html`. If you'd rather have it become the actual home route of the app, say so and I'll refactor into the TanStack/Vite stack instead (Tailwind/Three/Framer as real deps).

## File

- `public/sarc.html` — single file, ~600–800 lines.

## CDN stack

- React 18 + ReactDOM (`unpkg`)
- Babel standalone (in-browser JSX)
- Tailwind Play CDN (`cdn.tailwindcss.com`) with a small dark-navy theme extension
- Three.js r160 (UMD build)
- Framer Motion UMD (`window.FramerMotion` → `motion`, `AnimatePresence`)
- Google Fonts: a display serif (Fraunces) + clean sans (Inter) for a "premium, timeless" feel

## Content (pulled verbatim from upload, no invention)

- **About paragraph**: "Student Alumni Relations Cell (SARC) was established in 2008 …"
- **8 portfolios** with the existing descriptions extracted from the HTML: HDA, Events, ASMP, Design, Marketing, Operations, Web, Media & PR
- **Events cards**: Alumination, Seekout, Yearbook, ASMP, ILP, PMP (one-line descriptions derived strictly from existing portfolio text where mentioned)
- **Footer tagline**: "© 2026 Made with 💙 by SARC"
- **Socials**: Facebook, Instagram, LinkedIn, YouTube (href="#" placeholders — original file's links are relative; using # as the brief allows for event/visit-site links)
- **Carousel**: reference the original 10 image filenames as `./SARC, IIT Bombay_files/<name>` paths so they resolve if dropped next to the original asset folder; with a graceful onerror fallback to a dark gradient tile

## Sections

1. **Fixed navbar** — `SARC | IIT Bombay` left; right side PORTFOLIOS (hover dropdown listing all 8, click scrolls to that portfolio section), EVENTS (anchor to `#events-section`), TEAM (anchor `#team`). Smooth scroll via `scroll-behavior: smooth`.
2. **Hero (Three.js solar system)** — full-viewport canvas behind content:
   - Center: glowing sphere + 3D text "SARC" (TextGeometry via FontLoader on a CDN helvetiker font) as the sun, with bloom-like additive halo sprite.
   - Inner ring (radius A): Web, Design, Media & PR, Marketing.
   - Outer ring (radius B): Operations, HDA, ASMP, Events.
   - Per-planet: sphere mesh + CSS2D label (via `CSS2DRenderer`) so labels stay crisp.
   - Slow continuous orbits at differing speeds; subtle starfield (Points) backdrop.
   - Raycaster hover → scale 1.0 → 1.25 + emissive boost; click → opens drawer for that portfolio.
   - Overlay (DOM, on top of canvas): About paragraph, and a cycling text ticker (Framer Motion AnimatePresence) rotating: "Alumination · Seekout · Yearbook".
3. **Portfolio detail drawer** — Framer Motion slide-in from right (`x: '100%' → 0`), ~480px wide, dark glass panel. Contains: portfolio name + mission paragraph (existing copy), 3 placeholder team cards (Name / Role), and 2–3 key event chips with "Visit Site →" (href="#"). Close button; solar system keeps animating behind it.
4. **Image carousel** — 10 slides, auto-advance every 5s with Framer Motion crossfade + small parallax; dot indicators + prev/next. Premium feel via rounded-2xl frame, soft glow, and generous padding.
5. **Events section** (`id="events-section"`) — 6 cards (Alumination, Seekout, Yearbook, ASMP, ILP, PMP), each with name, one-line description, status badge (Upcoming/Ongoing/Past), and "Visit Site →" (href="#"). 3-col desktop, 1-col mobile. Hover: lift + soft glow.
6. **Portfolio sections** — 8 alternating left/right blocks with the existing descriptions. Scroll-in fade/translate via Framer Motion `whileInView`.
7. **Footer** — socials (FB/IG/LI/YT icons via inline SVG), quick links (all 8 portfolios + events), and the "© 2026 Made with 💙 by SARC" line.

## Design intent

- Dark navy base (`#070b1a` → `#0b1230` gradient), warm gold accent for the sun and links, cool blue rings.
- Typography: Fraunces for display, Inter for body.
- Subtle starfield + faint nebula gradient on hero only; rest of page is calm and editorial with generous spacing.

## Implementation order inside the HTML

1. `<head>`: meta, fonts, Tailwind CDN + inline `tailwind.config` extension, CDN scripts (React, ReactDOM, Babel, Three, Framer Motion).
2. `<body>`: `#root` + a `<script type="text/babel" data-presets="env,react">` containing all components.
3. Components: `Nav`, `Hero` (mounts Three.js in a `useEffect`, cleans up on unmount; resize listener), `EventsTicker`, `PortfolioDrawer`, `Carousel`, `EventsSection`, `PortfolioSections`, `Footer`, `App`.
4. Single `PORTFOLIOS` data array shared by nav dropdown, solar planets, drawer, and portfolio sections (single source of truth for copy).

## Out of scope

- Real routing, real team data, real event links (all `href="#"` per brief).
- Not integrated into the TanStack route tree (standalone file as requested).
