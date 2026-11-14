# MoxgateEnhanced handoff

## Product
Unhosted browser extension that themes the regular Moxgate interface while leaving live gameplay unchanged. Toolbar icon opens popup settings for presets, colors and local artwork.

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
