# MoxgateEnhanced roadmap

Progress indicators below distinguish **scaffold implementation** from **tested integration**.

## M1 — Local-first foundation
- [x] Repository documentation and scope.
- [x] Installable PWA manifest, shell, and offline cached shell.
- [x] Theme workshop with live color preview.
- [x] Classic tabletop-inspired CSS presets, without copyrighted art bundles.
- [x] Local PNG/JPEG/WebP upload, remove, reset.
- [x] Theme JSON export/import.
- [x] Chromium extension applying cautious cosmetic styling to Moxgate.
- [x] Explicit opt-in before exposing locally uploaded image data in Moxgate page styling.
- [x] Dependency-free theme input validation tests included.
- [ ] Verify live gameplay against the site's current DOM and interaction states.
- [ ] Confirm PWA install behavior in target browsers/devices.
- [ ] Accessibility audit and keyboard-only tests.

## M2 — Full Duels-inspired styling
- [ ] Study actual Moxgate homepage, lobby, deckbuilder, battlefield DOM.
- [ ] Separate homepage, menu, battlefield, and combat styling.
- [ ] Theme-specific cards, tabletop textures, turn/phase indicator treatments.
- [ ] Per-screen overrides and opt-in cosmetic intensity.
- [ ] Avoid altering clickable areas, gameplay state, and hitboxes.
- [ ] Responsive desktop, tablet, and mobile validation.

## M3 — Personalization
- [ ] Independent images for battlefield, menu, zones, and overlays.
- [ ] Image crop/position/focal point, blur, brightness, opacity.
- [ ] Advanced color wheel, per-element colors, accessible contrast suggestions.
- [ ] Preset manager and multiple named custom themes.
- [ ] Theme pack portability, versioning, migrations, safe import validation.

## M4 — Quality-of-life and release readiness
- [ ] User-driven gameplay enhancements based on real testing.
- [ ] Compatibility checks and versioned selectors.
- [ ] Settings reset, emergency disable, and safe startup fallback.
- [ ] Regression checklist, browser coverage, release artifacts.

## Important limitations
A cross-origin PWA cannot restyle Moxgate itself; the extension runs at the site origin as a content script. Mobile extension availability differs by browser. An iframe or reverse proxy is not a reliable or appropriate workaround. No Moxgate server code, game state, or copyrighted game assets are redistributed.
