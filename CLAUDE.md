# CLAUDE.md — Vistoria

## Project Overview
Vistoria is a limited-edition structured evening clutch bag brand based in Dubai.
Domain: vistoria.com
Every decision in this codebase should reflect the brand's core proposition:
100 pieces per drop, each individually numbered. Each reservation is final. Each piece is engraved before it leaves.

---

## Tech Stack
- Framework: React (Vite)
- Language: JavaScript (JSX) — no TypeScript unless explicitly requested
- Styling: CSS Modules or plain CSS — no Tailwind, no styled-components
- Fonts: Google Fonts — Cormorant Garamond (display, weight 300 and 500), Jost (body, weight 300 and 400)
- No UI component libraries — everything is custom built
- No animation libraries — CSS animations and transitions only
- State: React useState and useContext only — no Redux, no Zustand

---

## File Structure
ltd100/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── CurrentDrop.jsx
│   │   ├── NumberPicker.jsx
│   │   ├── ColourSwatch.jsx
│   │   ├── TShirtSVG.jsx       (repurposed as bag silhouette SVG)
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
--color-bg:               #F7F3EE;  /* Warm Ivory — primary background */
--color-bg-dark:          #1A1612;  /* Parchment Dark — dark sections */
--color-text:             #1A1612;  /* Warm Black */
--color-text-secondary:   #8C7B6B;  /* Warm Gray */
--color-gold:             #C9A96E;  /* Antique Gold — primary accent */
--color-gold-deep:        #A67C45;  /* Deep Gold — hover states */
--color-emerald:          #2C5F4A;  /* Deep Emerald — signature colour */
--color-burgundy:         #6B2737;  /* Burgundy — signature colour */
--color-border:           #E2D9CF;  /* Warm Sand — dividers and borders */
--color-number-available: #C9A96E;  /* Gold — available numbers */
--color-number-reserved:  #E2D9CF;  /* Sand — reserved */
--color-number-sold:      #5C4F44;  /* Muted — sold */

--font-display:  'Cormorant Garamond', serif;
--font-body:     'Jost', sans-serif;

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
export const drops = [
  {
    id: 'drop-001',
    number: 1,
    name: 'Vistoria Evening Clutch — Drop 001',
    status: 'live',
    description: '...',
    price: 7500,
    currency: 'AED',
    totalUnits: 100,
    material: 'To be confirmed',
    dimensions: '24–26 cm × 13–15 cm × 4–5 cm',
    reservationType: 'engraved',
    colourways: [...],
    numbers: {...},
    // NO sizes array — bags have no sizes
  },
];

export const currentDrop = drops.find(d => d.status === 'live');
export const vaultDrops  = drops.filter(d => d.status === 'vault' || d.status === 'soldout');
```

---

## Key Components — Rules and Behaviour

### NumberPicker.jsx — Constellation Interface
- Replaces the 10×10 grid with scattered dots on a dark canvas
- 100 dots at fixed deterministic positions (seeded PRNG — same layout on every render)
- Available dot: gold fill (#C9A96E), slow pulse animation (3s ease-in-out infinite)
- Reserved dot: sand (#E2D9CF), no pulse, no interaction
- Sold dot: very dark (#3A3028), barely visible, no interaction
- Selected: thin gold ring around dot
- Full-width dark section (--color-bg-dark), minimum 520px height
- Legend below: Available · Reserved · Yours

### CurrentDrop.jsx
- NO size selector — bags have no sizes
- Derives nextAvailableNumber automatically
- Constellation NumberPicker rendered full-width below the two-column product body
- CTA text: `Reserve Piece #0XX` — thin gold border, no fill. Hover: gold background
- Never use: Buy, Checkout, Add to Cart

### Vault.jsx + VaultCard.jsx
- Section heading: "The Archive"
- Subtitle: "Past editions. Still numbered. Still rare."
- VaultCard uses inline BagPlaceholder SVG component (not TShirtSVG)
- Sold out badge text: "Edition Closed"

### TShirtSVG.jsx
- Repurposed as bag silhouette SVG placeholder
- Accepts: colour (hex), labelNumber (integer), size (px)

### Cursor.jsx
- Dot and ring in --color-gold
- Disable on touch devices

---

## Scroll Reveal
```js
// src/hooks/useReveal.js
// Uses IntersectionObserver at threshold 0.12
// Adds class 'visible' when element enters viewport
// Initial: opacity 0, translateY 20px
// Visible: opacity 1, translateY 0
// Transition: 1.2s ease
// Once visible, stays visible — observer disconnects
```

---

## Responsive Breakpoints
```css
--bp-mobile:  560px;
--bp-tablet:  900px;
--bp-desktop: 1200px;
```

---

## Language Rules
- Never use: Buy, Add to Cart, Shop, Sale, Discount, Stock, Checkout, Inventory
- Always use: Reserve, Acquire, Edition, Piece, Object, Number, Yours
- Tone: calm, confident, unhurried
- No exclamation marks anywhere on the site

---

## Animation Rules
- All fade-ups: 1.2s ease, translateY maximum 20px
- Hover states: 0.4s ease transition
- Constellation pulse: 3s ease-in-out infinite
- Marquee: 35s per full loop
- No bounce, no spring, no fast snappy transitions

---

## What NOT To Do
- Do not use any CSS framework
- Do not use any animation library or component library
- Do not hardcode brand colours, fonts or spacing
- Do not put drop data inside components
- Do not add a size selector anywhere — bags have no sizes
- Do not use TypeScript
- Do not add a backend or CMS — static frontend only

---

## Brand Rules
- Brand name is always written `Vistoria`
- Tagline: One Hundred. Yours Alone.
- Instagram handle: @vistoria
- Currency: always AED
- All piece numbers are zero-padded to 3 digits: #001, #067, #100
- Each reservation is described as final and engraved
