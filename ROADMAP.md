# MoxgateEnhanced roadmap

**Focus:** Theme the *regular website UI*, **not gameplay**. No hosted or mirrored website. The installed Chromium extension modifies approved non-gameplay pages on the live Moxgate origin.

## M1 — Direct extension settings
- [x] Browser toolbar icon opens a self-contained settings popup (\`popup.html\`).
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

## M2 — Homepage and regular UI
- [x] Introduce scoped CSS for known non-gameplay routes.
- [x] Exclude \`/solo\`, multiplayer, draft, game sessions and unknown routes.
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
