# Changelog

## [0.2.1] — 2026-11-14

### Added
- CI job to validate, ZIP, checksum and publish the unpacked Chromium extension as a separately labeled untested prerelease.
- Package verification for files, manifest permissions and assets.
- Installation and update instructions for release ZIPs.

### Fixed
- Remove stale hard-coded version from popup header.
- Raise tiny popup text to the 12px minimum where applicable.

### Known limitations
- Theme selectors and popup layout have not been visually verified in Chrome or Brave.
- Homepage changes are still the initial non-gameplay CSS pass, not the complete Duels-style redesign.
- Unpacked extensions do not auto-update when GitHub publishes a new ZIP.

## [0.2.0] — 2026-11-14

### Added
- Direct popup for themes, colors and user-supplied artwork.
- Conservative cosmetic styling restricted to selected regular Moxgate pages.
- Gameplay route exclusions, local settings and initial regression tests.
