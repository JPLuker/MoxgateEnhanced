# MoxgateEnhanced handoff

## Product
Unhosted browser extension that themes the regular Moxgate interface while leaving live gameplay unchanged. Toolbar icon opens popup settings for presets, colors and local artwork.

## Current status, 2026-11-14
- Manifest version source: `manifest.json`.
- Popup: `popup.html`, `popup.css`; state/events `app.js`.
- Page scope and injected CSS: `content.js`. Gameplay routes should never be styled.
- Packaging and validation: `scripts/verify-extension.cjs`, `.github/workflows/release.yml`.
- Release: `v<manifest version>-untested-chromium`. ZIP and SHA256SUMS.txt. Github Actions produces a prerelease, not a stable tested release.
- No real-browser visual verification yet; user reports previous styling did not visibly change homepage.

## Next work for agent
1. Inspect GitHub Actions run for the v0.2.1 packaging job; fix any CI errors and verify ZIP and checksums.
2. Inspect the actual Moxgate homepage DOM and computed CSS, identify why prior selectors had little visible impact, and add a regression test capable of failing against the old design.
3. Keep screenshots/render checks and live gameplay exclusions. Do not fake a successfully themed screenshot.
4. Continue roadmap, update changelog, testing evidence and issues with each change.

## Hands-on list for Joseph
A few tests for the untested ZIP are in TESTING.md. Do not ask for retesting until a CI artifact actually exists.

## Blockers / known limitations
No connected browser session was available to inspect the live Moxgate DOM. The automated publisher can run only when GitHub Actions is enabled for this repository. Lukercorp's organization runner does not automatically serve JPLuker's personal repos.
