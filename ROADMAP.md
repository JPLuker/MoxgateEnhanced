# MoxgateEnhanced roadmap

**Architecture constraint: we DO NOT host the Moxgate website.** Every gameplay page is the live https://www.moxgate.com/ site. Local client tools alter presentation; the game and network functions remain Moxgate's.

## M1 — Unhosted desktop companion
- [x] Document the live-site-only architecture.
- [x] Chromium extension theme editor, with no separate site or hosted PWA.
- [x] Local-first color presets, image selection, import and export.
- [x] Extension content script providing conservative cosmetic styling.
- [x] Optional background-image exposure toggle, disabled by default.
- [x] Toolbar action to open Moxgate in a dedicated browser popup window.
- [x] Theme-format validation tests.
- [ ] Validate popup behavior in real Chrome/Chromium.
- [ ] Validate extension injection and gameplay states on live Moxgate.
- [ ] Accessibility and keyboard-only checks.

## M2 — Duels-era presentation
- [ ] Inspect Moxgate's homepage, game lobby, deckbuilder, and battlefield DOM.
- [ ] Theme-specific layouts, tabletop textures, phase/turn styling.
- [ ] Separate home/lobby/play styles with user-selectable theme intensity.
- [ ] Avoid intercepting gameplay state and reflowing click targets.
- [ ] Test responsive behavior and accessibility.

## M3 — Full local customization
- [ ] Separate menu, battlefield, card-zone, and overlay backgrounds.
- [ ] Crop, position, brightness, opacity, blur for locally supplied art.
- [ ] Per-element color picker and contrast checking.
- [ ] Named themes, themes per screen, reversible changes, backups.

## M4 — Installable client options (no hosting)
- [ ] Evaluate packaged desktop WebView wrapper to launch the live Moxgate origin with local enhancements.
- [ ] Evaluate Android native WebView shell as a separate package.
- [ ] Test session handling, account login, navigation, and external links.
- [ ] Ensure a normal PWA/browser-app install does not get confused with our independently branded native wrapper.
- [ ] Keep extension as low-maintenance desktop alternative.
- [ ] Packaging, build validation, and release distribution via GitHub.

## M5 — Incremental quality-of-life improvements
- [ ] Capture and prioritize requests from normal gameplay use.
- [ ] Add feature flags, emergency disable, compatibility checks.
- [ ] Regression tests for every supported Moxgate page.

## Non-goals and hard constraints
- No hosted MoxgateEnhanced website or GitHub Pages.
- No reverse proxy, third-party mirrored gameplay service, or recreated rules engine.
- No bundled extracted proprietary art; optional user images are locally stored.
- No blanket assertion of PWA ownership over the moxgate.com origin.
- Theme changes must be reversible; live gameplay safety comes first.
