# MoxgateEnhanced

An unofficial, **unhosted Chromium extension** that gives the ordinary [Moxgate](https://www.moxgate.com/) interface a more traditional Magic: The Gathering: *Duels of the Planeswalkers*-inspired visual style.

**We do not host, proxy, duplicate, or reimplement Moxgate.** The live game continues to operate on Moxgate's own servers.

## What it changes

- **Homepage and regular UI:** Navigation, colors, headings, card-panel frames, rounded corners, and ordinary menu actions.
- **Presets:** Stone Table, Molten Plane, Aether, and Night, plus a fully custom color palette.
- **Images:** Users may select their own PNG, JPEG, or WebP backdrop (maximum 2 MB), save it locally, and choose whether to display it on Moxgate.
- **Settings:** Click the extension toolbar icon to open **all controls in a compact popup**. No separate settings website or detour through Extension Details.
- **Launch:** The popup includes an **Open Moxgate** button to launch the live site in a normal browser tab, so the extension toolbar remains accessible.

**Gameplay is not restyled.** The content script explicitly excludes the `/solo` battlefield, multiplayer sessions, draft, conquest, and other routes that represent active games. Themes are only applied on selected known non-gameplay routes (home, deck browser, sets, guides, etc.). Unknown routes are left alone until verified.

## Install / update (desktop Chrome, Chromium, Brave)

1. Download or clone the repository.
2. Go to `chrome://extensions` (or `brave://extensions`).
3. Turn on **Developer mode**.
4. Choose **Load unpacked** and select the folder that contains `manifest.json`.
5. Pin **MoxgateEnhanced** to your browser toolbar.
6. **Click the extension icon**: theme controls open in-place. Change a preset, pick colors, or choose your own artwork.
7. Open Moxgate normally or click **Open Moxgate** inside the popup. The site opens in a standard tab, keeping the extension icon within reach.

After updating the local repository, click **Reload** on the extension card. Site pages should reflect settings changes without requiring a gameplay refresh. If a change does not appear, refresh the site.

## Privacy

- Themes and images are stored locally in `chrome.storage.local`. They are not uploaded to MoxgateEnhanced servers (there are none).
- Displaying uploaded images *inside the third-party Moxgate page* is **off by default**. If turned on, those images can potentially be inspected by page scripts. Avoid sensitive/personal images.
- Theme JSON exports include selected image data. Treat export files as private if they contain personal pictures.
- MoxgateEnhanced does not inspect passwords, game state, deck contents, or network traffic.
- No telemetry, analytics, cloud sync, or bundled proprietary artwork.

## Current state

**Version 0.2.0: implementation committed, not yet visually verified in a real browser.** Static JavaScript/manifest and isolated route checks have been performed. The homepage-specific styling still requires testing against Moxgate's live DOM; some Tailwind/class-name selectors may not match after site updates. The first pass deliberately avoids destructive layout changes.

The extension toolbar opens `popup.html`. There is no `options_ui`, no GitHub Pages deployment, no extra hosted website, and no standalone installer yet.

For dependency-free regression tests, run:

```sh
node --test tests/*.test.mjs
```

## Roadmap

See [ROADMAP.md](ROADMAP.md). Immediate priorities are the homepage/menu redesign and popup UX, not a new battlefield interface.

## Attribution

MoxgateEnhanced is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC. Not affiliated with Moxgate.
