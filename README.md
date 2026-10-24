# Chen Jiang — Academic Homepage

Static academic homepage. This directory is the **single source of truth** for the site; the
`我的学术主页/dist` and `chen-jiang-homepage/dist` folders are archived copies of earlier deployments.

## Automatic deployment (GitHub Pages)

Pushing to `main` triggers `.github/workflows/pages.yml`, which uploads this directory as a Pages
artifact and publishes it. No build step, no dependencies.

One-time setup (already scripted in `../deploy-setup.md`):

1. Create the public repository `j128djsj/j128djsj.github.io` (exact name).
2. Push this directory to `main`.
3. Repository Settings → Pages → Source: **GitHub Actions**.
4. The first push publishes https://j128djsj.github.io/.

After that: edit `index.html` / `style.css` → commit → push → live in ~40 seconds.

## Manual deployment (Cloudflare Pages)

The canonical URL is **https://j128djsj.github.io/** — `og:url`, `og:image` and `<link rel="canonical">`
all point there, including in the archived copies under `../我的学术主页/dist` and
`../chen-jiang-homepage/dist`.

The site was also published on Cloudflare (`chen-jiang.pages.dev`) and Sites
(`chen-jiang.jithandulai.chatgpt.site`); both are now aliases, not the canonical address. To push it
there anyway, use `../deploy-cloudflare.ps1` with a `CLOUDFLARE_API_TOKEN`:

```powershell
$env:CLOUDFLARE_API_TOKEN = "..."
$env:CLOUDFLARE_ACCOUNT_ID = "..."
.\deploy-cloudflare.ps1
```

## Edit

- `index.html`: biography, research interests, publications, education, links.
- `style.css`: colors, typography, spacing, responsive layout.
- `script.js`: citation dialog, BibTeX, clipboard.
- `assets/`: avatar, publication figures, favicon.

All paths are relative, so the site works both at a domain root and in a subdirectory.
`.nojekyll` keeps GitHub Pages from running Jekyll.
