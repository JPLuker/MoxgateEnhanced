# Security

Only the latest published build is supported for security fixes.

Please report vulnerabilities using [GitHub private vulnerability reporting](https://github.com/JPLuker/MoxgateEnhanced/security/advisories/new), not public issues. We aim to acknowledge a report within 7 days.

MoxgateEnhanced stores theme settings and selected artwork locally in browser extension storage. It requests `storage` and access only to `moxgate.com` and `www.moxgate.com`. It does not handle Moxgate passwords or game state. Turning on display of a selected image inside the webpage can expose that data to third-party page scripts.
