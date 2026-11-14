# MoxgateEnhanced

An unofficial, local-first theme companion for [Moxgate](https://www.moxgate.com/). Moxgate remains responsible for gameplay, accounts, rules, and multiplayer; MoxgateEnhanced provides personal presentation controls.

## Architecture

- **PWA:** Installable launcher and theme workshop. Themes and uploaded pictures are stored locally in the browser (IndexedDB).
- **Chromium extension:** Loads the same theme workshop as its options page, persists settings in extension-local storage, and injects *cosmetic-only* changes into moxgate.com.
- **Portability:** Export a theme JSON from either client and import it into the other. PWA and extension storage are intentionally independent. No server or account sync.
- **No redistributed artwork:** Presets provide original CSS color and layout styling inspired by classic digital tabletop interfaces. No Wizards art, Duels game assets, logos, video, or music are packaged.

## Get started

### PWA launcher
Serve the repository over HTTPS (for example via GitHub Pages, with the branch root selected), or run a local HTTP server for development. Open the site, choose a preset, customize colors, upload a background image, and choose **Open Moxgate**. If supported, use the browser's **Install app** option.

**Note:** A PWA launcher cannot inject CSS into a cross-origin Moxgate tab. To apply a custom theme *inside Moxgate*, install the extension below.

### Desktop Chromium extension
1. Download or clone this repository.
2. Visit `chrome://extensions`, enable Developer mode, then choose **Load unpacked**.
3. Select the repository directory containing `manifest.json`.
4. Open the extension's **Details → Extension options** page.
5. Configure a theme; then open or refresh https://www.moxgate.com.

The extension intentionally requests site access only to moxgate.com and its www subdomain, plus local storage. It does not intercept sign-in credentials or modify game traffic. Initial styling is conservative, not a verified comprehensive Moxgate redesign.

### Transfer themes between clients
Choose **Export JSON** on one client, then **Import JSON** on another. Images are embedded in the exported file; this is an explicit user action and is never a server upload.

## Local data and safety

- Images are accepted as PNG, JPEG, or WebP and capped at 2 MB each for portability.
- Only colors and image data chosen by the user are retained; all storage is on the local device/browser profile.
- No external analytics, cloud sync, API keys, remote image downloads, or tracking.
- Remove the saved image or reset the theme from the editor. Browser/site-data clearing also deletes PWA local data.
- **Existing Moxgate functionality is not guaranteed to remain compatible with future DOM changes.** Test themed gameplay carefully.

## Attribution and scope

MoxgateEnhanced is an unofficial fan companion, not endorsed by Moxgate or Wizards of the Coast. Magic: The Gathering and related assets belong to their respective owners. It is not a fork of the Moxgate game or an alternate rules engine. Any third-party art should be provided by the user and used only with appropriate rights.

See [ROADMAP.md](ROADMAP.md) for milestones and constraints.
