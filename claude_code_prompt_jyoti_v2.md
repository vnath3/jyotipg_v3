# Claude Code Prompt — Jyoti Girls PG v2 (Astro)

## CONTEXT

Old site path: `C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_2025`
New site path: `C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_v2`

Before writing any code, read these files from the old site:
- `C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_2025\index.html`
- `C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_2025\styles.css`
- `C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_2025\netlify\functions\submit-lead.js`
- `C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_2025\pages\affordable-pricing.html`
- `C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_2025\pages\admissions-contact.html`

Extract from the old site before starting:
- All text content (hero, highlights, about, testimonials, FAQ Q&A pairs)
- GA4 Measurement ID
- Netlify function endpoint URL
- All form field names and IDs (these must not change)
- All existing page titles and meta descriptions

---

## TASK

Build a complete new Astro website in `jyoti_pg_v2`.
This is a full rebuild — clean architecture, new design system.
Do NOT copy old CSS patterns. Content and functionality migrate, design is new.

---

## TECH STACK

- Astro (latest stable) — static output mode
- Vanilla CSS (no Tailwind, no CSS frameworks)
- Vanilla JS only where needed (nav drawer, modal, analytics)
- Leaflet.js for map (CDN)
- Google Fonts — Inter (400, 500, 600)
- Deploy target: Netlify

---

## STEP 1 — INITIALISE PROJECT

Run in `C:\A_Data\Git_projects\jyoti_pg\`:

```
npm create astro@latest jyoti_pg_v2 -- --template minimal --no-install
cd jyoti_pg_v2
npm install
```

Then create this exact folder structure:

```
jyoti_pg_v2/
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── WhatsAppBar.astro
│   │   ├── LeadModal.astro
│   │   └── PricingCards.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── admissions-contact.astro
│   │   ├── affordable-pricing.astro
│   │   ├── safety-and-hygiene.astro
│   │   ├── student-life.astro
│   │   ├── meals-and-facilities.astro
│   │   ├── curfew-caretaker-policy.astro
│   │   ├── coaching-proximity.astro
│   │   ├── testimonials-parent-feedback.astro
│   │   ├── neet-study-environment.astro
│   │   ├── girls-pg-near-deogiri-college-osmanpura.astro
│   │   └── girls-pg-checklist-parents-sambhajinagar.astro
│   └── styles/
│       ├── base.css
│       ├── components.css
│       └── sections.css
├── public/
│   ├── images/          ← copy all files from old site's /images/
│   └── sitemap.xml
├── netlify/
│   └── functions/
│       └── submit-lead.js
├── astro.config.mjs
├── package.json
└── netlify.toml
```

Copy all images:
```
xcopy "C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_2025\images\*" "C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_v2\public\images\" /E /I
```

Copy Netlify function exactly — zero changes:
```
xcopy "C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_2025\netlify\functions\submit-lead.js" "C:\A_Data\Git_projects\jyoti_pg\jyoti_pg_v2\netlify\functions\" /I
```

---

## STEP 2 — astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static',
  site: 'https://jyotipg.netlify.app',
});
```

---

## STEP 3 — netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## STEP 4 — CSS DESIGN SYSTEM

### src/styles/base.css

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-bg-base: #F7F4F0;
  --color-bg-white: #FFFFFF;
  --color-bg-subtle: #F0EBE3;
  --color-primary: #0F6E56;
  --color-primary-hover: #0A5A45;
  --color-primary-light: #1D9E75;
  --color-primary-pale: #E1F5EE;
  --color-cta: #C17B2E;
  --color-cta-hover: #A8681F;
  --color-cta-light: #F5ECD9;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #5A5A5A;
  --color-text-muted: #8A8A8A;
  --color-border: #E5E0D8;
  --color-border-strong: #C8BFB3;
  --font-main: 'Inter', sans-serif;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --shadow-card: 0 1px 4px rgba(0,0,0,0.07);
  --transition: 0.18s ease;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-main);
  background: var(--color-bg-base);
  color: var(--color-text-primary);
  font-size: 16px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }
a { color: inherit; }

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

section { padding: 80px 0; }

.section-eyebrow {
  display: block;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
}

.section-heading {
  font-size: 1.9rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.25;
  margin-bottom: 14px;
}

.section-lead {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 560px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  section { padding: 48px 0; }
  .section-heading { font-size: 1.5rem; }
}
```

### src/styles/components.css

```css
/* Buttons */
.btn-primary {
  display: inline-block;
  background: var(--color-cta);
  color: #fff;
  border: none;
  padding: 13px 28px;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--transition);
  font-family: var(--font-main);
}
.btn-primary:hover { background: var(--color-cta-hover); }

.btn-outline {
  display: inline-block;
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  padding: 12px 26px;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--transition);
  font-family: var(--font-main);
}
.btn-outline:hover { background: var(--color-primary-pale); }

.btn-whatsapp {
  display: inline-block;
  background: #25D366;
  color: #fff;
  border: none;
  padding: 11px 24px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  font-family: var(--font-main);
}

/* Cards */
.card {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
  transition: border-color var(--transition), transform var(--transition);
}
.card:hover {
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
}

/* Badges */
.badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 99px;
}
.badge-teal { background: var(--color-primary-pale); color: var(--color-primary); }
.badge-amber { background: var(--color-cta-light); color: var(--color-cta); }
.badge-warm { background: var(--color-bg-subtle); color: var(--color-text-secondary); }

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg-white);
  border-bottom: 1px solid var(--color-border);
}
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}
.navbar-logo {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-primary);
  text-decoration: none;
}
.navbar-links {
  display: flex;
  gap: 32px;
  list-style: none;
}
.navbar-links a {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition);
}
.navbar-links a:hover { color: var(--color-primary); }
.navbar-hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  flex-direction: column;
  gap: 5px;
}
.navbar-hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: var(--transition);
}
.navbar-drawer {
  display: none;
  position: fixed;
  top: 64px;
  right: 0;
  bottom: 0;
  width: 280px;
  background: var(--color-bg-white);
  border-left: 1px solid var(--color-border);
  padding: 24px;
  z-index: 99;
  flex-direction: column;
  gap: 0;
}
.navbar-drawer a {
  display: block;
  padding: 14px 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
}
body.nav-open .navbar-drawer { display: flex; }
body.nav-open .nav-overlay { display: block; }
.nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 98;
}

@media (max-width: 768px) {
  .navbar-links { display: none; }
  .navbar-links + a { display: none; }
  .navbar-hamburger { display: flex; }
}

/* Footer */
.footer {
  background: #1A1A1A;
  color: #A0A0A0;
  padding: 60px 0 32px;
}
.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}
.footer h4 {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 16px;
}
.footer a {
  display: block;
  color: #A0A0A0;
  text-decoration: none;
  font-size: 0.88rem;
  line-height: 2.2;
  transition: color var(--transition);
}
.footer a:hover { color: var(--color-primary-light); }
.footer-bottom {
  border-top: 1px solid #2A2A2A;
  padding-top: 24px;
  font-size: 0.82rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  .footer-bottom { flex-direction: column; text-align: center; }
}

/* WhatsApp sticky bar */
.sticky-wa {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  gap: 12px;
}
.sticky-wa p { font-size: 0.9rem; font-weight: 500; }
.sticky-wa-dismiss {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  margin-left: 8px;
  flex-shrink: 0;
}

/* Lead modal */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 300;
  align-items: center;
  justify-content: center;
}
.modal-overlay.open { display: flex; }
.modal-box {
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  padding: 2rem;
  width: 100%;
  max-width: 460px;
  margin: 16px;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--color-text-muted);
}
.modal-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--color-border);
}
.modal-tab {
  flex: 1;
  padding: 10px;
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text-muted);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  font-family: var(--font-main);
  transition: color var(--transition);
}
.modal-tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
.modal-panel { display: none; }
.modal-panel.active { display: block; }
.form-group { margin-bottom: 16px; }
.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--color-text-secondary);
}
.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-family: var(--font-main);
  color: var(--color-text-primary);
  background: var(--color-bg-white);
  transition: border-color var(--transition);
}
.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: var(--color-primary);
}
.form-note {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-top: 12px;
}
.form-success {
  display: none;
  text-align: center;
  padding: 24px 0;
}
.form-success h3 {
  color: var(--color-primary);
  margin-bottom: 8px;
}
```

### src/styles/sections.css

```css
/* Hero */
.hero {
  background: var(--color-bg-base);
  padding: 96px 0 80px;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.hero-eyebrow {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 14px;
}
.hero h1 {
  font-size: 2.6rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text-primary);
  margin-bottom: 18px;
}
.hero-sub {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  margin-bottom: 28px;
  line-height: 1.7;
}
.hero-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.hero-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.hero-image img {
  width: 100%;
  border-radius: var(--radius-lg);
  object-fit: cover;
  aspect-ratio: 4/3;
}

@media (max-width: 768px) {
  .hero { padding: 56px 0 48px; }
  .hero-grid { grid-template-columns: 1fr; gap: 32px; }
  .hero h1 { font-size: 1.9rem; }
  .hero-image { order: -1; }
}

/* Highlights */
.highlights { background: var(--color-bg-white); }
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.highlight-card { /* extends .card */ }
.highlight-icon {
  font-size: 1.6rem;
  margin-bottom: 12px;
  color: var(--color-primary);
}
.highlight-card h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text-primary);
}
.highlight-card p {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .highlights-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .highlights-grid { grid-template-columns: 1fr; }
}

/* Pricing */
.pricing { background: var(--color-bg-subtle); }
.pricing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 760px;
}
.pricing-card { /* extends .card */ }
.pricing-card.featured { border: 2px solid var(--color-primary); }
.pricing-price {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 14px 0 4px;
}
.pricing-card:not(.featured) .pricing-price {
  color: var(--color-text-primary);
}
.pricing-period {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 6px;
}
.pricing-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}
.pricing-features {
  list-style: none;
  margin-bottom: 24px;
}
.pricing-features li {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  padding: 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.pricing-features li::before {
  content: '✓';
  color: var(--color-primary);
  font-weight: 700;
  flex-shrink: 0;
}
.pricing-note {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .pricing-grid { grid-template-columns: 1fr; }
}

/* Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.gallery-grid img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: var(--radius-md);
}

@media (max-width: 768px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .gallery-grid { grid-template-columns: 1fr; }
}

/* Stats */
.stats { background: var(--color-bg-white); }
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.stat-card {
  text-align: center;
  padding: 1.5rem;
}
.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  display: block;
  margin-bottom: 6px;
}
.stat-label {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Testimonials */
.testimonials { background: var(--color-bg-base); }
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.testimonial-card { /* extends .card */ }
.testimonial-stars {
  color: var(--color-cta);
  font-size: 1rem;
  margin-bottom: 10px;
  letter-spacing: 2px;
}
.testimonial-quote {
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  font-style: italic;
  line-height: 1.7;
  margin-bottom: 14px;
}
.testimonial-author {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-primary);
}
.testimonial-role {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

@media (max-width: 600px) {
  .testimonials-grid { grid-template-columns: 1fr; }
}

/* FAQ */
.faq { background: var(--color-bg-white); }
.faq-list { max-width: 720px; }
.faq-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 10px;
  overflow: hidden;
  transition: border-color var(--transition);
}
.faq-item.open { border-color: var(--color-primary); }
.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 18px 20px;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-main);
  gap: 12px;
}
.faq-item.open .faq-question {
  color: var(--color-primary);
  border-left: 3px solid var(--color-primary);
}
.faq-chevron {
  flex-shrink: 0;
  transition: transform var(--transition);
  color: var(--color-text-muted);
}
.faq-item.open .faq-chevron { transform: rotate(180deg); }
.faq-answer {
  display: none;
  padding: 0 20px 18px;
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}
.faq-item.open .faq-answer { display: block; }

/* Map */
.map-section { background: var(--color-bg-subtle); }
#map { height: 380px; border-radius: var(--radius-md); z-index: 1; }

/* Article pages */
.article-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: flex-start;
}
.article-body h2 { font-size: 1.3rem; font-weight: 600; margin: 28px 0 10px; }
.article-body p { margin-bottom: 16px; color: var(--color-text-secondary); }
.article-body ul { padding-left: 20px; margin-bottom: 16px; }
.article-body li { color: var(--color-text-secondary); margin-bottom: 8px; }
.article-sidebar {
  position: sticky;
  top: 88px;
}
.sidebar-card {
  background: var(--color-primary-pale);
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}
.sidebar-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 6px;
}
.sidebar-price {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 4px;
}
.sidebar-note {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}
.sidebar-card .btn-primary,
.sidebar-card .btn-outline { width: 100%; text-align: center; margin-bottom: 10px; }

/* Checklist items */
.checklist-item {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  margin-bottom: 12px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.checklist-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.checklist-item h3 { font-size: 0.95rem; font-weight: 600; margin-bottom: 4px; }
.checklist-item p { font-size: 0.88rem; color: var(--color-text-secondary); margin: 0; }

@media (max-width: 768px) {
  .article-layout { grid-template-columns: 1fr; }
  .article-sidebar { position: static; }
}
```

---

## STEP 5 — src/layouts/Layout.astro

```astro
---
export interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}
const {
  title,
  description,
  canonical = Astro.url.href,
  ogImage = '/images/Jyoti_PG_Front.jpg'
} = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:type" content="website" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="/styles/base.css" />
  <link rel="stylesheet" href="/styles/components.css" />
  <link rel="stylesheet" href="/styles/sections.css" />
  <!-- GA4: copy measurement ID from old site -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
</head>
<body>

  <nav class="navbar">
    <div class="navbar-inner">
      <a href="/" class="navbar-logo">Jyoti Girls PG</a>
      <ul class="navbar-links">
        <li><a href="/#highlights">Highlights</a></li>
        <li><a href="/#gallery">Gallery</a></li>
        <li><a href="/#pricing">Pricing</a></li>
        <li><a href="/#faq">FAQ</a></li>
        <li><a href="/affordable-pricing">Plans</a></li>
      </ul>
      <a href="/admissions-contact" class="btn-primary" style="padding:10px 20px;font-size:0.85rem;">Admissions</a>
      <button class="navbar-hamburger" id="hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="navbar-drawer" id="drawer">
      <a href="/#highlights">Highlights</a>
      <a href="/#pricing">Pricing</a>
      <a href="/#gallery">Gallery</a>
      <a href="/#faq">FAQ</a>
      <a href="/admissions-contact">Admissions</a>
      <a href="/affordable-pricing">View Plans</a>
      <a href="https://wa.me/919922333305" class="btn-whatsapp" style="margin-top:16px;text-align:center;">WhatsApp Us</a>
    </div>
    <div class="nav-overlay" id="navOverlay"></div>
  </nav>

  <main>
    <slot />
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4>Jyoti Girls PG</h4>
          <p style="font-size:0.88rem;line-height:1.8;">Safe, comfortable, and well-connected accommodation for girls in Chhatrapati Sambhajinagar.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/affordable-pricing">Pricing</a>
          <a href="/safety-and-hygiene">Safety & Hygiene</a>
          <a href="/meals-and-facilities">Meals & Facilities</a>
          <a href="/admissions-contact">Admissions</a>
          <a href="/girls-pg-near-deogiri-college-osmanpura">Near Deogiri College</a>
        </div>
        <div>
          <h4>Contact</h4>
          <p style="font-size:0.88rem;line-height:2;">Vishwadeep, Jyoti Nagar<br/>Near Dashmesh Mandir<br/>Chhatrapati Sambhajinagar 431005</p>
          <a href="tel:+919922333305">+91 99223 33305</a>
          <a href="https://wa.me/919922333305">WhatsApp</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 Jyoti Girls PG. All rights reserved.</span>
        <span>Osmanpura, Chhatrapati Sambhajinagar</span>
      </div>
    </div>
  </footer>

  <div class="sticky-wa" id="stickyWa">
    <p>Limited beds available for 2025–26 · Book your spot today</p>
    <div style="display:flex;align-items:center;gap:10px;">
      <a href="https://wa.me/919922333305?text=Hello%20Jyoti%20Girls%20PG%2C%20I%27m%20interested%20in%20booking%20a%20bed." class="btn-whatsapp">Chat on WhatsApp</a>
      <button class="sticky-wa-dismiss" id="dismissWa" aria-label="Dismiss">×</button>
    </div>
  </div>

  <!-- Lead Modal -->
  <div class="modal-overlay" id="leadModal">
    <div class="modal-box">
      <button class="modal-close" id="modalClose" aria-label="Close">×</button>
      <div class="modal-tabs">
        <button class="modal-tab active" data-tab="availability">Check Availability</button>
        <button class="modal-tab" data-tab="visit">Schedule Visit</button>
      </div>
      <div class="modal-panel active" id="panel-availability">
        <form id="availabilityForm">
          <div class="form-group">
            <label for="av-name">Full Name *</label>
            <input type="text" id="av-name" name="name" required placeholder="Your name" />
          </div>
          <div class="form-group">
            <label for="av-phone">Phone Number *</label>
            <input type="tel" id="av-phone" name="phone" required placeholder="+91 XXXXX XXXXX" />
          </div>
          <button type="submit" class="btn-primary" style="width:100%;">Check Availability</button>
          <p class="form-note">By submitting, you agree to be contacted via WhatsApp/call.</p>
        </form>
        <div class="form-success" id="av-success">
          <h3>Thank you!</h3>
          <p>We'll WhatsApp you within a few hours with availability details.</p>
        </div>
      </div>
      <div class="modal-panel" id="panel-visit">
        <form id="visitForm">
          <div class="form-group">
            <label for="vs-name">Full Name *</label>
            <input type="text" id="vs-name" name="name" required placeholder="Your name" />
          </div>
          <div class="form-group">
            <label for="vs-phone">Phone Number *</label>
            <input type="tel" id="vs-phone" name="phone" required placeholder="+91 XXXXX XXXXX" />
          </div>
          <button type="submit" class="btn-primary" style="width:100%;">Schedule Visit</button>
          <p class="form-note">By submitting, you agree to be contacted via WhatsApp/call.</p>
        </form>
        <div class="form-success" id="vs-success">
          <h3>Visit scheduled!</h3>
          <p>We'll confirm your visit time via WhatsApp shortly.</p>
        </div>
      </div>
    </div>
  </div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="/scripts/nav.js"></script>
  <script src="/scripts/modal.js"></script>
  <script src="/scripts/analytics.js"></script>
</body>
</html>
```

NOTE: Move JS files to `public/scripts/` so Astro serves them as static assets.

---

## STEP 6 — public/scripts/nav.js

```js
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('navOverlay');

function openNav() { document.body.classList.add('nav-open'); }
function closeNav() { document.body.classList.remove('nav-open'); }

if (hamburger) hamburger.addEventListener('click', openNav);
if (navOverlay) navOverlay.addEventListener('click', closeNav);
```

---

## STEP 7 — public/scripts/modal.js

```js
const modal = document.getElementById('leadModal');
const modalClose = document.getElementById('modalClose');
const tabs = document.querySelectorAll('.modal-tab');
const panels = document.querySelectorAll('.modal-panel');

function openModal(tabId) {
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (tabId) switchTab(tabId);
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
function switchTab(tabId) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + tabId));
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modal || 'availability'));
});

function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  const utms = {};
  keys.forEach(k => { if (params.get(k)) utms[k] = params.get(k); });
  if (Object.keys(utms).length) sessionStorage.setItem('utms', JSON.stringify(utms));
  return JSON.parse(sessionStorage.getItem('utms') || '{}');
}

async function submitForm(formId, successId, formType) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const utms = getUTMParams();
    try {
      await fetch('/.netlify/functions/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...utms, form_type: formType, tenant: 'jyoti-pg' })
      });
      form.style.display = 'none';
      document.getElementById(successId).style.display = 'block';
      if (typeof gtag !== 'undefined') gtag('event', 'form_submit', { form_type: formType });
    } catch(err) {
      console.error('Form error:', err);
    }
  });
}

submitForm('availabilityForm', 'av-success', 'availability');
submitForm('visitForm', 'vs-success', 'visit');
```

---

## STEP 8 — public/scripts/analytics.js

```js
// Replace GA_MEASUREMENT_ID with actual ID read from old site
document.querySelectorAll('.btn-primary, .btn-outline, .btn-whatsapp').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof gtag === 'undefined') return;
    gtag('event', 'cta_click', {
      button_text: btn.textContent.trim(),
      button_location: btn.closest('section')?.className || 'unknown'
    });
  });
});

let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
window.addEventListener('scroll', () => {
  const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  [25, 50, 75, 100].forEach(mark => {
    if (pct >= mark && !scrollMarks[mark]) {
      scrollMarks[mark] = true;
      if (typeof gtag !== 'undefined') gtag('event', 'scroll_depth', { depth: mark });
    }
  });
});

const dismissWa = document.getElementById('dismissWa');
if (dismissWa) {
  dismissWa.addEventListener('click', () => {
    document.getElementById('stickyWa').style.display = 'none';
    if (typeof gtag !== 'undefined') gtag('event', 'sticky_wa_dismissed');
  });
}
```

---

## STEP 9 — src/pages/index.astro

Build the homepage using Layout.astro as the wrapper.

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout
  title="Jyoti Girls PG | Safe Stay Near Deogiri College, Osmanpura"
  description="Safe, homely girls PG near Deogiri College and DIEMS in Osmanpura, Chhatrapati Sambhajinagar. Twin sharing ₹5,000 · Standard ₹2,999. 24x7 female staff. WhatsApp to book."
>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <span class="hero-eyebrow">Safe stay · Osmanpura, Sambhaji Nagar</span>
          <h1>A homely, secure PG for girls near Deogiri College</h1>
          <p class="hero-sub">Twin sharing from ₹5,000 · Standard sharing from ₹2,999 · Walking distance from Deogiri College &amp; coaching centres</p>
          <div class="hero-buttons">
            <button class="btn-primary" data-modal="availability">Check availability</button>
            <button class="btn-outline" data-modal="visit">Schedule a tour</button>
          </div>
          <div class="hero-badges">
            <span class="badge badge-teal">24x7 female staff</span>
            <span class="badge badge-teal">0.8 km to Deogiri College</span>
            <span class="badge badge-amber">No bunk beds · proper rooms</span>
          </div>
        </div>
        <div class="hero-image">
          <img src="/images/Jyoti_PG_Front.jpg" alt="Jyoti Girls PG front entrance, Osmanpura" loading="eager" />
        </div>
      </div>
    </div>
  </section>

  <!-- Highlights -->
  <section class="highlights" id="highlights">
    <div class="container">
      <span class="section-eyebrow">Why families choose us</span>
      <h2 class="section-heading">Safety, comfort, and proximity — without compromise</h2>
      <div class="highlights-grid">
        <div class="card highlight-card">
          <div class="highlight-icon">🔒</div>
          <h3>Secure & supervised</h3>
          <p>24x7 warden, CCTV in common areas, strict visitor log — peace of mind for parents back home.</p>
        </div>
        <div class="card highlight-card">
          <div class="highlight-icon">📍</div>
          <h3>Near Deogiri College & DIEMS</h3>
          <p>0.8 km walk to Deogiri College, 0.9 km to DIEMS engineering — no daily auto or rickshaw needed.</p>
        </div>
        <div class="card highlight-card">
          <div class="highlight-icon">🛏️</div>
          <h3>No bunk beds — ever</h3>
          <p>Proper single beds, personal wardrobe, and study desk in every room. Twin and standard options available.</p>
        </div>
        <div class="card highlight-card">
          <div class="highlight-icon">📶</div>
          <h3>Wi-Fi + power backup</h3>
          <p>High-speed internet and 24x7 power backup — no interruptions during exam season or lab submissions.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section class="pricing" id="pricing">
    <div class="container">
      <span class="section-eyebrow">Simple, transparent pricing</span>
      <h2 class="section-heading">Two plans — one for privacy, one for value</h2>
      <div class="pricing-grid">
        <div class="card pricing-card featured">
          <span class="badge badge-teal">Twin sharing</span>
          <div class="pricing-price">₹5,000</div>
          <div class="pricing-period">per month</div>
          <p class="pricing-desc">1 room · 2 beds · more privacy</p>
          <ul class="pricing-features">
            <li>More personal space</li>
            <li>Only one roommate</li>
            <li>Quieter environment</li>
            <li>All amenities included</li>
          </ul>
          <button class="btn-outline" data-modal="availability" style="width:100%;">Check availability</button>
        </div>
        <div class="card pricing-card">
          <span class="badge badge-warm">Standard sharing</span>
          <div class="pricing-price">₹2,999</div>
          <div class="pricing-period">per month</div>
          <p class="pricing-desc">2 rooms · 3–4 beds · best value</p>
          <ul class="pricing-features">
            <li>Great value for students</li>
            <li>Lively, social environment</li>
            <li>Full amenities included</li>
            <li>Most popular choice</li>
          </ul>
          <button class="btn-primary" data-modal="availability" style="width:100%;">Check availability</button>
        </div>
      </div>
      <p class="pricing-note">Prices exclude meals. Nearby tiffin service available. Academic year plans on request.</p>
    </div>
  </section>

  <!-- Gallery -->
  <section id="gallery">
    <div class="container">
      <span class="section-eyebrow">Inside Jyoti Girls PG</span>
      <h2 class="section-heading">Take a look around</h2>
      <div class="gallery-grid">
        <img src="/images/Jyoti_PG_Room_1.jpg" alt="Double sharing room with beds and storage" loading="lazy" />
        <img src="/images/Jyoti_PG_Room_2.jpg" alt="Room interior with natural light and study tables" loading="lazy" />
        <img src="/images/Jyoti_PG_Passage.jpg" alt="Wide passageway with CCTV cameras" loading="lazy" />
        <img src="/images/Jyoti_PG_Basin.jpg" alt="Clean wash basin area" loading="lazy" />
        <img src="/images/Jyoti_PG_NightView.jpg" alt="Jyoti Girls PG illuminated at night" loading="lazy" />
        <img src="/images/Jyoti_PG_Front.jpg" alt="Jyoti Girls PG front elevation" loading="lazy" />
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="stats">
    <div class="container">
      <div class="stats-grid">
        <div class="card stat-card">
          <span class="stat-number">10+</span>
          <span class="stat-label">Comfortable beds</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">3+</span>
          <span class="stat-label">Years serving students</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">0.8 km</span>
          <span class="stat-label">From Deogiri College</span>
        </div>
        <div class="card stat-card">
          <span class="stat-number">100%</span>
          <span class="stat-label">Verified female staff</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <!-- EXTRACT testimonials from old index.html and insert here using same card pattern -->

  <!-- FAQ -->
  <!-- EXTRACT all FAQ Q&A pairs from old index.html and insert here -->
  <!-- UPDATE pricing answer to: Twin sharing ₹5,000/month · Standard sharing ₹2,999/month -->

  <!-- Map -->
  <section class="map-section">
    <div class="container">
      <span class="section-eyebrow">Find us easily</span>
      <h2 class="section-heading">0.8 km from Deogiri College, Osmanpura</h2>
      <div id="map"></div>
    </div>
  </section>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof L === 'undefined') return;
      const map = L.map('map').setView([19.864283, 75.332836], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      L.marker([19.864283, 75.332836])
        .addTo(map)
        .bindPopup('<strong>Jyoti Girls PG</strong><br/>0.8 km from Deogiri College<br/>Jyoti Nagar, Osmanpura')
        .openPopup();
    });
  </script>

</Layout>
```

---

## STEP 10 — REMAINING PAGES

### All 9 existing pages
For each of the 9 existing pages (admissions-contact, affordable-pricing, safety-and-hygiene, student-life, meals-and-facilities, curfew-caretaker-policy, coaching-proximity, testimonials-parent-feedback, neet-study-environment):

1. Read the corresponding HTML file from the old site
2. Extract all text content, headings, lists, and form fields
3. Wrap in Layout.astro with appropriate title and meta description
4. Apply new CSS classes (card, btn-primary, section-heading, etc.)
5. Preserve all form field names and IDs exactly

Special updates:
- `affordable-pricing.astro` → use the two-column pricing-grid component (same as homepage pricing section)
- `coaching-proximity.astro` → update headline to include "Deogiri College and DIEMS" alongside coaching centres

### New SEO page 1 — girls-pg-near-deogiri-college-osmanpura.astro

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout
  title="Girls PG near Deogiri College Osmanpura | Jyoti Girls PG"
  description="Looking for a girls PG near Deogiri College Osmanpura? Jyoti Girls PG is 0.8 km from campus — safe, homely, from ₹2,999/month. WhatsApp to check availability."
>
  <section style="padding: 60px 0 80px; background: var(--color-bg-base);">
    <div class="container">
      <span class="section-eyebrow">Accommodation guide · 2025</span>
      <h1 class="section-heading" style="max-width:700px;">Girls PG near Deogiri College, Osmanpura — what parents need to know</h1>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:40px;">
        <span class="badge badge-teal">0.8 km from campus</span>
        <span class="badge badge-amber">From ₹2,999/month</span>
      </div>
      <div class="article-layout">
        <article class="article-body">
          <!-- ARTICLE_1_CONTENT — paste full article here -->
          <p><em>Article content will be added in the next step.</em></p>
        </article>
        <aside class="article-sidebar">
          <div class="sidebar-card">
            <h3>Check availability at Jyoti Girls PG</h3>
            <div class="sidebar-price">₹2,999<span style="font-size:1rem;font-weight:400;color:var(--color-text-secondary);">/mo</span></div>
            <p class="sidebar-note">Standard sharing · From ₹2,999<br/>Twin sharing · ₹5,000</p>
            <a href="https://wa.me/919922333305" class="btn-primary">WhatsApp to book</a>
            <a href="tel:+919922333305" class="btn-outline">Call us</a>
          </div>
        </aside>
      </div>
    </div>
  </section>
</Layout>
```

### New SEO page 2 — girls-pg-checklist-parents-sambhajinagar.astro

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout
  title="10-Point Checklist for Parents: Choosing a Girls PG in Sambhajinagar"
  description="Before finalising a girls PG in Chhatrapati Sambhajinagar, use this 10-point checklist. Covers safety, pricing, food, proximity to Deogiri College and coaching centres."
>
  <section style="padding: 60px 0 80px; background: var(--color-bg-base);">
    <div class="container">
      <span class="section-eyebrow">Parent guide · 2025</span>
      <h1 class="section-heading" style="max-width:700px;">10-point checklist for parents choosing a girls PG in Sambhajinagar</h1>
      <div class="article-layout">
        <article class="article-body">
          <!-- ARTICLE_2_CONTENT — paste full checklist article here -->
          <!-- Checklist items should use this pattern: -->
          <!--
          <div class="checklist-item">
            <div class="checklist-num">1</div>
            <div>
              <h3>Point title here</h3>
              <p>Explanation here.</p>
            </div>
          </div>
          -->
          <p><em>Checklist content will be added in the next step.</em></p>
        </article>
        <aside class="article-sidebar">
          <div class="sidebar-card">
            <h3>Jyoti Girls PG scores 10/10</h3>
            <div class="sidebar-price">₹2,999<span style="font-size:1rem;font-weight:400;color:var(--color-text-secondary);">/mo</span></div>
            <p class="sidebar-note">Osmanpura · 0.8 km from Deogiri College</p>
            <a href="https://wa.me/919922333305" class="btn-primary">WhatsApp to book</a>
            <a href="tel:+919922333305" class="btn-outline">Call us</a>
          </div>
        </aside>
      </div>
    </div>
  </section>
</Layout>
```

---

## STEP 11 — public/sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://jyotipg.netlify.app/</loc><priority>1.0</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/girls-pg-near-deogiri-college-osmanpura</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/girls-pg-checklist-parents-sambhajinagar</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/affordable-pricing</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/admissions-contact</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/coaching-proximity</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/safety-and-hygiene</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/meals-and-facilities</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/student-life</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/testimonials-parent-feedback</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/neet-study-environment</loc><priority>0.5</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://jyotipg.netlify.app/curfew-caretaker-policy</loc><priority>0.5</priority><changefreq>monthly</changefreq></url>
</urlset>
```

---

## COMPLETION CHECKLIST

After all files are created, verify:
- [ ] `npm run build` completes without errors
- [ ] All 12 pages exist in /dist after build
- [ ] Form field names in admissions-contact.astro match old site exactly
- [ ] GA4 Measurement ID replaced from old site
- [ ] Netlify function endpoint in modal.js matches old site
- [ ] All image paths resolve correctly from /public/images/
- [ ] sitemap.xml is in /dist after build
- [ ] Two ARTICLE_CONTENT placeholders are clearly marked

Report any ambiguities or decisions made at the end.
