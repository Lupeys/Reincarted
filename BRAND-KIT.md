# Reincarted — Brand Kit & Copilot Instructions

> **How to use:** Drop this file in your repo root as `BRAND-KIT.md`, and copy the
> "Copilot Quick Rules" section into `.github/copilot-instructions.md` so GitHub
> Copilot auto-loads it for every suggestion in this repo. Keep `brand.css`
> (companion file) in your project and import it before any page-specific styles.

---

## 1. Brand Identity

- **Name:** Reincarted — a pun on *reincarnated + cart*
- **Tagline (primary):** "Reborn as merch."
- **Alt taglines:** "Your next life starts at checkout." / "Add to cart. Begin again." / "New life. New loot." / "Every soul gets a second run."
- **One-line pitch:** Somewhere between this world and the next, there's a checkout line.
- **Concept:** An original-IP geek merch brand. Every design is a soul reborn as a product — isekai, TTRPG, roguelike, and cozy fantasy-food themes. No copyrighted characters, names, or logos. Ever.
- **Mascot:** **Rei the Wisp** — a small, round, cream-white ghost with a wavy tail, big dark oval eyes, a tiny smile, teal blush cheeks, and a small golden flame floating above its head. Canon lore: Rei died and got reincarnated as a shopping cart. (Rei / 霊 = "spirit" in Japanese, and the first syllable of Reincarted.)

## 2. Voice & Copy Rules

Voice = a snarky guild clerk filing paperwork for the dead. Playful, trope-savvy, never corporate.

- Product descriptions are written as RPG **status windows**:
  *"Item: Tavern Ramen Hoodie — Rarity: Rare — Effect: +10 Warmth, +5 Charisma when spotted by other players."*
- Stats, rarity tiers, and flavor text are encouraged anywhere copy appears.

### Approved microcopy

| Context | Copy |
|---|---|
| Add to cart button | "Reincarnate This" or "Add to Cart — Begin Again" |
| Checkout button | "Cross Over" |
| Loading state | "Summoning your loot…" |
| Empty cart | "No souls yet. Summon something." |
| 404 page | "This page has been reincarnated elsewhere." |
| Newsletter CTA | "Join the Cycle — get reborn weekly." |
| Footer sign-off | "© 2026 Reincarted. All souls reserved." |

## 3. Color Palette

| Token | Name | Hex | Role |
|---|---|---|---|
| `--void` | Void Indigo | `#2A1E5C` | Primary background, wordmark |
| `--void-deep` | Deep Void *(derived)* | `#1B1240` | Background gradients, footer |
| `--arcane` | Arcane Violet | `#7C5CFF` | Accents, borders, the CART in REINCARTED |
| `--soulflame` | Soulflame Teal | `#3FE0C5` | Glows, highlights, success states |
| `--loot` | Loot Gold | `#F2B84B` | CTAs, headings, sparkles, rune rings |
| `--parchment` | Parchment | `#F4EDDE` | Body text on dark, light surfaces |

**Accessibility rules:**
- Body text on `--void` backgrounds: use `--parchment` or `--loot` (both pass contrast).
- `--arcane` on `--void` is for large headings, borders, and icons only — never small body text.
- Buttons: `--loot` background with `--void-deep` text.

## 4. Typography

All fonts are free for commercial use (SIL OFL) via Google Fonts:

| Role | Font | Usage |
|---|---|---|
| Display | **Cinzel** (600–800) | Headings, wordmark, hero titles. All-caps preferred. |
| Pixel accent | **Press Start 2P** | Status-window labels, stat readouts, rarity tags. Sparingly — small sizes, short strings. |
| Body | **Inter** (400–700) | Paragraphs, UI, buttons, forms. |

```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Press+Start+2P&display=swap" rel="stylesheet">
```

## 5. Logo & Art Assets

| Asset | File | Use |
|---|---|---|
| Primary logo | Gold emblem — Rei-ghost inside a cart, ringed by gold runes on Void Indigo (Gemini render, vectorize before print) | Site header, favicon, social avatar |
| Mascot art | Rei-reincarnated-as-a-cart die-cut sticker illustration | Stickers, tee graphic, empty-state illustrations |
| Hero art | Cosmic scene — Rei beside a rune-etched cart on a golden summoning circle, starfield background | Landing page hero, banners, desk-mat print |
| SVG drafts | `reincarted-logo-refined-primary.svg`, `reincarted-logo-refined-rei.svg` | One-color / embroidery fallbacks |

**Logo rules:** never recolor the emblem outside the palette; keep clear space equal to the height of Rei's flame on all sides; on light backgrounds use the indigo one-color variant.

## 6. UI Style Guidelines

- **Dark-first:** pages default to `--void` / `--void-deep` gradient backgrounds with subtle starfield or rune motifs.
- **Buttons:** primary = `--loot` fill, `--void-deep` text, 8px radius, teal glow on hover. Secondary = 2px `--arcane` outline, `--parchment` text.
- **Cards / panels:** `--void-deep` surface, 1px `--arcane` border at 40% opacity, 12px radius.
- **Status-window component:** signature UI pattern — dashed `--loot` inner border, Press Start 2P labels, stat rows (`HP`, `CHA`, `WIS`) with teal values. Use for product cards, newsletter signup, and cart summary.
- **Motifs:** dashed gold circles (cycle of rebirth), 4-point sparkles, rune ticks, soul flames. Use as decorative dividers and section accents.
- **Radius scale:** 8px buttons / 12px cards / 999px pills. **Shadows:** prefer colored glows (`--soulflame` or `--arcane` at 30–40%) over black drop shadows.

## 7. Collections (Site Sections)

The store is structured as "Lives," each a mini-world:

1. **Tutorial Life** — isekai system-window aesthetics (status-screen desk mats, "Level 1 Villager" tees, guild-card stickers)
2. **Dice Life** — TTRPG rebirth humor ("Reincarnated as a d20", nat-1 memorial mugs)
3. **Tavern Life** — cozy fantasy food (potion ramen mugs, slime parfait stickers, aprons)
4. **Respawn Life** — roguelike permadeath jokes ("Run It Back" hoodies, pixel-heart mats)
5. **Rei** — mascot line crossing all themes (sticker sheets, pins)

## 8. Copilot Quick Rules

```text
- This repo is the landing page for Reincarted, an original-IP geek merch brand.
- Always use the CSS custom properties from brand.css (--void, --void-deep,
  --arcane, --soulflame, --loot, --parchment). Never invent new hex colors.
- Typography: Cinzel for headings (all-caps), Press Start 2P for RPG stat
  labels only, Inter for body/UI. Import via the Google Fonts link in this file.
- Dark-first design: Void Indigo backgrounds, Parchment body text, Loot Gold CTAs.
- Copy voice: snarky guild clerk. Product/feature copy may use RPG status-window
  format (Item / Rarity / Effect). Use approved microcopy from the brand kit.
- Signature component: "status window" card — dashed gold inner border,
  pixel-font labels, teal stat values.
- Decorative motifs: dashed gold rebirth rings, 4-point sparkles, rune ticks,
  soul flames. Prefer glow shadows over black shadows.
- Mobile-first, semantic HTML, accessible contrast per the brand kit rules.
- Never generate copy or alt text referencing copyrighted anime/game characters,
  series names, or logos. All IP is original.
```