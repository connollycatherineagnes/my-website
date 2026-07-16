# SEE IT, OWN IT. — Corporate Website (v2)

Official marketing and legal website for **SEE IT, OWN IT. LTD** (Company No. 11765653), a UK-registered software studio building Android applications.

Live domain: [seeitownit.site](https://seeitownit.site)

## What changed in this rebuild

Full redesign from the previous version — new visual language (electric blue
`#3D5AFE` + mint teal `#00D9B5` on a near-black/white base, Space Grotesk +
Inter + IBM Plex Mono typography), a working **light/dark theme toggle**
persisted via `localStorage`, subtle scroll-reveal animations, and two new
pages: a dedicated **Support hub** and a **Data Deletion** request page.

## Tech stack

Static HTML5, CSS3, and vanilla JavaScript. No build step, no framework, no
server-side dependency. Deploys as-is to **Cloudflare Pages / Workers**.

## Project structure

```
.
├── index.html                      Home
├── about.html                      Company story, mission, values
├── apps.html                       Android app portfolio hub
├── blog.html                       Blog / news index
├── contact.html                    Contact form + direct emails
├── careers.html                    Careers placeholder
├── press.html                      Press / media kit
├── 404.html                        Not found (noindex)
├── 500.html                        Server error (noindex)
├── robots.txt
├── sitemap.xml
├── README.md
│
├── assets/
│   ├── css/style.css               Full design system (light + dark themes)
│   ├── js/script.js                Theme toggle, nav, scroll reveal, form
│   ├── site.webmanifest
│   └── images/
│       ├── favicon/                 SVG + PNG set (16/32/180/192/512)
│       ├── logo/                    Logo SVG source (mark + full lockup)
│       ├── og/                      Open Graph share images (1200x630)
│       └── apps/                    Per-app assets (placeholder only — no real app yet)
│
├── legal/
│   ├── website-privacy-policy.html
│   ├── website-terms.html
│   ├── apps-privacy-policy.html     Master policy — one doc for all current & future apps
│   ├── apps-terms.html              Master terms — one doc for all current & future apps
│   ├── cookie-policy.html
│   └── acceptable-use-policy.html
│
└── support/
    ├── index.html                   Support hub
    ├── faq.html                     FAQ (with FAQPage structured data)
    └── data-deletion.html           GDPR Art. 17 self-service deletion process
```

## Design system

- **Color:** `--accent` electric blue `#3D5AFE` (dark mode `#6C85FF`), mint
  teal `#00D9B5` as a secondary highlight, near-black `#0A0A0F` / white
  `#FFFFFF` base. All tokens defined once in `assets/css/style.css` under
  `:root` and `[data-theme="dark"]`.
- **Type:** Space Grotesk (display), Inter (body), IBM Plex Mono (technical/version strings).
- **Theme switching:** `<html data-theme="light|dark">`, toggled by
  `assets/js/script.js`, persisted in `localStorage`, with a
  no-flash-of-wrong-theme inline script in every page `<head>` and a
  `prefers-color-scheme` media query fallback for first-time visitors.
- **Motion:** IntersectionObserver-driven scroll reveal (`[data-reveal]`)
  and a hero aperture-mark draw-in animation, both wrapped in
  `prefers-reduced-motion` guards.

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link, visible focus rings.
- FAQ accordion uses native `<details>/<summary>` — no custom JS, fully keyboard- and screen-reader-accessible.
- Fonts loaded with `font-display: swap` and `preconnect` to avoid render-blocking.
- No layout-shifting images; all raster assets are pre-sized (favicons, OG images).
- Single small CSS file, single small JS file (~4KB gzipped range), no framework overhead.

## Scalability model

- Absolute URL paths throughout (`/apps.html`, `/legal/...`) — identical header/footer markup works at any folder depth.
- `apps.html` and the homepage portfolio section hold an arbitrary number of `.app-card` blocks.
- `legal/apps-privacy-policy.html` and `legal/apps-terms.html` are **master documents** — new apps get a short named subsection, not a new page.

## Known placeholders (intentional)

- Business phone number, business social links, support hours/SLA — genuinely not yet available.
- No real app exists yet — Apps hub and homepage show an honest "in development" state rather than fabricated products.
- Hosting/server location for the Apps Privacy Policy's international-transfer section — pending a hosting decision.

## Deployment (Cloudflare Pages)

1. Push this repository to GitHub.
2. In Cloudflare Pages, create a project connected to the repo.
3. Build command: none. Output directory: `/` (repository root).
4. Add the custom domain `seeitownit.site` once DNS is pointed at Cloudflare.

No environment variables or backend services are required.
