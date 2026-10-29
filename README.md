# fresh-arch-canvas — farazfaramarzi.com

The whole site is one Vite project with four pages:

| Page | Source | What it is |
|---|---|---|
| `index.html` | `src/skyview/` | 3D sky view (three.js), start page |
| `portfolio.html` | `src/portfolio/` | "3D Faraz" React + Tailwind subsite |
| `render.html` | inline | Rendered video page |
| `hus-i-skogen.html` | `src/husiskogen/` | Hus i skogen project page (React + Tailwind, Swedish) |

```
index.html, portfolio.html, render.html   page entry points
src/skyview/      main.js + styles.css for the 3D start page
src/portfolio/    React app (App.tsx, components/, hooks/, assets/hero.mp4)
src/husiskogen/   React app for the Hus i skogen page (all text in data.ts)
public/           copied to the site as-is: CNAME, models/scene.glb, pdfs/, hus-i-skogen/
.github/workflows/deploy.yml   builds and publishes the site on every push
```

## Work on it locally

```bash
npm ci            # install exact versions from package-lock.json (first time / after pulling)
npm run dev       # live dev server: http://localhost:5173  (portfolio: /portfolio.html)
npm run build     # production build into dist/
npm run preview   # serve dist/ to check the real build
```

Don't open the `.html` files directly from disk — `portfolio.html` points at
TypeScript that only works through `npm run dev` or after `npm run build`.

## Publish

Push to `main`. GitHub Actions runs `npm ci && npm run build` and publishes `dist/`
to GitHub Pages. `dist/` and `node_modules/` are not committed.

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The custom domain (farazfaramarzi.com) stays as it is.

## Adding things

- **PDFs, images, downloads:** put them in `public/pdfs/` and link as `./pdfs/File%20name.pdf`
  (spaces written as `%20`).
- **3D projects:** edit `PROJECTS` in `src/skyview/main.js`. A key such as `interactive_xyz`
  gets a hotspot only if `public/models/scene.glb` has an object with that name; otherwise
  it's listed in the Projekt menu only.
- **Portfolio page images/videos:** put them in `src/portfolio/assets/` and `import` them in
  the component (see `hero.mp4` in `App.tsx`), so the paths work after the build.
- **New scrub video:** the hero video is scrubbed with the mouse, which is only smooth when
  every frame is a keyframe. Re-encode a new clip like this before replacing `hero.mp4`:
  `ffmpeg -i input.mp4 -an -c:v libx264 -crf 24 -g 1 -pix_fmt yuv420p -movflags +faststart hero.mp4`
- **Hus i skogen images/video:** put web-sized files in `public/hus-i-skogen/` and add them to
  `src/husiskogen/data.ts` (`renders`, `drawings` or `materials`). Photos are WebP around 2000 px wide.
  The ageing video `aldrande.mp4` is scrubbed by scrolling, so encode it with `-g 1` like `hero.mp4`.
