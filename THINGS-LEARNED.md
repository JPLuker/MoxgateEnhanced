# Things learned

## 2026-11-14 — Chromium CSS success needs visual evidence
- Source tests can prove that theme CSS is injected and that gameplay routes are excluded. They cannot prove that Moxgate's actual homepage changed visibly.
- Observe the live DOM and computed styles and inspect before/after screenshots before claiming a redesign.
- A ZIP makes extension files easier to download, but it cannot self-install or auto-update an unpacked extension.

## 2026-11-14 — Extension CSS and DOM-class independence
- An extension script that injects its own `<style>` element may be blocked by a site's Content Security Policy; the screenshot alone cannot establish CSP was the cause. Use a Manifest V3 content stylesheet for the baseline so it is loaded by the extension.
- Mark homepage components using visible titles/actions, then apply extension CSS to those markers. A unit DOM fixture is valuable but does not replace inspecting the actual site's markup and computed styles.
- Browser-action popup width must not use `min(..., 100vw)` when `100vw` depends on the popup's intrinsic size; explicitly size it and verify in the real browser.

## 2026-11-14 — CSS cosmetics are not a structural redesign
- Multiple color/border releases left Moxgate's generic card grid substantially unchanged. A design request about hierarchy requires replacing that hierarchy, not repeating CSS overrides.
- The original three mode panels can be retained as hidden sources for native click actions while a new menu is displayed. Remove the replacement before triggering the original control so modals do not appear behind it.
- Real Chromium screenshots at three widths provide stronger confidence than selector-count tests; they are still not proof of behavior in the live website.
