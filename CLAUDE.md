# MoxgateEnhanced agent instructions

Read [InternalDesignGuidelines](https://github.com/JPLuker/InternalDesignGuidelines) before development: SOP, WORKING-WITH-JOSEPH, WORKFLOW, CODING, DESIGN Part A, VOICE, VERSIONING and RELEASES. Read the privacy and security standards for any data or CI changes.

Next read: DECISIONS.md, HANDOFF.md, TESTING.md, ROADMAP.md, CHANGELOG.md and open GitHub Issues.

## Identity
An unhosted Chromium extension that enhances the **ordinary interface** of live moxgate.com. It is not a game clone, host, proxy, or rules engine. The Duels of the Planeswalkers-inspired direction was requested by Joseph Luker.

## Deviations
- Do not apply optional DESIGN.md Part B ("Quiet Precision"). Joseph established a Duels-inspired fantasy style specifically for this project.
- Extension theme settings deliberately live in the browser-action popup instead of a standalone desktop-style Settings window. Joseph explicitly requested direct popup access.
- Since a Chromium extension is browser-dependent rather than OS/architecture-specific, its artifact uses `Chromium-unpacked` instead of the operating-system grouping intended for native installers.
- For an untested initial version with no matching tested release, the release warning says no tested build exists rather than linking to a nonexistent main release.
- A non-store unpacked browser extension cannot offer automatic background updates. GitHub Releases provide manually downloaded replacements.

## Release proof
No claim that the homepage is fixed until the *live* UI is rendered and examined. Automated tests are a gate, not real-browser acceptance. Keep untested ZIPs in their own prerelease with checksum, provenance and installation instructions.
