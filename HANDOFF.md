# Perla Website: Project Handoff

**Read this file first at the start of every session.** Everything needed to resume work
without redoing setup.

This file has two halves:

- **Hand-written sections** (below) hold intent, workflow, and policy. Edit these freely.
- **The auto-generated block** at the bottom holds repo facts. It is rewritten by
  `tools/gen-handoff.py` on every push to `main`. Do not hand-edit it.

---

## 1. What this is

Personal-brand and luxury real estate website for **Perla Lutchman**, Miami real estate agent.

- **GitHub repo:** https://github.com/MrTrini/PerlaWebsite (owner `MrTrini`, branch `main`).
  **This repo is PRIVATE** (made private 2026-07-25 so this handoff and the project notes
  are not world-readable). Netlify deploys private personal repos on the free plan.
- **Live site (canonical):** https://perlalutchman.com, deployed via **Netlify** from this repo.
  Pushing to `main` triggers a build and deploy in roughly 1 to 2 minutes.
- **Netlify still publishes the repo root**, private repo or not. Any non-dotfile is a public
  URL on perlalutchman.com unless `netlify.toml` blocks it. `README.md` returns 200 today.
  `HANDOFF.md` and `tools/*` are 404-guarded there. **Keep that guard.**
- **GitHub Pages mirror:** https://mrtrini.github.io/PerlaWebsite/ stops serving once the repo
  is private (Pages from a private repo needs a paid plan). That is fine and intended, it was
  a non-canonical duplicate. All canonicals and the sitemap point to perlalutchman.com.

Two offerings under one name: Luxury Real Estate (the homepage) and Brand Strategy &
Consulting (`branding.html`).

## 2. Stack

Plain static HTML, CSS, and JS. **No build step, no framework, no package.json.**

- Homepage carries its CSS inline. All sub-pages share `assets/areas.css`.
- Three small vanilla IIFEs: `assets/nav.js` (hamburger), `assets/gallery.js` (lightbox),
  and an inline block in `index.html` (year, scroll reveal, contact form).
- Local dev: `python -m http.server 8000` from the repo root. Nothing to install.

## 3. Design system

Tokens are duplicated in `index.html` inline CSS and `assets/areas.css`. **Keep them in sync
by hand.** There is no CSS build.

```
--bar:#2C2626  --bg:#FDF6F3  --bg2:#F1F1F1  --title:#E6E1C6
--ink:#2C2626  --muted:#6E6360  --line:#E3D7D2
--title-f:'Tenor Sans'  --body:'Montserrat' (300,400,500,600)
```

- Signature device: `.bar-label`, a dark rectangle with cream uppercase letterspaced text
  above every section title. Do not drop it.
- All section titles are uppercase. Fluid type via `clamp()` throughout.
- Mobile nav breakpoint 940px, full-screen slide-in panel.
- **No em dashes in copy.** Deliberate, set in commit `23bf1c1`.

## 4. Content and SEO rules

Adding or removing a page means touching **five** things. Miss one and answer engines get an
inconsistent picture of the site:

1. The page itself
2. The homepage tile
3. The homepage `ItemList` schema
4. `sitemap.xml`
5. `llms.txt`

New pages also need the GA4 snippet (section 6) and, if they are a landing page, an inquiry
form (section 7). The auto-generated consistency checks below will catch missing GA4 tags.

Every development page must carry the legal disclaimer:

> Details reflect 2025-2026 developer and market reporting and are subject to change.
> Provided for information only, not investment advice. Not affiliated with or endorsed by
> the developer.

## 5. Business facts (keep consistent everywhere)

- Phone / WhatsApp: **(561) 538-0802** (`+1-561-538-0802`, `https://wa.me/15615380802`)
- Contact email: **concierge.perlalutchman@gmail.com**
- Brokerage: **Avanti Way Realty LLC**
- Instagram `@perla.lutchman` / Facebook `/PerlaLutchman` / TikTok `@perla.lutchman`
- **No LinkedIn.** Removed deliberately in commit `23bf1c1`.
- MBA, 12+ years entrepreneurial and business experience. From Venezuela, raised in
  Trinidad & Tobago, based in Miami.
- Branding journey stages: Vision, Launch, Momentum, Growth, Legacy.

## 6. Analytics

- **GA4 Measurement ID: `G-3PX7D1X143`.** The standard `gtag.js` snippet sits in every page's
  `<head>`, immediately after the `viewport` meta (it must come after `charset`, never before).
- **Any new page must get the snippet** or it will silently report nothing. The consistency
  checks below flag pages that are missing it and flag more than one GA4 ID being in use.
- **Conversion tracking:** `/thanks/` fires `gtag('event','generate_lead', {form_id:'contact'})`.
  That page is only reachable after a successful Netlify form POST, so it is a trustworthy
  signal. **Mark `generate_lead` as a Key Event in GA4** (Admin > Events) or it will not count
  as a conversion in reports.
- Still to do: submit the sitemap in Google Search Console, and set up a Google Business
  Profile for local SEO.

## 7. Known weak points

- ~~Contact form is `mailto:` only.~~ **RESOLVED 2026-07-25.** All 19 forms now POST to
  **Netlify Forms** (one form named `contact`, so every lead lands in a single inbox) and
  redirect to `/thanks/`. A hidden `page-source` field records which of the 19 pages the lead
  came from. Honeypot field `bot-field` only, no CAPTCHA. Free tier is **100 submissions per
  month** across the whole site; going over means silently dropped leads, so watch the Netlify
  Forms dashboard as traffic grows.
- **No `404.html`.** Netlify serves its own generic page, which has no nav back into the site.
- **Social previews are likely blank.** `og:image` is `.webp` on every page, there is no
  `og:url` on the homepage, and no `twitter:card` anywhere. WhatsApp is the primary contact
  channel on this site and renders webp previews inconsistently. Needs one 1200x630 JPG.
- **~4 MB of unused images** in `assets/images/`, including `brand-backdrop.png` at 1.3 MB and
  area tiles for Doral and Biscayne Park that have no pages.
- **Gallery resolution is inconsistent.** Parkside ships 1920px shots, Domus ships 640x400,
  which looks soft on a modern screen. Standardize around 1600px.
- **`branding.html` is orphaned.** It is `noindex`, out of the sitemap, and linked only from
  the redirected `landing.html` and the Standard Midtown development page. Either give it a
  purpose or retire it.
- Nav toggle logic is duplicated in `index.html` inline and in `assets/nav.js`.

## 8. In progress / not yet committed

- **`search.html`** exists locally in `WEBSITE/site/` but is NOT in the repo. IDX property
  search page shell, styled, with an injection-point comment for the widget embed code.
  Before committing: its nav links still point to the old `real-estate.html`, update them
  to `/`, set the canonical to perlalutchman.com, and add the GA4 snippet.
- **IDX / MLS plan (Path A, embed widget, keep current site):** Perla is a MIAMI REALTORS
  (MIAMIRE) member. IDX is a free member benefit via **iHomefinder**. Perla must activate
  iHomefinder IDX in the MIAMI member portal, sign the IDX agreement (broker Avanti Way plus
  agent), set the site URL, and generate the embed code. She hands the embed code over, then
  it gets pasted into `search.html`'s injection point, "Property Search" is added to the nav,
  and it ships.
  **Do NOT log into her MLS account or sign agreements on her behalf.**

## 9. Local folder and sandbox

Local folder details, sandbox constraints, and token handling live in **`CLAUDE.md` in the
connected OneDrive folder**, which is never committed. See that file. Summary only:

- The OneDrive mount can read and write but **cannot delete**, so git commit/push cannot run
  inside `WEBSITE/site`. Clone to `/tmp`, work there, push from there.
- The mirror at `WEBSITE/site/` can only accumulate files and will drift silently. The repo is
  the source of truth. Re-clone rather than trusting the mirror.
- OneDrive sync is bidirectional and **will overwrite local edits** with an older copy from
  another machine. It has already happened once.

## 10. Push workflow

1. Read the PAT (see `CLAUDE.md`).
2. `cd /tmp && git clone https://MrTrini:<PAT>@github.com/MrTrini/PerlaWebsite.git`
3. `git config user.name "Justin Moses"; git config user.email "jmoses@barry.edu"`
4. Edit or add files in `/tmp/PerlaWebsite`.
5. `git add -A && git commit -m "<clear message>" && git push origin main`
6. Mirror changed files back into `WEBSITE/site/` (copy and overwrite only, never rely on delete).
7. Verify: `git status` clean, HEAD == origin/main, then spot-check perlalutchman.com
   **with a cache-buster** (`?cb=<timestamp>`). A plain fetch has returned HTML two commits
   stale.

The handoff block below updates itself on push. Nothing to do by hand.

## 11. GitHub token (PAT)

Push auth is a fine-grained PAT. **Handling details are deliberately not in this file.** See
`CLAUDE.md` in the connected OneDrive folder for where it lives, how to read it, redaction,
and rotation.

Required PAT permissions on `MrTrini/PerlaWebsite`:

- **Contents: Read and write** — site files
- **Workflows: Read and write** — required for anything under `.github/workflows/`. Without
  it, GitHub rejects the push outright with "refusing to allow a Personal Access Token to
  create or update workflow ... without `workflow` scope".

Now that the repo is private, a token is required to clone as well as to push.

## 12. Operating rules

- Never push without Justin confirming what to change first.
- Always verify after a push: `git status` clean, HEAD == origin, live spot-check with a
  cache-buster.
- Verify visual changes in a real browser. The headless screenshot tool often fails to paint
  AVIF/WebP even when images load. Confirm with JS (`naturalWidth`) rather than trusting a
  blank screenshot.
- Stray files that cannot be deleted from the mount are harmless. Justin removes them in Windows.
- Communication style: direct, concise, no filler. Flag flaws plainly.

---

<!-- AUTOGEN:START -->

<!-- Everything in this block is generated by tools/gen-handoff.py.
     Do not hand-edit. Edits will be overwritten on the next push to main. -->

## Repo State (auto-generated)

- Generated: `2026-07-25 16:37 UTC`
- `main` HEAD: `d1c164d` (2026-07-25) docs: auto-update HANDOFF.md [skip netlify]
- Total commits: 33
- Area pages: **6** | Development pages: **12** | Galleries: **6** (111 photos)
- Analytics: G-3PX7D1X143 on 22/22 pages

### Root files

- `branding.html` (383 lines) Perla Lutchman | Brand Strategy &amp; Consulting
- `index.html` (588 lines) Perla Lutchman | Luxury Real Estate, Miami
- `landing.html` (91 lines) Perla Lutchman | Brand Strategy &amp; Luxury Real Estate — Miami

### Netlify redirects

- `/real-estate.html` -> `/` (301)
- `/landing.html` -> `/` (301)
- `/HANDOFF.md` -> `/404.html` (404)
- `/tools/*` -> `/404.html` (404)

### Hidden homepage sections

- What's New / Happening in Miami

### Area pages

| Slug | URL | Schema |
|---|---|---|
| `brickell` | `/areas/brickell/` | BreadcrumbList, FAQPage, RealEstateAgent |
| `coral-gables` | `/areas/coral-gables/` | BreadcrumbList, FAQPage, RealEstateAgent |
| `downtown-miami` | `/areas/downtown-miami/` | BreadcrumbList, FAQPage, RealEstateAgent |
| `edgewater` | `/areas/edgewater/` | BreadcrumbList, FAQPage, RealEstateAgent |
| `miami-beach` | `/areas/miami-beach/` | BreadcrumbList, FAQPage, RealEstateAgent |
| `wynwood` | `/areas/wynwood/` | BreadcrumbList, FAQPage, RealEstateAgent |

### Development pages

| Slug | URL | Gallery | Schema |
|---|---|---|---|
| `619-brickell-nobu` | `/developments/619-brickell-nobu/` | **none** | ApartmentComplex, BreadcrumbList, FAQPage |
| `botanic-residences` | `/developments/botanic-residences/` | **none** | ApartmentComplex, BreadcrumbList, FAQPage |
| `domus-brickell-park` | `/developments/domus-brickell-park/` | 15 photos | ApartmentComplex, BreadcrumbList, FAQPage |
| `elle-residences-miami` | `/developments/elle-residences-miami/` | 16 photos | ApartmentComplex, BreadcrumbList, FAQPage |
| `frida-kahlo-wynwood` | `/developments/frida-kahlo-wynwood/` | **none** | ApartmentComplex, BreadcrumbList, FAQPage |
| `nomad-residences-wynwood` | `/developments/nomad-residences-wynwood/` | 22 photos | ApartmentComplex, BreadcrumbList, FAQPage |
| `palm-tree-residences` | `/developments/palm-tree-residences/` | **none** | ApartmentComplex, BreadcrumbList, FAQPage |
| `parkside-brickell` | `/developments/parkside-brickell/` | 22 photos | ApartmentComplex, BreadcrumbList, FAQPage |
| `st-regis-residences-brickell` | `/developments/st-regis-residences-brickell/` | **none** | ApartmentComplex, BreadcrumbList, FAQPage |
| `the-standard-residences-brickell` | `/developments/the-standard-residences-brickell/` | **none** | ApartmentComplex, BreadcrumbList, FAQPage |
| `the-standard-residences-midtown` | `/developments/the-standard-residences-midtown/` | 16 photos | ApartmentComplex, BreadcrumbList, FAQPage |
| `viceroy-brickell-residences` | `/developments/viceroy-brickell-residences/` | 20 photos | ApartmentComplex, BreadcrumbList, FAQPage |

### Consistency checks

- **llms.txt missing 5 page(s):** `619-brickell-nobu`, `botanic-residences`, `frida-kahlo-wynwood`, `palm-tree-residences`, `st-regis-residences-brickell`
- **development pages without a gallery (6):** `619-brickell-nobu`, `botanic-residences`, `frida-kahlo-wynwood`, `palm-tree-residences`, `st-regis-residences-brickell`, `the-standard-residences-brickell`
- **README.md references `real-estate.html`, which does not exist**

### Recent commits

```
d1c164d 2026-07-25 docs: auto-update HANDOFF.md [skip netlify]
cd524f7 2026-07-25 Hero: shift crop origin left so Perla is not cut off on laptop screens
247567b 2026-07-25 docs: auto-update HANDOFF.md [skip netlify]
90beb8e 2026-07-25 Replace mailto contact form with Netlify Forms across all 19 pages
cc971ef 2026-07-25 docs: auto-update HANDOFF.md [skip netlify]
03a829c 2026-07-25 Update GitHub Actions to use latest versions
eabe339 2026-07-25 docs: auto-update HANDOFF.md [skip netlify]
eb48347 2026-07-25 Add workflow to auto-update HANDOFF.md on changes
1316432 2026-07-25 Add GA4 (G-3PX7D1X143) to all pages + self-updating HANDOFF.md tooling
6838164 2026-07-24 Hide 'What's New / Happening in Miami' homepage section + nav link (placeholder; pending direction)
46b78b5 2026-07-24 Add 5 new development pages (St. Regis, 619 Brickell/Nobu, Palm Tree, Botanic, Frida Kahlo); repoint homepage tiles, extend ItemList schema, update sitemap
0ad1e3c 2026-07-24 SEO: 301-redirect legacy landing.html -> / (retire old combined page); keep sitemap real-estate-focused (remove branding.html for now)
```

<!-- AUTOGEN:END -->
