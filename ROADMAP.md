# MoxgateEnhanced roadmap

**Focus:** Theme the *regular website UI*, **not gameplay**. No hosted or mirrored website. The installed Chromium extension modifies approved non-gameplay pages on the live Moxgate origin.

## M1 — Direct extension settings
- [x] Browser toolbar icon opens a self-contained settings popup (`popup.html`).
- [x] No extension Details → Options detour.
- [x] Four Duels-inspired palettes plus editable colors and instant local saving.
- [x] Local artwork selection/removal, opacity, optional site display.
- [x] Theme export/import and full enable/disable toggle.
- [x] Open Moxgate button within popup.
- [x] Retire the separately hosted PWA and redundant options-page files.
- [x] Popup wiring, URL scope, and basic route regression test source.
- [ ] Verify popup behavior and scroll/overflow at actual browser popup size.
- [ ] Verify local image chooser and storage on Chrome and Brave.
- [ ] Keyboard / contrast testing.

## Release packaging
- [x] Add tag-based UNTESTED Chromium ZIP release automation.
- [x] Add artifact validation and SHA-256 generation/checks.
- [x] GitHub Actions run 43609679046 completed (14 passed, 0 failed); v0.2.1 UNTESTED ZIP and SHA256SUMS published and reverified.
- [ ] Confirm extension load in Chrome and Brave on real hardware.
- [ ] Promote a later version to tested only after hands-on confirmation.

## v0.2.2 visual correction
- [x] Move style rules into extension-declared `content.css`.
- [x] Add heading-based homepage panel identification and high-contrast Duels-inspired presentation.
- [x] Restore popup fixed width and expose homepage section diagnostic.
- [x] Publish verified UNTESTED v0.2.2 ZIP with 16 automated tests passing.
- [ ] Confirm live homepage visibly changes, especially Play / Solo / Draft.
- [ ] Confirm popup sizing and accessibility in real Chromium.
- [ ] Close issues #1 and #2 only after hands-on verification.

## v0.2.3 card framing follow-up
- [x] Reproduce nested gold border regression with failing test.
- [x] Select outer card container without crossing multi-card groups.
- [x] Reproduce and correct nested/nonsemantic primary action matching.
- [x] Show panel and CTA counts separately in popup diagnostics.
- [ ] Check full-card frames and themed CTAs in real Moxgate homepage.
- [ ] Confirm gameplay untouched and review popup readability.

## M2 — Homepage and regular UI
- [x] Introduce scoped CSS for known non-gameplay routes.
- [x] Exclude `/solo`, multiplayer, draft, game sessions and unknown routes.
- [x] Apply non-destructive flat panels, typography, borders, and color accents.
- [x] Guard client-side navigation so the theme is removed on gameplay routes.
- [ ] Inspect actual homepage DOM and update selectors to reliably match the current design.
- [ ] Review deck browsing/builder, guides, sets, and lobby/menu screens individually.
- [ ] Replace AI-dashboard-style card hierarchy without changing gameplay controls.
- [ ] Add page-specific theme intensity and before/after testing.

## M3 — Full local personalization
- [ ] Image crop/position, blur, brightness, vignette.
- [ ] Separate background image per regular-UI area.
- [ ] Named custom themes, restore default, safe backup import.
- [ ] Color contrast guidance.
- [ ] More era-accurate artwork-free Duels-inspired presets.

## M4 — Optional packaged client
- [ ] Determine whether a branded Windows/Linux packaged wrapper is still useful alongside the extension.
- [ ] If pursued, launch Moxgate live, without mirroring or hosting.
- [ ] Test sign-in/session security and updates.
- [ ] Explore Android only if a reliable non-proxy approach exists.

## M5 — Ongoing maintenance and quality of life
- [ ] Implement user-requested ordinary UI improvements as real problems arise.
- [ ] Protect game routes as Moxgate adds new modes.
- [ ] Regression tests and release packaging.

## Invariants
- Never ship scraped Duels or official MTG artwork; allow locally supplied user images.
- Never intercept game logic, alter cards or combat controls, or tamper with rule enforcement.
- No hosting, proxying, mirroring, telemetry, or account credential collection.
- All styling must be reversible with the popup's master switch.
