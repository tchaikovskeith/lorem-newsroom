# Ang Layag — Maaasahan. Mapanindigan. Makatotohanan.

**Ang Layag** is a mobile-responsive Filipino newsroom mock-up for GitHub Pages. Navy (#0b1f3b and #0f4c81), metallic gold (#d4af37), and off-white (#f3efe6) define the design. It retains 15 Lorem Ipsum demonstration stories and gray photo placeholders from the supplied wireframe.

## Pages and content

- **Home** — only four featured stories: the main Balita, first Tampok, main Pananaw, and main Pampalakasan; plus regional weather and a TikTok feature.
- **Balita** — three articles, an optional embedded public X timeline, and a clearly labeled ad placeholder.
- **Pananaw** — three articles, a sample local-browser poll, and an original three-panel demo comic.
- **Tampok** — three articles, **Alam Mo Ba?**, and **Sa Araw na Ito** (historical story intentionally awaits editorial verification).
- **Pampalakasan** — three articles and an embed-ready YouTube play-by-play video slot.
- **Tungkol sa Amin** — the publication's three stated values and example editorial information.
- All article cards include **Basahin pa**, leading to a full story view. Search, share, save, print, dark mode, and mobile navigation remain.

## Add actual TikTok, live X posts, game footage and a public poll

Find `const SITE_CONFIG = {` inside `index.html` and enter the public links:

```js
const SITE_CONFIG = {
  tiktokVideoUrl:'', // public TikTok post, e.g. https://www.tiktok.com/@account/video/1234567890123456789
  xProfileUrl:'',    // public X profile, e.g. https://x.com/account
  sportsVideoUrl:'', // YouTube watch, youtu.be or Shorts URL of game footage
  publicPollUrl:''   // Google Forms URL for actual public polling
};
```

The website does **not** invent a creator's TikTok, an X account, or game footage. These integrations remain clearly labeled placeholders until configured. Once URLs are supplied, TikTok uses its official embedded player, X uses an embedded public profile timeline, the YouTube clip plays within Pampalakasan, and public voting links to the selected form.

**Poll limitation:** Without a Google Forms URL, voting is only a local `localStorage` demonstration. It does not aggregate or publish a public vote total. Publish a proper Google Form to accept actual responses.

## Weather, facts and ads

- The Home weather selector fetches current weather-model data from [Open-Meteo](https://open-meteo.com/en/docs) without a key; default city is San Fernando, La Union, with other Region I selections. It is **not** an official PAGASA warning.
- **Sa Araw na Ito** displays today's Philippine date but requires a fact-checked historical entry and source before publication.
- **Komiks** uses original demonstration dialogue. The ad area is a 300×250 sample, not a real sponsor.
- Headlines, text, dates, bylines, and photos are demonstrations. Replace them before treating the site as a genuine publication.

## Editing and publishing

The source is a static `index.html` with no Python server, package manager or build step. Edit `ARTICLE_DATA` for headings and excerpts and `PARAGRAPHS` for demo body text. When preparing actual publication stories, give each article its own verified reporting, references, writer credits, images, publication date and full body.

For GitHub Pages: **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Changes committed to `main/index.html` deploy once GitHub Pages is enabled. The repository's `.nojekyll` can stay.

Reference documentation: [TikTok Embed Player](https://developers.tiktok.com/docs/en/embed-player), [X embedded timelines](https://help.x.com/en/using-x/embed-x-feed).
