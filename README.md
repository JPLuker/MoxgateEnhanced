# MoxgateEnhanced

An unofficial **unhosted client companion** for [Moxgate](https://www.moxgate.com/).

**MoxgateEnhanced never hosts, proxies, mirrors, or reimplements the Moxgate website.** It opens the **live Moxgate service** and applies user-selected cosmetic enhancements locally.

## How this works (desktop Chromium)

The initial release is a self-contained Chromium extension. It provides:

- A **MoxgateEnhanced** toolbar action: click to launch the *real* https://www.moxgate.com/ in a dedicated app-like browser window.
- An extension-owned **theme workshop** (Extension options) with classic digital-tabletop-inspired presets, native color pickers, local image upload, and import/export.
- Cosmetic-only content-script styling on Moxgate pages, with a master disable switch.
- A separate, opt-in switch to expose a user-selected background image to the Moxgate webpage. Off by default.

Moxgate runs normally on its own servers, with its own login, multiplayer, cards, and rules engine. We do not copy the website or host any application backend.

### Install and launch

1. Download or clone this GitHub repository.
2. In desktop Chrome/Chromium, open `chrome://extensions`; enable **Developer mode**, then **Load unpacked** and choose this folder.
3. Pin the **MoxgateEnhanced** extension to your browser toolbar.
4. Click the toolbar icon. This opens live Moxgate in its own minimal browser window.
5. For personal themes, open **Extensions → MoxgateEnhanced → Details → Extension options**. Save your changes, then refresh Moxgate if necessary.

The extension options run from the installed browser extension; **there is no GitHub Pages deployment, separate website, or hosted theme editor**.

### What about a PWA?

An ordinary PWA cannot acquire ownership of `moxgate.com` or inject CSS into a cross-origin site. Installing *Moxgate itself* as a browser app is possible through Chrome's **Install page as app** action, but the installed site's branding and extension compatibility depend on browser/platform behavior and must be verified. We do not pretend our companion is a true independently installable PWA.

For a fully branded **MoxgateEnhanced** standalone desktop/mobile app that renders the real site and supports local overlays, a packaged WebView-style native wrapper is the appropriate separate roadmap. It still would not host Moxgate. We will research platform behavior before selecting an app-shell framework.

## Artwork and local privacy

- The extension ships **no Wizards of the Coast or Duels of the Planeswalkers extracted artwork**. Users can provide their own suitable art files.
- PNG/JPEG/WebP images up to 2 MB are stored locally in the browser extension's storage, not uploaded to a project server.
- **Important:** If the optional “Display uploaded image on Moxgate pages” switch is enabled, image data becomes part of the third-party page's styling and may be readable by its scripts. Keep it off for sensitive images.
- Exported JSON may contain a copy of the artwork. Treat theme exports as personal files.
- No analytics, third-party cloud sync, remote asset downloads, or collection of Moxgate passwords.

## Developing and testing

Run `node --test tests/theme.test.mjs` for local theme-format validation.

**Status:** Extension source is implemented and basic syntax/validation checks have passed. The current Moxgate DOM, live gameplay behavior, popup-window launch, and theme appearance have **not** been tested end-to-end in a real browser. This is not a release claim.

See [ROADMAP.md](ROADMAP.md).

## Fan content notice

MoxgateEnhanced is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC. Not affiliated with Moxgate.
