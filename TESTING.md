# Testing

## v0.2.1 — 2026-11-14

**Status: UNTESTED in a real browser.** Automated source checks and CI release validation are required before shipping any ZIP. A successful GitHub Actions run is not hands-on proof.

### Automated
GitHub Actions run [43609679046](https://github.com/JPLuker/MoxgateEnhanced/actions/runs/43609679046) completed: **14 passed, 0 failed**. Package verification, archive integrity, release asset enumeration, and re-downloaded checksum validation passed.
- `node --test tests/*.test.mjs`
- `node scripts/verify-extension.cjs .`
- `node --check app.js && node --check content.js`
- Release ZIP integrity (`unzip -t`), embedded manifest/assets, SHA256SUMS and re-download verification

### Current-device checks (not yet completed)
1. Load the extracted ZIP with **Load unpacked** and verify the popup opens directly from the toolbar icon.
2. Select a theme and verify visible changes on `https://www.moxgate.com/`.
3. Open `https://www.moxgate.com/solo` and confirm the gameplay layout, cards and controls remain unchanged.
4. Upload a local image and confirm it stays off the website unless the image-display toggle is enabled.
5. Extract the next ZIP over the same extension folder, reload, and confirm saved theme settings survive.

### Known uncertainty
- The original screenshot indicates homepage redesign is not yet achieved. Current CSS selectors are not proven against Moxgate's live computed styles.
- CI is allowed to publish only with a clear UNTESTED label; no stable release has passed device verification.
