# Chen Jiang — Academic Homepage

Live site: **https://j128djsj.github.io/**

Static site (plain HTML/CSS/JS, no build step, no dependencies). Every push to `main` republishes it
in about 40 seconds.

## How deployment works

| Piece | Value |
|---|---|
| Repository | `j128djsj/j128djsj.github.io` |
| Branch | `main` |
| Hosting | GitHub Pages, source = **GitHub Actions** |
| Workflow | `.github/workflows/pages.yml` (checkout → configure-pages → upload artifact → deploy) |
| Optional workflow | `.github/workflows/cloudflare.yml` — skipped automatically unless `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets exist |

To publish a change:

```powershell
git add -A
git commit -m "update bio"
git push
```

Then watch the **Actions** tab. No manual upload, no `dist/` folder — the repository root **is** the site.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```powershell
python -m http.server 4173
# http://127.0.0.1:4173
```

## Edit

- `index.html`: biography, research interests, publications, education, links.
- `style.css`: colors, typography, spacing, responsive layout.
- `script.js`: citation dialog, BibTeX, clipboard handling.
- `assets/`: avatar, publication figures, favicon.

## Notes

- Canonical URL is `https://j128djsj.github.io/`; `og:url` and `og:image` point there too.
- All asset paths are relative, so the site also works in a subdirectory or another host.
- `.nojekyll` is kept so the files are served verbatim if branch-based deployment is ever used again.
- The avatar and the publication figures were supplied by Chen Jiang; figures keep their original rights.
