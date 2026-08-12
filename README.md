# Reincarted

> Respawn your style — original geek, isekai, and TTRPG-inspired apparel & goods.

**Reincarted** is a print-on-demand brand creating original designs for gamers, anime
fans, and tabletop dice goblins. This repository hosts the pre-launch landing page:
its job is to introduce the brand and collect email signups ahead of the store launch.

## Live Site

The site is deployed with **GitHub Pages** and served from the custom domain
configured in `CNAME`.

## Tech Stack

Plain HTML, CSS, and JavaScript — no frameworks, no build step.

| File / Folder   | Purpose                                                        |
| --------------- | -------------------------------------------------------------- |
| `index.html`    | Landing page markup                                            |
| `styles.css`    | Site styles                                                    |
| `brand.css`     | Reincarted brand design tokens (colors, typography, etc.)      |
| `script.js`     | Client-side interactivity (signup form handling, etc.)         |
| `assets/`       | Images and other static assets                                 |
| `BRAND-KIT.md`  | Brand guidelines, formatted as context for GitHub Copilot      |

## Running Locally

No dependencies to install. Clone the repo and open `index.html` in a browser,
or serve it with any static file server:

    git clone https://github.com/Lupeys/Reincarted.git
    cd Reincarted
    python3 -m http.server 8000

Then visit http://localhost:8000.

## Working with the Brand Kit

`BRAND-KIT.md` defines the Reincarted colors, typography, tone of voice, and design
rules. Pass it to GitHub Copilot (or any AI assistant) as context when generating
new pages or components so everything stays on-brand.

## Roadmap

- [x] Landing page + email capture
- [ ] Pre-launch marketing push (TikTok ads)
- [ ] Announce first product collections to the waitlist
- [ ] Full store launch

## License

See the [LICENSE](LICENSE) file for details.
