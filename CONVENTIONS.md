# Project conventions

- One authoritative version: `manifest.json`; no manually duplicated version in popup UI.
- Regular-site styling only. Keep `/solo`, `/play`, `/draft`, `/match`, unknown routes and all active gameplay untouched.
- No bundled proprietary Magic artwork. User-uploaded pictures remain local; site display is opt-in.
- Preserve browser-action popup access. No options-page detour or hosted clone.
- Do not add general host permissions, analytics, third-party runtime libraries or network calls without review.
- Never declare a visual fix complete based only on DOM/regex tests.
- Releases come from CI and are UNTESTED until installed and checked in real browsers.

- Inject page styles through `content_scripts.css`, not page-owned `<style>` tags. Changes in appearance require real browser checks, not only DOM-marker checks.
- Use semantic markers for homepage panels and report recognized section count in popup diagnostics. CSS utility-class guesses alone are insufficient.

- Homepage design must be a distinct console-style menu rather than another round of generic card borders and gradients.
- `home-portal.js` may hide only the recognized hero strip. Every new mode button delegates to an existing Moxgate site control.
- Missing or changed source markup must leave the original Moxgate interface accessible.
- Render the feature in Chromium at narrow and desktop widths; inspect screenshots. Fixture checks are not live-site acceptance.
