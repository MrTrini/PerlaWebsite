# Perla Lutchman — perlalutchman.com

Personal-brand and luxury real estate website for Perla Lutchman, a Miami real estate
agent affiliated with Avanti Way Realty LLC.

**Live:** https://perlalutchman.com — deployed from this repo via Netlify. Pushing to
`main` builds and deploys in 1–2 minutes.

## Stack

Plain static HTML, CSS and JS. No build step, no framework, no dependencies.

Local preview:

```
python -m http.server 8000
```

## Structure

- `index.html` — homepage (luxury real estate)
- `branding.html` — brand strategy & consulting page (noindex, not in the sitemap)
- `areas/<slug>/` — 6 Miami neighbourhood guides
- `developments/<slug>/` — 12 new-development guides, each with a photo gallery
- `thanks/` — form success page (noindex); fires the GA4 conversion event
- `assets/areas.css` — shared styles for every sub-page (the homepage carries its own inline)
- `assets/nav.js` — mobile nav; `assets/gallery.js` — gallery lightbox
- `sitemap.xml`, `robots.txt`, `llms.txt` — indexing and AI-assistant discovery
- `netlify.toml` — redirects and 404 guards
- `tools/gen-handoff.py` — regenerates `HANDOFF.md`; run by GitHub Actions on every push

## Adding a page

Six things have to change together, or the site becomes inconsistent:

1. The page itself
2. The homepage tile
3. The homepage `ItemList` schema
4. `sitemap.xml`
5. `llms.txt`
6. The GA4 snippet and an inquiry form on the new page

`HANDOFF.md` runs these as automated consistency checks and will flag anything missed.

## Forms and analytics

All 19 pages POST to Netlify Forms under a single form named `contact`, with a hidden
`page-source` field recording which page produced the lead. Success redirects to `/thanks/`.

GA4 (`G-3PX7D1X143`) is in the `<head>` of every page, after the charset and viewport meta.
