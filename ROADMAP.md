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

## M2 — Proper installable client (without hosting)
- [ ] Evaluate packaged desktop Chromium/WebView wrapper that opens the **live** Moxgate origin.
- [ ] Ensure locally applied themes work inside the wrapper without cross-origin iframe tricks.
- [ ] Test Moxgate login, sessions, navigation, multiplayer, and browser protections.
- [ ] Package installer and portable builds for Windows/Linux first.
- [ ] Evaluate Android WebView shell as a separate installable APK.
- [ ] Preserve browser extension as lighter-weight option.

## M3 — Duels-era presentation
- [ ] Inspect Moxgate homepage, game lobby, deckbuilder, and battlefield DOM.
- [ ] Theme-specific layouts, tabletop textures, phase/turn styling.
- [ ] Separate home/lobby/play styles with user-selectable theme intensity.
- [ ] Avoid intercepting gameplay state and reflowing click targets.
- [ ] Test responsive behavior and accessibility.

## M4 — Full local customization
- [ ] Separate menu, battlefield, card-zone, and overlay backgrounds.
- [ ] Crop, position, brightness, opacity, blur for locally supplied art.
- [ ] Per-element color picker and contrast checking.
- [ ] Named themes, themes per screen, reversible changes, backups.

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
