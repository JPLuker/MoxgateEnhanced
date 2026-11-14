# MoxgateEnhanced handoff

## Product
Unhosted browser extension that themes the regular Moxgate interface while leaving live gameplay unchanged. Toolbar icon opens popup settings for presets, colors and local artwork.

## Latest v0.3.1 work, 2026-11-14
- The user's v0.2.3 screenshot showed that borders/fonts alone were not the requested redesign.
- `home-portal.js`: mounts a two-panel console-style homepage, selects Solo/Multiplayer/Draft, reuses large live-page artwork, delegates the start action to original Moxgate controls, and offers an original-home fallback.
- `home-portal.css`: responsive console layout, original hero strip hidden only when the replacement mounts.
- `content.js` `markHome()` returns original panels and actions; `refresh()` mounts console only on recognized homepage and `clear()` removes it on game routes.
- `popup.html`/`popup.css` preview the new layout; `app.js` reports active/fallback/unavailable status.
- `tests/home-portal.test.mjs` checks selection, native clicks, repeated scan, recovery and incomplete layouts. `tests/fixtures/home.html` renders in Chromium at 390×844, 1280×720 and 1920×1080.
- CI run 43627033069: **24 tests passed**, 3 viewport captures produced and visually reviewed.
- The screenshots are a representative fixture, **not** live Moxgate. Actual Vivaldi integration and hero artwork remain unverified.
- v0.3.0 prerelease was generated during integration; v0.3.1 is the complete follow-up candidate. Never overwrite released tags or assets.
- Next: verify v0.3.1 in live Vivaldi. If the popup reports “console menu unavailable,” inspect source cards and row hierarchy before changing selectors. Check /solo gameplay remains untouched.
- GitHub issues #1 and #2 remain open until acceptance.


- v0.3.1 **UNTESTED** release is published and download reverified: https://github.com/JPLuker/MoxgateEnhanced/releases/tag/v0.3.1-untested-chromium ; CI run 43627632164 passed 24 tests, rendered three screenshots, and verified the downloaded ZIP against SHA256SUMS.

## Latest v0.2.3 work, 2026-11-14
- User screenshot of v0.2.2 established 6 homepage sections detected and gold styling visibly applied, but nested/inset gold rectangles and purple action controls remained.
- `content.js` `findPanel()` now walks to the widest eligible single-card ancestor instead of picking the first inner wrapper. Regression test reproduced failure before the fix.
- `content.js` `findAction()` now handles nested text spans/div controls, not only semantic buttons/links. A second regression test reproduced this gap before the fix.
- `app.js` now displays panel and action match counts. `tests/scope.test.mjs` covers both bugs.
- v0.2.3 UNTESTED release published and checksummed: https://github.com/JPLuker/MoxgateEnhanced/releases/tag/v0.2.3-untested-chromium . GitHub Actions run 43615193780 passed 19 tests, 0 failed, and re-downloaded the ZIP to verify SHA-256. The first release candidate failed on a DOM-fixture counting bug, then passed after correcting its mock. Do not describe the visual correction as accepted until tested in a real browser.

## Latest correction, 2026-11-14
- **v0.2.2** UNTESTED prerelease: https://github.com/JPLuker/MoxgateEnhanced/releases/tag/v0.2.2-untested-chromium
- GitHub Actions run `43611231778`: 16 passed, 0 failed; ZIP and checksums verified after release.
- `content.css` is a static extension-injected stylesheet (no in-page style tag), and `content.js` discovers homepage sections by heading/text and sets data attributes.
- `popup.css` restores 398 CSS-pixel popup width; `app.js` shows matched section count from the active page.
- **Do not claim live appearance fixed:** no actual connected-browser DOM/render test available in this session.
- Open issues: #1 visual homepage unchanged, #2 popup too narrow.

## Current status, 2026-11-14
- Manifest version source: `manifest.json`.
- Popup: `popup.html`, `popup.css`; state/events `app.js`.
- Page scope and injected CSS: `content.js`. Gameplay routes should never be styled.
- Packaging and validation: `scripts/verify-extension.cjs`, `.github/workflows/release.yml`.
- Release: `v<manifest version>-untested-chromium`. ZIP and SHA256SUMS.txt. Github Actions produces a prerelease, not a stable tested release.
- No real-browser visual verification yet; user reports previous styling did not visibly change homepage. Version 0.2.1 is deliberately labeled UNTESTED.

## Next work for agent
1. v0.2.1 release publication verified: https://github.com/JPLuker/MoxgateEnhanced/releases/tag/v0.2.1-untested-chromium ; GitHub Actions run 43609679046 passed all 14 tests, re-downloaded ZIP, and validated SHA-256. Future version changes should create new untested prereleases through .github/workflows/release.yml.
2. Inspect the live Moxgate homepage DOM and computed styles; verify that data-mge-tile appears on three hero panels and inspect a real before/after screenshot. Representative DOM tests are in tests/scope.test.mjs.
3. Keep screenshots/render checks and live gameplay exclusions. Do not fake a successfully themed screenshot.
4. Continue roadmap, update changelog, testing evidence and issues with each change.

## Hands-on list for Joseph
A few tests for the untested ZIP are in TESTING.md. CI artifact exists for v0.2.2. Ask for a focused real-browser check: homepage difference, popup section count/width, and /solo unchanged.

## Blockers / known limitations
No connected browser session was available to inspect the live Moxgate DOM. The v0.2.1 publisher ran successfully on GitHub Actions. Future runs still require Actions access. Lukercorp's organization runner does not automatically serve JPLuker's personal repos.
