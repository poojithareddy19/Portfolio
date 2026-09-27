# Portfolio

Personal portfolio of Gorla Poojitha, Data Scientist and ML Engineer (Hyderabad, India).

A static, single-page site built with plain HTML, CSS and JavaScript modules, bundled by [Vite](https://vite.dev). No framework and no runtime dependencies.

## Sections

1. Hero: headline, value proposition, location and time zone, calls to action
2. Featured projects: bento grid with a Situation / Task / Action / Result breakdown, metrics and links
3. Skills: grouped tags with a filter
4. Experience: filterable timeline of work, education, projects and certifications
5. Achievements: verifiable milestones
6. Contact: validated form that opens the visitor's email app, plus direct links

Every project number comes from the project's own documentation (held-out test splits or fixed evaluation sets).

## Structure

```
index.html              markup, SEO metadata, pre-paint theme script
src/styles.css          design tokens (light and dark monochrome themes) and all styles
src/main.js             entry point, wires up the modules
src/modules/
  theme.js              light / dark toggle, follows the system setting until chosen
  nav.js                sticky header, mobile menu, active-section link
  reveal.js             fade-in on scroll
  cursor.js             cursor ring and card spotlight (mouse users only)
  filters.js            reusable segmented filter for projects, skills and timeline
  contact.js            form validation, mailto hand-off, copy-email button
  clock.js              live IST clock in the hero
```

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production site is written to `dist/` (not committed).

## Deploy on Vercel

Import the repository in Vercel. The Vite preset is detected automatically:

- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` redeploys.
