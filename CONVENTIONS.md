# Project conventions

- One authoritative version: `manifest.json`; no manually duplicated version in popup UI.
- Regular-site styling only. Keep `/solo`, `/play`, `/draft`, `/match`, unknown routes and all active gameplay untouched.
- No bundled proprietary Magic artwork. User-uploaded pictures remain local; site display is opt-in.
- Preserve browser-action popup access. No options-page detour or hosted clone.
- Do not add general host permissions, analytics, third-party runtime libraries or network calls without review.
- Never declare a visual fix complete based only on DOM/regex tests.
- Releases come from CI and are UNTESTED until installed and checked in real browsers.
