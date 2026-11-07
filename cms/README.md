# Ang Layag editorial CMS (Google Sheets + private media)

**Editorial spreadsheet:** https://docs.google.com/spreadsheets/d/1E9yimmIRA05aoZyiVKWr60pC7D-yyRZq0aYEusDj4AY/edit

The public website is configured to support a published-only Apps Script feed. Until the feed is deployed, `index.html` has `editorialFeedUrl:''` and the existing site remains in demo mode.

## Required first-time setup

1. Download the **Ang Layag CMS Installation Package** supplied in the ChatGPT conversation. It includes full `Code.gs`, `UploadSidebar.html`, `site-feed.js` and setup instructions.
2. Open the editorial spreadsheet → **Extensions → Apps Script**.
3. Replace `Code.gs` with the complete source from the package.
4. Create an HTML file named `UploadSidebar` and paste `UploadSidebar.html`.
5. Save and run `setupAngLayag()` once in Apps Script. Approve permissions from your Google account.
6. Refresh the spreadsheet. Choose **Ang Layag → Upload article / writer photo**.
7. Review articles, writer biographies and image rights. Set approved article/writer/media statuses to **Published**.
8. In Apps Script choose **Deploy → New deployment → Web app**. Select **Execute as Me** and **Who has access: Anyone**. Copy the public URL ending in `/exec`.
9. In repo `index.html`, set `SITE_CONFIG.editorialFeedUrl` to that `/exec` URL and commit.

## Editorial workflow

- **Articles**: headline, subtitle, body, writer ID, hero media ID, date, featured status, publication status.
- **Writers**: full name, role, bionote, portrait media ID, status.
- **Media Library**: uploaded optimized JPEG file references, captions, credits, alt text and approval status.
- **Publishing**: editorial selection of the four homepage leads.
- **Start Here**: in-sheet instructions.

The spreadsheet and original Drive images are private. Only articles with Status=Published are returned by the public web app; images are served only when Media Library Status=Published **and** the image is referenced by published content. Main Editorial remains an institutional piece credited to the editorial board.

The website adapter `cms/site-feed.js` is intentionally dormant until its deployment URL is configured. If a feed becomes unavailable, the website retains its existing demo view.

This small-school CMS uses a controlled public Apps Script JSONP API and base64 web-sized images. It is not designed for high-volume news traffic; a dedicated image CDN would be preferable at scale.

## Source documentation

- Google Apps Script Content Service: https://developers.google.com/apps-script/guides/content
- Apps Script sidebar calls: https://developers.google.com/apps-script/guides/html/reference/run
