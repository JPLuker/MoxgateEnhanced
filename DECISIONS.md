# Decisions

2026-11-14, Joseph Luker:
> I didn't want it to be us hosting the website

**Decision:** This is an unhosted extension enhancing the live Moxgate site.

2026-11-14, Joseph Luker:
> okay I just realized gameplay itself is fine, I just need the extension to handle the regular UI - and also make the settings pop up in the extention not just in that weird roundabot way

**Decision:** Restrict custom styling to ordinary pages. Keep gameplay untouched. Put controls directly in the toolbar popup.

2026-11-14, Joseph Luker:
> can you start pushing releases for easier installs?

**Decision:** Publish downloadable extension ZIPs via GitHub Releases. State plainly that unpacked extensions still require extracting and loading in browser settings.

2026-11-14, Joseph Luker:
> nothing changed?

**Observed issue:** Prior cosmetic CSS changes were too limited or not effective in the user's browser. No claim of successful homepage redesign without rendered comparison.

2026-11-14, Joseph Luker:
> no / minimal change

**Decision:** Cosmetic borders and typography aren't sufficient. Build an actual Duels-inspired home menu layout, keep live Moxgate buttons and artwork, preserve an original-home fallback, and never alter gameplay.
