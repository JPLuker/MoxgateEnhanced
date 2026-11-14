# Changelog

## [0.3.1] — 2026-11-14

### Added
- Console-style homepage with a vertical Solo, Multiplayer and Draft selector and a large preview stage.
- Uses Moxgate's own controls to start modes and can return to the original homepage.
- Reuses existing large website artwork when available; no proprietary images bundled.
- Updated toolbar preview and clear indication that the console menu is active.

### Fixed
- Removed wrongly inset gold frames on lower feature banners.
- Repeat DOM scans no longer duplicate the console; re-renders can recreate it.
- Safeguards retain the original homepage if the expected three source cards are missing.

### Validation
- 24 automated tests passed in GitHub Actions run 43627033069.
- Chromium rendered fixture previews at 390×844, 1280×720, and 1920×1080. Each screenshot was reviewed.
- **Still untested against the live Moxgate page in Vivaldi.** Fixture renders are not proof of live integration.

## [0.3.0] — 2026-11-14

### Added
- Initial console-home source before the complete test and visual verification refinements in 0.3.1.


## [0.2.3] — 2026-11-14

### Fixed
- Homepage borders now use the full outer card container instead of wrapping inset text columns.
- Hero action detection supports nested span/div controls as well as native links and buttons.
- The extension popup reports separate matched panel and action counts for easier diagnostics.

### Testing
- A red regression test reproduced the inner-card border issue, followed by a passing test after the fix.
- A separate regression reproduced the nested Solo CTA case before it was fixed.
- v0.2.3 [UNTESTED release](https://github.com/JPLuker/MoxgateEnhanced/releases/tag/v0.2.3-untested-chromium) was published after 19 passing automated tests and post-publication checksum validation in [run 43615193780](https://github.com/JPLuker/MoxgateEnhanced/actions/runs/43615193780). Live appearance of v0.2.3 still requires browser confirmation. The v0.2.2 screenshot showed 6 homepage sections detected but gold frames were inset; that issue is being corrected here.

## [0.2.2] — 2026-11-14

### Fixed
- Switch from dynamically inserting a page-owned style tag to a stylesheet declared in the Chromium extension manifest.
- Recognize the Play, Solo and Draft homepage tiles by headings instead of relying on unverified CSS utility classes.
- Add stronger stone-table styling to homepage panels, main actions, typography and borders.
- Restore the settings popup to a fixed width instead of shrinking with its own viewport.
- Show a local status indicating which page the extension sees and how many homepage sections it recognized.

### Verification
- GitHub Actions build [43611231778](https://github.com/JPLuker/MoxgateEnhanced/actions/runs/43611231778) passed 16 automated tests and verified the packaged ZIP and its SHA-256 checksum.
- Released as [UNTESTED Chromium v0.2.2](https://github.com/JPLuker/MoxgateEnhanced/releases/tag/v0.2.2-untested-chromium).
- **Actual live Moxgate appearance and browser popup sizing still require real-device confirmation.** This is not a completed visual bug fix.

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
