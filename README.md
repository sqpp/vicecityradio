# Vice City Radio [dot] COM Remake

A remake of classic GTA **Vice City Radio** web site, built as a **Vue 3 + Vue Router**, styled with **Tailwind CSS 4+** and bundled with **Vite**.

## Tech stack

- **Vue 3** + **Vue Router 5** (SPA with multiple station routes)
- **Vite 7** dev server and bundler
- **Tailwind CSS 4+** via `@tailwindcss/vite` and `@tailwindcss/cli`
- **Font Awesome** via CDN (icons)
- **Node.js + npm** for scripts and tooling

## Features

- Per-station views for DJ info, playlists, and “connected” content
- Router-driven URLs like:
  - `/flash-fm` – station + DJ info
  - `/flash-fm/playlist` – playlist view
  - `/flash-fm/connected` – connected hub
  - `/flash-fm/connected/view` – connected image view
  - `/flash-fm/connected/bonus` – connected bonus content
- Tailwind-powered layout and theming, including custom **Pricedown** font
- SPA mounted into a single `index.html` shell

## Project structure

- `index.html` – HTML shell that mounts the Vue app into `#app`
- `src/main.js` – app entry, sets up Vue, router, and routes
- `src/App.vue` – root layout component
- `src/views/` – route views for stations, playlists, and connected content
- `src/input.css` – Tailwind CSS entry (imports Tailwind + custom fonts)
- `vite.config.mjs` – Vite configuration with Vue + Tailwind plugins
- `package.json` – scripts and dependencies

## Scripts

- `npm run dev` – start Vite dev server (default on `http://localhost:5173`)
- `npm run build` – production build
- `npm run preview` – preview the production build locally

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open the printed localhost URL (by default `http://localhost:5173`) in your browser.  
   You’ll be redirected from `/` to `/flash-fm` automatically.

## Production build

To generate a production-optimized build:

```bash
npm run build
```

Optionally, preview it locally:

```bash
npm run preview
```

You can then deploy the generated `dist/` folder to any static host.

## License / disclaimer

This is a fan-made project inspired by Rockstar Games’ **Grand Theft Auto: Vice City** and its radio stations.  
All trademarks, logos, and related intellectual property are the property of their respective owners.

