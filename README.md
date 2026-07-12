# SEE IT, OWN IT. — Corporate Website

Official marketing and legal website for **SEE IT, OWN IT. LTD** (Company No. 11765653), a UK-registered software studio building Android applications.

Live domain: [seeitownit.site](https://seeitownit.site)

## Tech stack

Static HTML5, CSS3, and vanilla JavaScript — no build step, no framework, no server-side dependency. Deploys as-is to **Cloudflare Pages / Workers**.

## Project structure

```
.
├── index.html                      Home page
├── about.html                      Company story, mission, values
├── apps.html                       Android app portfolio hub
├── blog.html                       Blog / news index
├── contact.html                    Contact form + direct emails
├── careers.html                    Careers placeholder
├── press.html                      Press / media kit
├── 404.html                        Not found error page
├── 500.html                        Server error page
├── robots.txt
├── sitemap.xml
├── README.md
│
├── assets/
│   ├── css/style.css               Full design system + all page styles
│   ├── js/script.js                Nav toggle, FAQ, form handling, animation gating
│   ├── site.webmanifest
│   └── images/
│       ├── favicon/                 Favicon set (svg + png, all sizes)
│       ├── logo/                    Logo SVG source files
│       ├── og/                      Open Graph share images
│       └── apps/                    Per-app icons/screenshots (populated as apps ship)
│
├── legal/
│   ├── website-privacy-policy.html
│   ├── website-terms.html
│   ├── apps-privacy-policy.html     Master policy — covers all current & future apps
│   ├── apps-terms.html              Master terms — covers all current & future apps
│   ├── cookie-policy.html
│   └── acceptable-use-policy.html
│
└── support/
    └── faq.html
```

## Design system

- **Type:** Manrope (display), Inter (body), JetBrains Mono (version/technical strings) — loaded via Google Fonts with `font-display: swap`.
- **Color:** Indigo accent (`#3A4CE0`) + amber accent (`#F2A93B`) on a near-black/off-white base. Full token list at the top of `assets/css/style.css`.
- **Motion:** Signature hero "aperture" mark animates on load; all animation is wrapped in `prefers-reduced-motion: no-preference` guards.

## Scalability model

- Every URL uses **absolute paths** (`/apps.html`, `/legal/...`), so header/footer markup is identical whether a page lives at the root or in `/legal/` or `/support/` — no relative-path bugs when adding new folders later.
- `apps.html` and the homepage's portfolio teaser are built to hold an arbitrary number of `.app-card` elements — adding app #2 through #200 means adding markup blocks, not redesigning layout.
- `legal/apps-privacy-policy.html` and `legal/apps-terms.html` are **master documents**: each new app gets a short named subsection rather than a whole new legal page.

## Known placeholders (intentional — see master specification)

- Business phone number
- Business social media links
- Support hours / SLA
- First real app (currently shown as "in development" rather than fabricated)
- `assets/images/apps/` is currently empty aside from a placeholder icon — real app icons/screenshots go here per app

## Deployment (Cloudflare Pages)

1. Push this repository to GitHub.
2. In Cloudflare Pages, create a new project connected to the repo.
3. Build command: none. Output directory: `/` (repository root).
4. Add the custom domain `seeitownit.site` once DNS is pointed at Cloudflare.

No environment variables or backend services are required for the current version of the site.
