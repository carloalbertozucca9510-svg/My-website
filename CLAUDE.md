# CLAUDE.md — LTD100

## Project Overview
LTD100 is a limited-edition T-shirt e-commerce website based in Dubai.
Domain: ltd-100.com
Every decision in this codebase should reflect the brand's core proposition:
100 pieces per drop, each uniquely numbered. Nothing more, nothing less.

---

## Tech Stack
- Framework: React (Vite)
- Language: JavaScript (JSX) — no TypeScript unless explicitly requested
- Styling: CSS Modules or plain CSS — no Tailwind, no styled-components
- Fonts: Google Fonts — Bebas Neue (display), Barlow (body, weight 300 and 600)
- No UI component libraries — everything is custom built
- No animation libraries — CSS animations and transitions only
- State: React useState and useContext only — no Redux, no Zustand

---

## File Structure
ltd100/
├── public/
│   └── images/
│       └── Etichetta_verde_su_maglietta_nera.png
├── src/
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── CurrentDrop.jsx
│   │   ├── NumberPicker.jsx
│   │   ├── ColourSwatch.jsx
│   │   ├── TShirtSVG.jsx
│   │   ├── LabelSVG.jsx
│   │   ├── Vault.jsx
│   │   ├── VaultCard.jsx
│   │   ├── About.jsx
│   │   ├── Footer.jsx
│   │   ├── Marquee.jsx
│   │   └── Cursor.jsx
│   ├── data/
│   │   └── drops.js
│   ├── hooks/
│   │   └── useReveal.js
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── CLAUDE.md
├── index.html
└── package.json
---

## Design Tokens
Always use these values. Never hardcode colours or fonts inline.
Define in `variables.css` and reference as CSS custom properties throughout.
```css
Here it is:
markdown# CLAUDE.md — LTD100

## Project Overview
LTD100 is a limited-edition T-shirt e-commerce website based in Dubai.
Domain: ltd-100.com
Every decision in this codebase should reflect the brand's core proposition:
100 pieces per drop, each uniquely numbered. Nothing more, nothing less.

---

## Tech Stack
- Framework: React (Vite)
- Language: JavaScript (JSX) — no TypeScript unless explicitly requested
- Styling: CSS Modules or plain CSS — no Tailwind, no styled-components
- Fonts: Google Fonts — Bebas Neue (display), Barlow (body, weight 300 and 600)
- No UI component libraries — everything is custom built
- No animation libraries — CSS animations and transitions only
- State: React useState and useContext only — no Redux, no Zustand

---

## File Structure
ltd100/
├── public/
│   └── images/
│       └── Etichetta_verde_su_maglietta_nera.png
├── src/
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── CurrentDrop.jsx
│   │   ├── NumberPicker.jsx
│   │   ├── ColourSwatch.jsx
│   │   ├── TShirtSVG.jsx
│   │   ├── LabelSVG.jsx
│   │   ├── Vault.jsx
│   │   ├── VaultCard.jsx
│   │   ├── About.jsx
│   │   ├── Footer.jsx
│   │   ├── Marquee.jsx
│   │   └── Cursor.jsx
│   ├── data/
│   │   └── drops.js
│   ├── hooks/
│   │   └── useReveal.js
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── CLAUDE.md
├── index.html
└── package.json

---

## Design Tokens
Always use these values. Never hardcode colours or fonts inline.
Define in `variables.css` and reference as CSS custom properties throughout.
```css
--color-black:   #080808;
--color-white:   #f5f0eb;
--color-red:     #e3001b;
--color-green:   #2d7a4f;
--color-gray:    #1a1a1a;
--color-gray-2:  #242424;
--color-muted:   rgba(245, 240, 235, 0.4);

--font-display:  'Bebas Neue', sans-serif;
--font-body:     'Barlow', sans-serif;

--spacing-xs:    8px;
--spacing-sm:    16px;
--spacing-md:    32px;
--spacing-lg:    64px;
--spacing-xl:    120px;
```

---

## Data Structure
All drop data lives in `src/data/drops.js`. No hardcoded content in components.
```js
// src/data/drops.js

export const drops = [
  {
    id: 'drop-003',
    number: 3,
    name: 'Drop 003 — Heavyweight Tee',
    status: 'live',                      // 'live' | 'vault' | 'soldout'
    description: '360gsm heavyweight cotton. Oversized fit. Pre-washed for softness. Built to last, not to be replaced.',
    price: 285,
    currency: 'AED',
    totalUnits: 100,
    colourways: [
      {
        id: 'onyx',
        name: 'Onyx Black',
        hex: '#1a1a1a',
        stock: 12,
      },
      {
        id: 'ivory',
        name: 'Ivory White',
        hex: '#f0ede8',
        stock: 0,
      },
      {
        id: 'olive',
        name: 'Olive Fade',
        hex: '#3a3a2a',
        stock: 55,
      },
    ],
    numbers: {
      1: false, 2: false, 3: true, 4: false, 5: true,
      // true = available, false = claimed
      // all 100 entries must be present
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'drop-002',
    number: 2,
    name: 'Drop 002 — Midweight Tee',
    status: 'vault',
    description: '280gsm midweight cotton. Regular fit. Garment dyed.',
    price: 265,
    currency: 'AED',
    totalUnits: 100,
    colourways: [],
    numbers: {},
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'drop-001',
    number: 1,
    name: 'Drop 001 — Original Tee',
    status: 'soldout',
    description: '320gsm heavyweight cotton. Boxy fit.',
    price: 250,
    currency: 'AED',
    totalUnits: 100,
    colourways: [],
    numbers: {},
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
];

export const currentDrop = drops.find(d => d.status === 'live');
export const vaultDrops  = drops.filter(d => d.status === 'vault' || d.status === 'soldout');
```

---

## Key Components — Rules and Behaviour

### TShirtSVG.jsx
- Accepts props: `colour` (hex string), `labelNumber` (integer)
- Tee body fill changes based on `colour` prop
- Label is always rendered via `LabelSVG` as a child, always at bottom-right hem position
- Never hardcode a colour inside this component

### LabelSVG.jsx
- Accepts props: `number` (integer)
- Always renders: number at top, thin horizontal rule, `/100` below
- Background is always `#2d7a4f` (var --color-green) — never changes
- White text only — never any other colour
- Reference image: `public/images/Etichetta_verde_su_maglietta_nera.png`
- This is the single most important visual element on the site — treat it with care
- No brand name or logo on the label — numbers only

### NumberPicker.jsx
- Accepts props: `numbers` (object, keys 1–100, values true/false), `onSelect` (callback)
- Renders a 10×10 grid
- Available (true): green background (`--color-green`), white number, clickable
- Claimed (false): dark gray background, muted number, not clickable
- Selected: bright green border, slightly elevated
- Selection updates parent state via `onSelect` callback
- On mobile: grid scales to full screen width, minimum tap target 36px per cell

### CurrentDrop.jsx
- Derives `nextAvailableNumber` automatically — lowest number where value is true
- Selected number state lives here, passed down to NumberPicker and CTA
- CTA text: `Claim #0${selectedNumber}` — always zero-padded to 3 digits
- Progress bar width: `(claimedCount / 100) * 100` percent, filled in `--color-green`

### Vault.jsx + VaultCard.jsx
- Loops over `vaultDrops` from drops.js
- Sold-out cards: greyed out, no interaction, `Sold Out` badge overlaid
- Available vault cards: show up to 6 available number chips (`#004`, `#017` etc.)
- If more than 6 numbers remain: show `+N more` chip

### Cursor.jsx
- Two elements: small dot (10px, `--color-green`) and lagging ring (32px, border only)
- Ring follows mouse with lerp delay (factor 0.1) via requestAnimationFrame
- Hide default cursor on body: `cursor: none`
- Disable on touch devices — detect via `window.matchMedia('(pointer: coarse)')`

### Marquee.jsx
- Pure CSS animation — no JS scrolling
- Text: `LTD100 ◆ ONE TEE · ONE HUNDRED PIECES ◆ YOUR NUMBER · YOUR PIECE ◆ DROP 003 — LIVE NOW`
- Background: `--color-red`
- Content block duplicated for seamless loop

---

## Scroll Reveal
Single reusable hook for all sections.
```js
// src/hooks/useReveal.js
// Returns a ref — attach to any element
// Uses IntersectionObserver at threshold 0.12
// Adds class 'visible' when element enters viewport
// Initial state: opacity 0, translateY 32px
// Visible state: opacity 1, translateY 0
// Transition: 0.8s ease
// Once visible, stays visible — observer disconnects
```

---

## Responsive Breakpoints
```css
--bp-mobile:  560px;
--bp-tablet:  900px;
--bp-desktop: 1200px;
```

- Nav: hamburger below 900px, full-screen overlay menu
- Hero: single column below 900px, label SVG moves to background at low opacity
- Current Drop: stacked below 900px — visual above, details below
- Vault grid: 3 columns desktop → 2 columns tablet → 1 column mobile
- Number picker: full width on mobile, minimum 36px per cell
- About: two-column collapses to single column below 560px
- Footer: stacks to single column below 560px

---

## Naming Conventions
- Components: PascalCase (`TShirtSVG`, `NumberPicker`)
- CSS classes: kebab-case (`number-picker`, `drop-card`)
- JS variables: camelCase (`currentDrop`, `selectedNumber`)
- Data keys: camelCase (`colourways`, `totalUnits`)
- Files: match component name exactly (`NumberPicker.jsx`, `NumberPicker.css`)

---

## What NOT To Do
- Do not use any CSS framework — no Tailwind, no Bootstrap
- Do not use any animation library — no Framer Motion, no GSAP
- Do not use any component library — no shadcn, no MUI
- Do not hardcode brand colours, fonts or spacing — always use CSS variables
- Do not put drop data inside components — always import from drops.js
- Do not add features not in this file without asking first
- Do not use TypeScript
- Do not add a backend or CMS — static frontend only for now
- Do not change the label colour — always `#2d7a4f`
- Do not put any brand name or logo on the label SVG — numbers only
- Do not use placeholder images or external image URLs — all visuals are SVG

---

## Reference Assets
- `public/images/Etichetta_verde_su_maglietta_nera.png`
  This is the visual truth for LabelSVG and all T-shirt illustrations.
  Match the proportions, typography layout and green colour exactly.

---

## Brand Rules
- Brand name is always written `LTD100` — never `Ltd100`, `ltd100` or `LTD-100`
- Hyphen appears in the domain only: `ltd-100.com`
- Tagline: One Tee. One Hundred. Your Number.
- Instagram handle: @ltd100
- Currency: always AED — never USD or any other currency
- All piece numbers are zero-padded to 3 digits: #001, #067, #100
- The label on the garment shows numbers only — no brand name, no logo
