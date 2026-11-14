# MoxgateEnhanced handoff

## Product
Unhosted browser extension that themes the regular Moxgate interface while leaving live gameplay unchanged. Toolbar icon opens popup settings for presets, colors and local artwork.

## Current status, 2026-11-14
- Manifest version source: `manifest.json`.
- Popup: `popup.html`, `popup.css`; state/events `app.js`.
- Page scope and injected CSS: `content.js`. Gameplay routes should never be styled.
- Packaging and validation: `scripts/verify-extension.cjs`, `.github/workflows/release.yml`.
- Release: `v<manifest version>-untested-chromium`. ZIP and SHA256SUMS.txt. Github Actions produces a prerelease, not a stable tested release.
- No real-browser visual verification yet; user reports previous styling did not visibly change homepage. Version 0.2.1 is deliberately labeled UNTESTED.

## Next work for agent
1. v0.2.1 release publication verified: https://github.com/JPLuker/MoxgateEnhanced/releases/tag/v0.2.1-untested-chromium ; GitHub Actions run 43609679046 passed all 14 tests, re-downloaded ZIP, and validated SHA-256. Future version changes should create new untested prereleases through .github/workflows/release.yml.
2. Inspect the actual Moxgate homepage DOM and computed CSS, identify why prior selectors had little visible impact, and add a regression test capable of failing against the old design.
3. Keep screenshots/render checks and live gameplay exclusions. Do not fake a successfully themed screenshot.
4. Continue roadmap, update changelog, testing evidence and issues with each change.

## Hands-on list for Joseph
A few tests for the untested ZIP are in TESTING.md. Do not ask for retesting until a CI artifact actually exists.

## Blockers / known limitations
No connected browser session was available to inspect the live Moxgate DOM. The v0.2.1 publisher ran successfully on GitHub Actions. Future runs still require Actions access. Lukercorp's organization runner does not automatically serve JPLuker's personal repos.
