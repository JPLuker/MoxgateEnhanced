# Testing

## v0.3.1 — 2026-11-14

**UNTESTED against live Moxgate.** GitHub Actions run [43627033069](https://github.com/JPLuker/MoxgateEnhanced/actions/runs/43627033069) passed **24 tests, 0 failures** and rendered mock homepage screenshots at 390×844, 1280×720, and 1920×1080. All three PNGs were opened and reviewed. The fixture confirms a console menu replaces the original hero strip. This does not prove live DOM compatibility.

### Hands-on checks for this build
1. Install the new ZIP and refresh Moxgate. The homepage should show **Choose a mode** with a vertical selector and large preview, not the original three-column grid.
2. Select Solo, Multiplayer, and Draft, and start a mode. Confirm native controls are reached.
3. Click **Original Moxgate home** and confirm the old layout returns.
4. Open `/solo` and confirm actual gameplay is unchanged.

The popup reports **Console home active** when the replacement is installed and matched. If it says **Home detected · console menu unavailable**, use the original page until its current DOM can be inspected. Issues #1 and #2 stay open pending user verification.

---


## v0.2.3 — 2026-11-14

**Status: CI passed (19 tests, 0 failures), live browser acceptance pending.** [UNTESTED v0.2.3](https://github.com/JPLuker/MoxgateEnhanced/releases/tag/v0.2.3-untested-chromium) was built and reverified in [GitHub Actions run 43615193780](https://github.com/JPLuker/MoxgateEnhanced/actions/runs/43615193780). The previous v0.2.2 screenshot shows the theme is active and six homepage sections are detected. The gold frames were wrapped around inner text containers, and some primary CTAs remained purple.

### Regression coverage
- The frame-selection regression fails against the old first-matching-ancestor algorithm, then passes after selecting the outer single-card ancestor.
- The CTA regression fails when Solo's action is represented by a nested text span in a div control, then passes after marking the whole button-sized surface.
- A separate initial test failure was due to the fixture not returning matched action markers; corrected before the publishing run.
- The popup diagnostic should now read `Homepage: N panels · N actions`.
- `/solo` and other gameplay paths remain explicitly excluded.

### Hands-on checks for this build
1. On Moxgate home, gold frames should surround the entire Play, Solo, Draft, tutorial and Conquest panels, not smaller inset rectangles.
2. Play and Solo primary actions should adopt the selected theme accent rather than remain purple; note the popup's panel/action counts.
3. Popup stays readable and `/solo` gameplay remains unchanged.

---

## v0.2.2 — 2026-11-14

**Release:** [UNTESTED v0.2.2](https://github.com/JPLuker/MoxgateEnhanced/releases/tag/v0.2.2-untested-chromium). Automated GitHub Actions verification [run 43611231778](https://github.com/JPLuker/MoxgateEnhanced/actions/runs/43611231778): 16 tests passed, 0 failed, packaged nine extension files, ZIP test and re-download SHA-256 verification passed.

**Live browser verification still missing.** A representative DOM fixture verifies the hero-card marker logic, but it is not Moxgate's DOM.

### Required hands-on acceptance checks
1. Extract v0.2.2 into the **same** unpacked extension folder, reload extension and refresh Moxgate.
2. On the homepage, confirm distinct **gold/stone** panels and buttons versus the original purple interface.
3. Open the toolbar popup: it should be wide enough not to squeeze buttons into narrow columns. Read its **Homepage styled: N sections** diagnostic; zero means section detection failed.
4. Open `/solo`. The popup should say **Gameplay unchanged**, and the battlefield should remain visually identical.

Open bugs: [#1 homepage](https://github.com/JPLuker/MoxgateEnhanced/issues/1) and [#2 popup width](https://github.com/JPLuker/MoxgateEnhanced/issues/2). Do not close until real browser confirmation.

---

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
