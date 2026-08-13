# Copilot Instructions for Reincarted

## Load-bearing integrations — do not remove

The landing page is connected to a live Supabase backend. When regenerating
or editing `index.html` or `script.js`, preserve ALL of the following:

- In the `index.html` `<head>`:
  - `<script src="script.js?v=2" defer></script>` (bump the `?v=` number
    whenever script.js changes, to bust browser cache)
  - Do NOT re-add the jsDelivr/@supabase CDN script — the integration is
    intentionally dependency-free (plain `fetch()` to the REST endpoint)
    so third-party script blocking cannot break the form
- In the signup form:
  - The form must keep `id="waitlist-form"`
  - The email input must keep `id="email"`
  - The hidden honeypot field `id="website"` must stay present and hidden
  - The status element `id="form-status"` must remain inside the form
- In `script.js`:
  - Signups POST to the Supabase REST endpoint for table
    `public.email_captures` (columns used: `email`, `source`)
  - Do not change the table name, project URL, or publishable key without
    making the matching change in the Supabase project first

If you regenerate the page layout, you may restyle these elements freely,
but the IDs, script tag, and table name above are functional requirements,
not decoration.

## Project context

- Static site hosted on GitHub Pages (CNAME: reincarted.com) — no build step
- Styles live in `brand.css` (design tokens) and `styles.css`; use the
  existing CSS custom properties (--void, --loot, --parchment, --arcane,
  --soulflame, etc.) instead of hardcoded colors
- See BRAND-KIT.md for voice, tone, and brand rules
