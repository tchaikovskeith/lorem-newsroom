# LOREM IPSUM — Student Newsroom Mock-up

A polished, responsive, **static newsroom website** built from the user-provided `lorem-news-site.zip` wireframe. The layout retains **Home, News, Editorial, Feature, Sports, About Us** and **three clickable article pages per section** (15 total), while adding a newsroom-style masthead, lead-story hierarchy, latest headlines, article reading layouts, mobile menu, search, a theme toggle, bookmarking, sharing, printing, and article reading progress.

## Preview / run

No installation or build required. Open `index.html` in a browser or serve the directory using:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Content is placeholder-only

All articles and descriptions use *Lorem ipsum* filler. Image boxes are gray (`#D9D9D9`) and carry aspect-ratio labels. This site is a **design mock-up**, not a source of published news. Functional navigation, search, bookmarks, printing, and theme controls are for demonstration. No real publication branding, editorial reporting, or subscription backend is provided.

## Editing articles

Open `index.html`, then find `const ARTICLE_DATA =`. Each section (`news`, `editorial`, `feature`, `sports`, `about`) contains three `[headline, excerpt]` pairs. The router builds pages for:

- `#home`
- `#news`, `#editorial`, `#feature`, `#sports`, `#about`
- `#news-1`, `#news-2`, `#news-3` (and the equivalent for all sections)
- `#search?q=lorem`

The `PARAGRAPHS` array contains demonstration article copy. Replace placeholder editorial content with approved materials before any public-news use. For each image, replace the `<div class="placeholder">` representation in the `media()` helper with appropriately licensed photos, with corresponding alt text and credit, as part of a future production revision.

## Deploy to a NEW GitHub Pages repository

1. In GitHub, select **New repository**, name it `lorem-newsroom`, set visibility to **Public**, and create it without auto-generating a README (this ZIP already contains one).
2. Choose **Add file → Upload files** and upload the **contents of this folder**, including `index.html`, `.nojekyll`, and `README.md` (do not upload the enclosing folder itself). Commit.
3. Open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, **main**, **/(root)**, and **Save**.
4. Once GitHub Pages deployment completes, your URL should be `https://tchaikovskeith.github.io/lorem-newsroom/` (provided the repository is created under `tchaikovskeith` with that exact name).

This project is independent of `tchaikovskeith/keith-layson` and does not alter your TLN Training Quest site.

## Tech

- HTML5, CSS3, vanilla JavaScript — no build tools or frameworks.
- Google Fonts are optional; system fallbacks are supplied.
- Stored bookmark and theme preferences use browser localStorage only.
- Fully responsive down to a 390px viewport, with accessible labels and keyboard focus states.